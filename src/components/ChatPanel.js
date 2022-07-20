import React, { Component, useState } from "react";
import {nakamaClient, socket, session, username} from '../utils/nakama';
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

    //check for valid socket
    if (!socket) {
        console.log("joining chat failed, socket not available");
    } else {
        await socket.updateStatus("Hello, I am online now");

        // 1 = Room, 2 = Direct Message, 3 = Group
    
        channel = await socket.joinChat(roomname, 1, persistence, hidden);
        console.log("join ROOM response:", channel);

        //reset chat log
        document.getElementById('chatbox').innerHTML = '';

        onlineUsers = channel.presences;
        updateUsers();
    
        console.log('ROOM channel id is:',channel.id);
        handleMessage();
        watchOnlineUsers();

        //get chat history
        const chatResult = await nakamaClient.listChannelMessages(session, channel.id, 100, true);
        chatResult.messages.forEach((message) => {
            document.getElementById('chatbox').innerHTML += formatMessage(message.create_time, message.username, message.content.message);
        }); 
    }
}

function updateUsers () {
    document.getElementById('players').innerHTML = '';
    onlineUsers.forEach(player => {
            document.getElementById('players').innerHTML += player.username+"<br/>";
    });
}

const watchOnlineUsers = () => {
    socket.onchannelpresence = (presences) => {
        //console.log("onchannelpresences...");
        //console.log(presences);
        ///console.log("online users:BEFORE:",onlineUsers);
        // WHY DOESNT THIS WORK ??? Remove all users who left.
         onlineUsers = onlineUsers.filter((user) => {
            //console.log("inside filter, leaves:",presences.leaves);
            //console.log("filter out leaves looking for", user, presences.leaves.includes(user));
            //return !presences.leaves.includes(user);
            return !presences.leaves.some(userObj => userObj.user_id === user.user_id);
         
        });
        //console.log("online users:AFTER LEAVES:",onlineUsers);
        // Add all users who joined.
        presences.joins.forEach(playerObj => {
            onlineUsers.push(playerObj);
        })
        //console.log("online users:AFTER JOINS:",onlineUsers);
        updateUsers();
        //let the room know
        presences.joins.forEach(playerObj => {
            const msg = '<div class="user-joined">'+ playerObj.username +' has entered the room</div>';
            document.getElementById('chatbox').innerHTML += msg;
        });
        presences.leaves.forEach(playerObj => {
            const msg = '<div class="user-joined">'+ playerObj.username +' has left the room</div>';
            document.getElementById('chatbox').innerHTML += msg;
        })
    };
    //console.log("online users1:",onlineUsers);
}

function formatMessage(create_time, username, message) {
    const time = new Date(create_time);
    
    return '<div><span>'+ time.toLocaleTimeString() +'</span> <span id="name">'+username+'</span> <span>'+message+'</span></div>';
}

const handleMessage = () => {
    socket.onchannelmessage = (message) => {
        document.getElementById('chatbox').innerHTML += formatMessage(message.create_time, message.username, message.content.message);
    };
}

export const hideChat = async () =>  {
    document.getElementById('chat-panel').style.display = "none";
    
    console.log(await socket.leaveChat(channel.id));
}

function ChatPanel () {
        let [userText,setInputValue] = useState('');

        async function sendMessage() {
            
            var data = { "message": userText };
            const messageAck = await socket.writeChatMessage(channel.id, data);
            setInputValue('');
        }

        const onInputValueChanged = (e) => {
            setInputValue(e.target.value);
            e.stopPropagation();
            
        }

        function handleKeyDown(e) {
            if(e.keyCode === 13){
                sendMessage();
            }
        }

        return (   
            <div id="chat-panel" onKeyDown={handleKeyDown}>
                <Container>
                    <Row className="mb-2">
                        <Col className="col-5">
                            Welcome <strong>{username}</strong>,
                        </Col>
                        <Col></Col>
                        <Col className="col-1">
                            <Button className="btn btn-danger" onClick={hideChat}>X</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div id="chatbox">
                                Fetching chat...
                            </div>
                        </Col>
                        <Col>
                            <div id="players">
                                Fetching players...
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input name="usermsg" type="text" value={userText} placeholder="Enter chat message here" id="usermsg" size="70" onChange={onInputValueChanged} />
                            <input name="submitmsg" type="submit" id="submitmsg" value="Send" onClick={sendMessage} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };



export default ChatPanel;