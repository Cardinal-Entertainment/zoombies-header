import {Client,nakamajs} from "@heroiclabs/nakama-js"
import {WebSocketAdapterPb} from "@heroiclabs/nakama-js-protobuf"

var nakamaClient;
var socket;
var onlineUsers = [];


const checkOnlineUsers = () => {
    socket.onchannelpresence = (presences) => {
        console.log("presences");
        console.log(presences);
        // Remove all users who left.
        onlineUsers = onlineUsers.filter((user) => {
            return !presences.leave.includes(user);
        });
        // Add all users who joined.
        onlineUsers.concat(presences.join);
        console.log("online users:",onlineUsers);
    };
    console.log("online users1:",onlineUsers);
}

const handleMessage = () => {
    socket.onchannelmessage = (message) => {
        console.log("Received a message on channel: %o", message.channel_id);
        console.log("Message content: %o", message.content);
    };
}



(async () => {

    let session;

    const authenticateUser = async () => {
        const email = "ryanpricelondon@gmail.com";
        const username = "priceman614"
        const password = "12345678";
        const create = false;
    
        console.log("authenticating user...");
        session = await nakamaClient.authenticateEmail(email, password, create, username);
    }

    //define 1 big room for all chat
    const roomname = "ZoombiesMainRoom";
    const persistence = true;
    const hidden = false;

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
            //console.log(nakamaClient);
            try
            {
                    session = await nakamaClient.sessionRefresh(session);
            }
            catch (e)
            {
                    console.info("Session can no longer be refreshed. Must reauthenticate!");
                    await authenticateUser();
            }
        }   



        socket = nakamaClient.createSocket(false,true,new WebSocketAdapterPb());
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
        console.log('got here2',socket)
        handleMessage();
        checkOnlineUsers();

        await socket.updateStatus("Hello, I am online now");

        // 1 = Room, 2 = Direct Message, 3 = Group

        const channel = await socket.joinChat(roomname, 1, persistence, hidden);
        console.log("join response:", channel);
    
        console.log('got here3',channel.channel_id);

        var data = { "hello": "world" };
        const messageAck = await socket.writeChatMessage(channel.id, data);
       
       

    }
    catch(err){
        console.error("ERROR auth email", err.statusCode, err.message);
    }


})();

export default nakamaClient;