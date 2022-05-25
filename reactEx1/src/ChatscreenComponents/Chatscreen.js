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
    ///you are in a good place! start work from here again! (now implemeneting add friend)
    ////////////////////////////////////////////
    var friendContacts=[];
    //all contacts nicknames
    const [friends, setFriends] = useState([]);

    //all contacts data. "friends" should be removed at the end of the connection between react and server
    const [contactsData, setContactsData] = useState([]);
    
    const fetchContacts = async () => {
        //const response = await fetch('http://localhost:5094/api/Contacts?user='+loggedPersonUsername,{
          const response = await fetch('http://localhost:5094/api/Contacts/allContacts?user='+loggedPersonUsername,{  
            method:'get',
            headers: {
                'Content-Type' : 'application/json'},
        })
        const data = await response.json();
        
        for (var i=0; i< data.length; i++) {
            friendContacts.push(data[i].name)
            //friendContacts.push(data[i].id) ------ it should be back to this one!
        }
        setFriends(friendContacts); // have to be replaces by setContactsData at the end because it contains all contacts
        setContactsData(data);
    }
    
    //now friends contains all the contactId
    useEffect(() =>{
        fetchContacts();
    },[]);
    
    ////////////////////////////////////////////
    
    // will be updated every time we click on a contact Card. this is contact object
    const [friendChat, setFriendChat] = useState("")

    const [friendMsg, setFriendMsg] = useState([])



    var handleSendMessage = async () => {

        var newMessageText = document.getElementById("chatBar").value
        // blank message
        if (newMessageText == "") { return }
        const addMsg = async(e) => {    
            var valFetch = await fetch('http://localhost:5094/api/Contacts/'+friendChat.id+'/messages', {
                method: 'POST',
                headers: {
                'Content-Type' : 'application/json'},
                body: JSON.stringify({content: newMessageText, userid: loggedPersonUsername})
            })
            console.log(valFetch.status);
            }

            await addMsg();

        const msgTransfer = async(e) =>{
            var valFetch = await fetch(`http://${friendChat.server}/api/Transfer/`, {
                method: 'POST',
                headers: {
                'Content-Type' : 'application/json'},
                body: JSON.stringify({from: loggedPersonUsername, to: friendChat.id ,content: newMessageText})
            })
            console.log(valFetch.status);
            }
            if (friendChat.server != "localhost:5094") {
                await msgTransfer();
            }

        const fetchFriendMsg = async () => {
            const response = await fetch('http://localhost:5094/api/Contacts/'+friendChat.id+'/messages?user='+loggedPersonUsername,{
                method:'get',
                headers: {
                    'Content-Type' : 'application/json'},
                })
            const data = await response.json();
            setFriendMsg(data);
            }
            
            //now friends contains all the contactId
            await fetchFriendMsg();

            var updateFriendContacts = []
            const updateContacts = async () => {
                //const response = await fetch('http://localhost:5094/api/Contacts?user='+loggedPersonUsername,{
                const response = await fetch('http://localhost:5094/api/Contacts/allContacts?user='+loggedPersonUsername,{  
                   method:'get',
                   headers: {
                        'Content-Type' : 'application/json'},
                })
                const data = await response.json();
                
                for (var i=0; i< data.length; i++) {
                    updateFriendContacts.push(data[i].name)
                    //friendContacts.push(data[i].id) ------ it should be back to this one!
                }
                setFriends(updateFriendContacts); // have to be replaces by setContactsData at the end because it contains all contacts
                setContactsData(data);
            }
             updateContacts();

        document.getElementById("chatBar").value = "";
    }


    const element = document.getElementById("chat-messages-list");        
    useEffect(() => {
        handleSendMessage()
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
                        <div><img id="myAvatar" src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" /></div>
                        <div><span id="myNickname">{loggingUserNickname}</span></div>
                        </div>
                        <AddFriend loggedPersonUsername = {loggedPersonUsername} contactsData = {contactsData} setContactsData={setContactsData} />
                    </div>
                    <ContactCard friendMsg={friendMsg} setFriendMsg={setFriendMsg}  setFriendChat={setFriendChat} contactsData = {contactsData} userFriends={friends} loggedPersonUsername={loggedPersonUsername} />
                </div>
                <div className="chat" id="rightSide">
                    <div className="chat-header" id="chat-header" >
                        <div id="chat-header-avatar-name">
                            <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" id="chat-header-avatar" />
                            <div className="chat-about" id="chat-header-name">{friendChat.name}</div>
                        </div>
                    </div>
                    <CurrentChat setFriendMsg={setFriendMsg} friendMsg={friendMsg} loggingUser={loggingUser} hisFriend={friendChat} />
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