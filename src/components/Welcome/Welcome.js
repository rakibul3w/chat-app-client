import React, { useState, useEffect } from "react";
import './Welcome.css';
export default function Welcome() {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const setDatas = async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem('ata')
                )?.username
            );
        }
        setDatas()
        console.log("wel")
    }, []);
    return (
        <div className='container'>
            {userName &&
                <h1>
                    Welcome, <span>{userName}!</span>
                </h1>
            }
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
}

