import React, {useState} from 'react';
import {WebSocketAdapterPb} from "@heroiclabs/nakama-js-protobuf"
import {JoinChatRoom, hideChat} from '../components/ChatPanel';
import Cookies from 'js-cookie';
import {Client,Session} from "@heroiclabs/nakama-js"

var session;
var socket;
let username;
var nakamaClient;


const InitNakamaClient = async () => {

    const authenticateUser = async () => {
        const r = Math.round(Math.random()*100);
        const email = "ryanpricelondon"+r+"@gmail.com";
        username = "Priceman"+r;
        const password = "12345678";
        const create = true;
    
        console.log("authenticating user...");
/** 
        if(Cookies.get('NAKAMA_USER_SESSION')){
            let auth_cookie = JSON.parse(Cookies.get('NAKAMA_USER_SESSION'));
            console.log("we have an auth cookie, try to re create session");
            console.log(auth_cookie);
            session = Session.restore(auth_cookie.token, auth_cookie.refresh_token);
            console.log("YAY, restored, session is go!", session);
        }else{
            console.log("No auth cookie, auth new user !");
            //session = await nakamaClient.authenticateEmail(email, password, create, username);
        }
*/
    }

    //Init App
    try {
        
        //nakamaClient = new Client(process.env.REACT_APP_NAKAMA_SERVER_KEY, "cryptoz.cards", 7350);
        nakamaClient = new Client("defaultkey", "127.0.0.1", 7350);
        console.log("nakama client:",nakamaClient);
            //await authenticateUser();

        socket = nakamaClient.createSocket(false,false,new WebSocketAdapterPb());
        console.log('got here', socket,session);

        socket.ondisconnect = (evt) => {
            console.info("Socket Disconnected", evt);
            // If current user, hide chat window
            hideChat();
        };
        socket.onerror = (evt) => {
            console.log("Socket error", evt);
        }
        var appearOnline = true;
        var connectionTimeout = 30;
        let session2 = await socket.connect(session, appearOnline, connectionTimeout);
        console.log('got here2',socket, session2);

        await JoinChatRoom();
    }
    catch(err){
        console.error("ERROR auth email", err);
    }
};

const GetNakamaSession = async () => {
    //Get Started
    if(Cookies.get('NAKAMA_USER_SESSION')){
        let auth_cookie = JSON.parse(Cookies.get('NAKAMA_USER_SESSION'));
        console.log("we have an auth cookie, try to re create session");
        //console.log(auth_cookie);
        session = Session.restore(auth_cookie.accessToken, auth_cookie.refresh_token);
        console.log("YAY, restored, session is go!", session);
        console.log("session isExpired:", session.isexpired());
        await InitNakamaClient();
    }

}

export {GetNakamaSession ,nakamaClient,socket,session, username};