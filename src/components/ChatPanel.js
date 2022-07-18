import React, { Component, useState } from "react";
import {NakamaClient, socket, username} from '../utils/nakama';
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
    onlineUsers = channel.presences;
    //onlineUsers.push(channel.self);
    updateUsers();

    console.log('got here3',channel.id);
    handleMessage();
    watchOnlineUsers();
}

function updateUsers () {
    document.getElementById('players').innerHTML = '';
    onlineUsers.forEach(player => {
            document.getElementById('players').innerHTML += player.username +"<br/>";
    });
}

const watchOnlineUsers = () => {
    socket.onchannelpresence = (presences) => {
        console.log("presences updates incoming...");
        console.log(presences);
        console.log("before update..watch usersOnline:",onlineUsers);
        // Remove all users who left.
        onlineUsers = onlineUsers.filter((user) => {
            console.log("inside the Leaves filter",user,presences.leaves.includes(user));
            return presences.leaves.includes(user);
        });
        // Add all users who joined.
        //onlineUsers = onlineUsers.concat(presences.joins);
        presences.joins.forEach(playerObj => {
            onlineUsers.push(playerObj);
        })
        console.log("online users2:",onlineUsers);
        
        //let the room know
        presences.joins.forEach(playerObj => {
            const msg = '<div class="user-joined">'+ playerObj.username +' has entered the room</div>';
            document.getElementById('chatbox').innerHTML += msg;
        });
        presences.leaves.forEach(playerObj => {
            const msg = '<div class="user-joined">'+ playerObj.username +' has left the room</div>';
            document.getElementById('chatbox').innerHTML += msg;
        })
        updateUsers(); //view
    };
}

const handleMessage = () => {
    socket.onchannelmessage = (message) => {
        console.log("Received a message", message);
        console.log(message.username);
        console.log(message.content);
        console.log(message.create_time);

        const time = new Date(message.create_time);
    
        const msg = '<div><span>'+ time.toLocaleTimeString() +'</span> <span id="name">'+message.username+'</span> <span>'+message.content.message+'</span></div>';
        document.getElementById('chatbox').innerHTML += msg;
    };
}

async function hideChat() {
    document.getElementById('chat-panel').style.display = "none";
    await socket.leaveChat(channel.id);
}

function ChatPanel () {
        let [userText,setInputValue] = useState('');

        async function sendMessage() {
            console.log(userText);
            console.log(channel);
            
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
            <Row>
                <Col></Col>
                <Col className="col-6">   
                    <div id="chat-panel" onKeyDown={handleKeyDown} className="">
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
                </Col>
                <Col className="col-1"></Col>
            </Row>
        );
    };



export default ChatPanel;