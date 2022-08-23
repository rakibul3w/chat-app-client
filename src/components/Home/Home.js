import React from 'react';
import Chat from '../Chat/Chat';
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Chat />
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    );
};

export default Home;