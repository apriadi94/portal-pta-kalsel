import React, { useEffect, useState, createContext } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT ='http://192.168.1.4:8010'
const socket = socketIOClient(ENDPOINT);

export const ChatContext = createContext();
export const ChatProvider = ({ user, children }) => {

    const [auth, setAuth] = useState({
        token: 'berenang_renang_ketepian', 
        userId: user.id, 
        username: user.displayName, 
        profileImage : user.photoURL
    })

    const [room, setRoom] = useState({
        id: null,
        name: '',
        image : ''
    })
    
    const [to, setTo] = useState([])

    useEffect(() => {
        socket.auth = auth;
        socket.connect();
    }, [])

    const chatState = { socket, to, setTo, room, setRoom, auth, setAuth };

    return(
        <ChatContext.Provider value={chatState}>
            {children}
        </ChatContext.Provider>
    )
}