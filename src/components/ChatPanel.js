import React, { Component, useState } from "react";
import {NakamaClient, socket} from '../utils/nakama';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './chat.css';

var onlineUsers = [];
let channel;
export const JoinChatRoom = async () => {
    //define 1 big room for all chat
    const roomname = "ZoombiesMainRoom";
    const persistence = true;
    const hidden = false;

    console.log("JoinChatRoom...");
    
    await socket.updateStatus("Hello, I am online now");

    // 1 = Room, 2 = Direct Message, 3 = Group

    channel = await socket.joinChat(roomname, 1, persistence, hidden);
    console.log("join response:", channel);

    console.log('got here3',channel.id);
    handleMessage();
    checkOnlineUsers();
}


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



function hideChat() {
    document.getElementById('chat-panel').style.display = "none";
}

function ChatPanel () {
        const [userText,setInputValue] = useState('');

        async function sendMessage() {
            console.log(userText);
            console.log(channel);
            
            var data = { "hello": "world" };
            const messageAck = await socket.writeChatMessage(channel.id, data);
            
        }

        const onInputValueChanged = (e) => {
            setInputValue(e.target.value);
            e.stopPropagation();
            
        }

        return (   
            <div id="chat-panel">
                <Container>
                    <Row className="mb-2">
                        <Col className="col-5">
                            Welcome <strong>Priceman614</strong>,
                        </Col>
                        <Col></Col>
                        <Col className="col-1">
                            <Button className="btn btn-danger" onClick={hideChat}>X</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div id="chatbox">
                                <span>13:02</span> <span id="name">Priceman614</span> <span>Hello this morning</span>
                            </div>
                        </Col>
                        <Col>
                            <div id="players">
                                Priceman614
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input name="usermsg" type="text" value={userText} id="usermsg" size="70" onChange={onInputValueChanged} />
                            <input name="submitmsg" type="submit" id="submitmsg" value="Send" onClick={sendMessage} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };



export default ChatPanel;