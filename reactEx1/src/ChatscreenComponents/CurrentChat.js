import React from 'react'
import './Chatscreen.css'
import ContactCard from './ContactCard';
import { useState } from 'react'
import AddFriend from './AddFriend';
import usersList from '../usersDB';
import './CurrentChat.css'

const CurrentChat = (props) => {
    return (
        <ul className="chat-history overflow-auto h-100" id="chat-messages-list">
            {
                props.friendMsg && props.friendMsg.length!= 0  && props.friendMsg.map((message) => {
                        return (
                            message.sent == true ?
                                (<li className="clearfix chat-messages">
                                    <div className="message-data">
                                    </div>
                                    <div className="message my-message">{message.content}</div>
                                </li>)
                                :
                                (<li className="clearfix chat-messages">
                                    <div className="message-data text-right">
                                    </div>
                                    <div className="message other-message float-right">{message.content} </div>
                                </li>)
                        )             
                })
            }
        </ul>
    );
}

export default CurrentChat