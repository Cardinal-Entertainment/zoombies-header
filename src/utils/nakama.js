import {Client} from "@heroiclabs/nakama-js"

var nakamaClient;
var socket;
var onlineUsers = [];
var session;

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

const authenticateUser = async () => {
    const email = "ryanpricelondon@gmail.com";
    const username = "priceman614"
    const password = "12345678";
    const create = false;

    console.log("authenticating user...");
    session = await nakamaClient.authenticateEmail(email, password, create, username);

}

(async () => {



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
            console.log("we have a session..check it..", authtoken);
            session = nakamaClient.Session.restore(authtoken, refreshtoken);

            // Check whether a session is close to expiry.
            const unixTimeInFuture = Date.now() + 8.64e+7; // one day from now

            if (session.isexpired(unixTimeInFuture / 1000)) {
                try
                {
                    session = await nakamaClient.sessionRefresh(session);
                }
                catch (e)
                {
                    console.info("Session can no longer be refreshed. Must reauthenticate!");
                    authenticateUser();
                }
            }
        }   


/*
        socket = nakamaClient.createSocket(false,true);
        console.log('got here', socket);
        socket.ondisconnect = (evt) => {
            console.info("Disconnected", evt);
        };
        var appearOnline = true;
        var connectionTimeout = 30;
        await socket.connect(session, appearOnline, connectionTimeout);
        console.log('got here2',socket)


        // 1 = Room, 2 = Direct Message, 3 = Group
        const response = await socket.joinChat(1, roomname, persistence, hidden);
        console.log("join response:");
        console.log(response);
        var data = { "some": "data" };
        const messageAck = await socket.writeChatMessage(response.channel_id, data);
        

        // Setup initial online user list.
        onlineUsers.concat(response.channel.presences);
        // Remove your own user from list.
        onlineUsers = onlineUsers.filter((user) => {
            return user !== response.channel.self;
        });
    
        console.log('got here3');
        handleMessage();
        checkOnlineUsers();
*/
    }
    catch(err){
        console.error("ERROR auth email", err.statusCode, err.message);
    }


})();

export default nakamaClient;