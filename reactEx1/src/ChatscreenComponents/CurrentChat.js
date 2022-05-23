import React from 'react'
import './Chatscreen.css'
import ContactCard from './ContactCard';
import { useState } from 'react'
import AddFriend from './AddFriend';
import usersList from '../usersDB';
import './CurrentChat.css'

const CurrentChat = (props) => {
    // we will get the total messages from the loggingUser
    var totalMessages = props.loggingUser.chats
    // now we will filter the array to get messages only between the loggingUser and his friend
    var loggingUserMessages = totalMessages.filter(message =>
    ((message.author == props.loggingUser.nickname && message.receiver == props.hisFriend.nickname) ||
        (message.author == props.hisFriend.nickname && message.receiver == props.loggingUser.nickname)))


    return (
        <ul className="chat-history overflow-auto h-100" id="chat-messages-list">
            {
                loggingUserMessages.map((message) => {
                    if (message.type == "text") {
                        return (
                            message.author == props.loggingUser.nickname ?
                                (<li className="clearfix chat-messages">
                                    <div className="message-data">
                                    </div>
                                    <div className="message my-message">{message.data}</div>
                                </li>)
                                :
                                (<li className="clearfix chat-messages">
                                    <div className="message-data text-right">
                                    </div>
                                    <div className="message other-message float-right">{message.data} </div>
                                </li>)
                        )
                    }

                    else if (message.type == "image") {
                        return (
                            message.author == props.loggingUser.nickname ?
                                (<li className="clearfix chat-messages">
                                    <div className="message-data">
                                    </div>
                                    <img className="message my-message" style={{ maxWidth: "50%" }} src={message.data} />
                                </li>)
                                :
                                (<li className="clearfix chat-messages">
                                    <div className="message-data text-right">
                                    </div>
                                    <img className="message other-message float-right" style={{ maxWidth: "50%" }} src={message.data} />
                                </li>)
                        )
                    }

                    else if (message.type == "audio") {
                        return (
                            message.author == props.loggingUser.nickname ?
                                (<li className="clearfix chat-messages">
                                    <div className="message-data">
                                    </div>
                                    <audio controls className="message my-message">
                                        <source src={message.data} />
                                        The “audio” tag is not supported by your browser.
                                    </audio>
                                </li>)
                                :
                                (<li className="clearfix chat-messages">
                                    <div className="message-data text-right">
                                    </div>
                                    <audio controls className="message my-message float-right">
                                        <source src={message.data} />
                                        The “audio” tag is not supported by your browser.
                                    </audio>
                                </li>)
                        )
                    }

                    else if (message.type == "video") {
                        return (
                            message.author == props.loggingUser.nickname ?
                                (<li className="clearfix chat-messages">
                                    <div className="message-data">
                                    </div>
                                    <video controls className="message my-message" style={{ maxWidth: "65%" }}>
                                        <source src={message.data} />
                                        The “video” tag is not supported by your browser.
                                    </video>
                                </li>)
                                :
                                (<li className="clearfix chat-messages">
                                    <div className="message-data text-right">
                                    </div>
                                    <video controls className="message my-message float-right" style={{ maxWidth: "65%" }}>
                                        <source src={message.data} />
                                        The “video” tag is not supported by your browser.
                                    </video>
                                </li>)
                        )
                    }
                })
            }
        </ul>
    );
}

export default CurrentChat