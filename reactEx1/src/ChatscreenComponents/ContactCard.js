import usersList from "../usersDB"
import './ContactCard.css'
import React from 'react';



const ContactCard = (props) => {
    console.log(props.contactsData)
    function currentMessages(friend){
        const fetchCurrentMessages = async () => {
            const response = await fetch('http://localhost:5094/api/Contacts/'+friend.id+'/messages?user='+props.loggedPersonUsername,{
                method:'get',
                headers: {
                    'Content-Type' : 'application/json'},
                })
            const data = await response.json();
            props.setFriendMsg(data);
            }
            fetchCurrentMessages();
    }

    return (
        <ul className="list-unstyled chat-list overflow-auto h-100">
            {
                props.contactsData.map((friend) => (
                    <div onClick={() => { props.setFriendChat(friend); currentMessages(friend); }} id="clicker">
                        <li id="wrapper">
                            <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" />
                            <div id="#wrapper-2">
                                <div id="wrapper-3">
                                    <span className="name">{friend.name}</span>
                                    <span id="time"> {friend.lastdate} </span>
                                </div>
                                <div id="latestComment" > {friend.last} </div>
                            </div>
                        </li>
                    </div>
                ))
            }
        </ul>
    );
}

export default ContactCard