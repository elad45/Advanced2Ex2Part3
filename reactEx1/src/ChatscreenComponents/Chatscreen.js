import React from 'react'
import './Chatscreen.css'
import ContactCard from './ContactCard';
import { useState, useEffect } from 'react'
import AddFriend from './AddFriend';
import usersList from '../usersDB';
import CurrentChat from './CurrentChat';
import Message from '../Message';

//loggingUser is the User object who is logged

function Chatscreen(props) {
    var loggedPersonUsername = localStorage.getItem("currentUser")
    var loggingUser = usersList.find(x => x.username == loggedPersonUsername)
    ////////////////////////////////////////////////////////////////////////////
    //this is the user nickname
    const [loggingUserNickname,setUserNickname]  = useState("");
    
    const fetchNickname = async() => {
        const response = await fetch('http://localhost:5094/api/Users?user='+loggedPersonUsername,{
            method:'get',
            headers: {
                'Content-Type' : 'application/json'},
        })
        var loggedPersonNickname = await response.text();
        setUserNickname(loggedPersonNickname)
    }
    useEffect(() =>{
        fetchNickname();
    },[]);
    
    // will be updated every time we add a friend to the current user. this is the loggeduser contacts
    //const [friends, setFriends] = useState(loggingUser.friends);
    // const [friends, setFriends] = useState(friendContacts);
    // console.log(friends)
    
    ////////////////////////////////////////////
    var friendContacts=[];
    const [friends, setFriends] = useState([]);

    const fetchContacts = async () => {
        const response = await fetch('http://localhost:5094/api/Contacts?user='+loggedPersonUsername,{
            method:'get',
            headers: {
                'Content-Type' : 'application/json'},
        })
        const data = await response.json();
        
        for (var i=0; i< data.length; i++) {
            friendContacts.push(data[i].name)
        }
        setFriends(friendContacts);
    }
    
    //now friends contains all the contactId
    useEffect(() =>{
        fetchContacts();
    },[]);
    
    ////////////////////////////////////////////
    
    // will be updated every time we click on a contact Card
    const [friendChat, setFriendChat] = useState("")

    const [userMessages, setMessage] = useState(loggingUser.chats)

    
    var handleSendMessage = () => {

        var newMessageText = document.getElementById("chatBar").value
        // blank message
        if (newMessageText == "") { return }
        var time = new Date().getTime()
        var newMessage = new Message(newMessageText, time, "text", loggingUser.nickname, friendChat.nickname)
        if(loggingUser.nickname>=friendChat.nickname){
            loggingUser.lastMessages.set(loggingUserNickname + friendChat.nickname, newMessageText + "*" + time)
            friendChat.lastMessages.set(loggingUserNickname + friendChat.nickname, newMessageText + "*" + time)
        } else {
            loggingUser.lastMessages.set(friendChat.nickname + loggingUserNickname, newMessageText + "*" + time)
            friendChat.lastMessages.set(friendChat.nickname + loggingUserNickname, newMessageText + "*" + time)
        }
        loggingUser.chats.push(newMessage)
        // temporary line, thats the work of the server
        friendChat.chats.push(newMessage)
        document.getElementById("chatBar").value = "";
        setMessage((messages) => {
            let newUserMessage = [...messages]
            newUserMessage.push(newMessage)
            return newUserMessage
        })
    }


    const element = document.getElementById("chat-messages-list");        
    useEffect(() => {
        if (element){
            element.scrollTop = element.scrollHeight
        }
    })
    return (
        <div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <div className="clearfix card chat-app" id="chat-window">
                <div className="people-list" id="people-list">
                    <div className="chat-header" id="profileAndButton">
                        <div id="myProfile">
                        <div><img id="myAvatar" src={loggingUser.avatar} /></div>
                        <div><span id="myNickname">{loggingUserNickname}</span></div>
                        </div>
                        <AddFriend loggingUserNickname = {loggingUserNickname} userContacts = {friends} setFriends={setFriends} />
                    </div>
                    <ContactCard loggingUser={loggingUser} userFriends={friends} setFriendChat={setFriendChat} />
                </div>
                <div className="chat" id="rightSide">
                    <div className="chat-header" id="chat-header" >
                        <div id="chat-header-avatar-name">
                            <img src={friendChat.avatar} id="chat-header-avatar" />
                            <div className="chat-about" id="chat-header-name">{friendChat.nickname}</div>
                        </div>
                    </div>
                    <CurrentChat loggingUser={loggingUser} hisFriend={friendChat} />
                    <div className="input-group mb-3" id="chat-line">
                        <input type="text" className="form-control" id="chatBar" placeholder="New message here..."></input>
                        <button className="btn btn-secondary" id="chatBox" type="button" onClick={handleSendMessage}> Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatscreen