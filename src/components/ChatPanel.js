import React, { Component } from "react";
import {NakamaClient} from '../utils/nakama';

const JoinChatRoom = async () => {
    await NakamaClient();
    //define 1 big room for all chat
    const roomname = "ZoombiesMainRoom";
    const persistence = true;
    const hidden = false;

 /*   
    await NakamaClient.socket.updateStatus("Hello, I am online now");

    // 1 = Room, 2 = Direct Message, 3 = Group

    const channel = await NakamaClient.socket.joinChat(roomname, 1, persistence, hidden);
    console.log("join response:", channel);

    console.log('got here3',channel.channel_id);

    var data = { "hello": "world" };
    const messageAck = await NakamaClient.socket.writeChatMessage(channel.id, data);
    */
}

class ChatPanel extends Component {
    render () {
        JoinChatRoom();
        return (   
            <div id="chat-panel">
                Hello from chat
            </div>
        );
    };
};

export default ChatPanel;