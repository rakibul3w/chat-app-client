import React, { useState, useEffect } from "react";
import './Contacts.css';
import avatarU from '../../assets/avater.png';

export default function Contacts({ contacts, changeChat, setCurrentSelectedUser }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
        const getData = async () => {
            const data = await JSON.parse(
                localStorage.getItem('userData')
            );
            setCurrentUserName(data.username);
            setCurrentUserImage(data?.avatarImage);
        }
        getData();
    }, []);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        setCurrentSelectedUser(contact);
        changeChat(contact);
    };
    return (
        <>
            {currentUserName && (
                <div className='container'>
                    <div className="brand">
                        <h3>Realtime Chat</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                currentUserName === contact.username ? <div style={{display: "none"}}></div> : <div
                                    key={contact._id}
                                    className={`contact ${index === currentSelected ? "selected" : ""
                                        }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={avatarU}
                                alt="avatar"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}