import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });
    }, [socket]);

    const sendMessage = () => {
        socket.emit("send_message", { message });
    };

    return (
        <div>
            <input
                placeholder="Message..."
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}> Send Message</button>
            <h1> Message:</h1>
            {messageReceived}
        </div>
    );
};

export default Chat;