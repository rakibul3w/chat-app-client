import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Contacts from "../../components/Contacts/Contacts";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Welcome from "../../components/Welcome/Welcome";
import './Chat.css';

export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userData'))
        const setDatas = async () => {
            setCurrentUser(userInfo);
        }
        if (!localStorage.getItem('userData')) {
            navigate("/login");
        } else {
            setDatas();
            console.log(currentUser)
        }
    }, []);
    useEffect(() => {
        if (currentUser) {
            socket.current = io('http://localhost:5000');
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const getUser = async () => {
            const data = await axios.get(`https://salty-eyrie-27851.herokuapp.com/api/auth/allusers/${currentUser._id}`);
            setContacts(data.data);

        }
        if (currentUser) {
            getUser()
        }
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
        console.log(currentChat)
    };
    return (
        <>
            <div className='chat-main-Container'>
                <div className="chat-container">
                    <Contacts contacts={contacts} setCurrentSelectedUser={setCurrentSelectedUser} changeChat={handleChatChange} />
                    {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket} currentSelectedUser={currentSelectedUser} />
                    )}
                </div>
            </div>
        </>
    );
}
