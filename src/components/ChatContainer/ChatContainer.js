import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import './ChatContainer.css';
import Logout from "../Logout/Logout";

export default function ChatContainer({ currentChat, socket, currentSelectedUser }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    

    useEffect(() => {
        const data = JSON.parse(
            localStorage.getItem('userData')
        );
        const recieveMsg = async () => {
            const response = await axios.post('https://salty-eyrie-27851.herokuapp.com/api/messages/getmsg', {
                from: data._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
        recieveMsg()
        console.log("chat",currentChat)
        console.log("user", currentSelectedUser)
    }, [currentChat]);

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(
                    localStorage.getItem('userData')
                )._id;
                console.log(currentChat)
            }
        };
        getCurrentChat();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem('userData')
        );
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            msg,
        });
        await axios.post('https://salty-eyrie-27851.herokuapp.com/api/messages/addmsg', {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
        console.log(messages)
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div claName='layout-main-container'>
            <div className="layout-chat-header">
                <div className="layout-user-details">
                    <div className="layout-avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt=""
                        />
                    </div>
                    <div className="layout-username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="layout-chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef}>
                            <div
                                className={`layout-message ${message.fromSelf ? "sended" : "recieved"
                                    }`}
                            >
                                <div className="layout-content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="input-wrapper">
            <ChatInput handleSendMsg={handleSendMsg} />
            </div>
        </div>
    );
}
