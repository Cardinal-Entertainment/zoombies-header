import {Client} from "@heroiclabs/nakama-js"
import {WebSocketAdapterPb} from "@heroiclabs/nakama-js-protobuf"
import {JoinChatRoom} from '../components/ChatPanel';


var session;
var socket;

const NakamaClient = async () => {

    var nakamaClient;

    const authenticateUser = async () => {
        const email = "ryanpricelondon@gmail.com";
        const username = "priceman614"
        const password = "12345678";
        const create = false;
    
        console.log("authenticating user...");
        session = await nakamaClient.authenticateEmail(email, password, create, username);
    }

    //Now try to authenticate
    try {
        const authtoken = window.localStorage.getItem("nkauthtoken");
        const refreshtoken = window.localStorage.getItem("nkrefreshtoken");
        

        nakamaClient = new Client(process.env.REACT_APP_NAKAMA_SERVER_KEY, "cryptoz.cards", 7350);
        //nakamaClient = new Client("defaultkey", "127.0.0.1", 7350);
        //console.log("nakama client:",nakamaClient);

        if(authtoken === null){
            authenticateUser();
            console.info("Successfully authenticated new session:", session);
            window.localStorage.setItem("nkauthtoken", session.token);
            window.localStorage.setItem("nkrefreshtoken", session.refresh_token);
        }else{
            console.log("we have a session..check it..", nakamaClient);
            await authenticateUser();
            console.log(session);
            //console.log(nakamaClient);
            // Check whether a session has expired or is close to expiry.
            if (session.isexpired || session.isexpired(Date.now + 1)) {
                try {
                    // Attempt to refresh the existing session.
                    session = await nakamaClient.sessionRefresh(session);
                } catch (error) {
                    // Couldn't refresh the session so reauthenticate.
                    await authenticateUser();
                    window.localStorage.setItem("nkrefreshtoken", session.refresh_token);
                }
                window.localStorage.setItem("nkauthtoken", session.token);
            }
        }   



        socket = nakamaClient.createSocket(false,false,new WebSocketAdapterPb());
        console.log('got here', socket);
        socket.ondisconnect = (evt) => {
            console.info("Socket Disconnected", evt);
        };
        socket.onerror = (evt) => {
            console.log("Socket error", evt);
        }
        var appearOnline = true;
        var connectionTimeout = 30;
        session = await socket.connect(session, appearOnline, connectionTimeout);
        console.log('got here2',socket);

         await JoinChatRoom();
    }
    catch(err){
        console.error("ERROR auth email", err.statusCode, err.message);
    }
};
NakamaClient();
export {NakamaClient,socket,session};