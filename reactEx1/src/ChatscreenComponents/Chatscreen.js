import React from 'react'
import './Chatscreen.css'
import ContactCard from './ContactCard';
import { useState, useEffect } from 'react'
import AddFriend from './AddFriend';
import usersList from '../usersDB';
import CurrentChat from './CurrentChat';
import Message from '../Message';
import AudioMsg from '../AudioMsg';

async function Chatscreen(props) {
    var loggedPersonUsername = localStorage.getItem("currentUser")  
    var loggingUser="alice"
    //delete from ex2
    //var loggingUser = usersList.find(x => x.username == loggedPersonUsername)


    //    if (localStorage.getItem(loggingUser.username)) {
//        loggingUser.avatar = localStorage.getItem(loggingUser.username)
//    }
    // will be updated every time we add a friend to the current user
    console.log(loggedPersonUsername) //
    var loggedUserFriends = await fetch('http://localhost:5094/api/Contacts?user='+loggedPersonUsername)
    loggedUserFriends = await loggedUserFriends.json();
    //doesn't work
    var friends = []
    for(var i in loggedUserFriends) {
        friends.push(i[0])
    }
    console.log(loggedUserFriends) //
    /////////////////////////////

    const [friends, setFriends] = useState(loggingUser.friends);
    // will be updated every time we click on a contact Card
    const [friendChat, setFriendChat] = useState("")

    const [userMessages, setMessage] = useState(loggingUser.chats)

    //const element = document.getElementById("chat-messages-list");
   
    var handleSendMessage = () => {

        var newMessageText = document.getElementById("chatBar").value
        // blank message
        if (newMessageText == "") { return }
        var time = new Date().getTime()
        var newMessage = new Message(newMessageText, time, "text", loggingUser.nickname, friendChat.nickname)
        if(loggingUser.nickname>=friendChat.nickname){
            loggingUser.lastMessages.set(loggingUser.nickname + friendChat.nickname, newMessageText + "*" + time)
            friendChat.lastMessages.set(loggingUser.nickname + friendChat.nickname, newMessageText + "*" + time)
        } else {
            loggingUser.lastMessages.set(friendChat.nickname + loggingUser.nickname, newMessageText + "*" + time)
            friendChat.lastMessages.set(friendChat.nickname + loggingUser.nickname, newMessageText + "*" + time)
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

   //not required from ex1 -- don't add it back
  //  useEffect(() => {
  //      if (element)
  //          element.scrollIntoView(false)
  //  })

    /*
    var handleImageMsg = () => {
        console.log("upload Image");
        var thisElement = document.getElementById("imageInput");
        var reader = new FileReader();
        reader.onload = function () {
            var thisImage = reader.result;
            var time = new Date().getTime()
            if(loggingUser.nickname>=friendChat.nickname){
                loggingUser.lastMessages.set(loggingUser.nickname + friendChat.nickname, "An image has been sent" + "*" + time)
                friendChat.lastMessages.set(loggingUser.nickname + friendChat.nickname, "An image has been sent" + "*" + time)
            } else {
                loggingUser.lastMessages.set(friendChat.nickname + loggingUser.nickname, "An image has been sent" + "*" + time)
                friendChat.lastMessages.set(friendChat.nickname + loggingUser.nickname, "An image has been sent" + "*" + time)
            }
            var newMessage = new Message(thisImage, time, "image", loggingUser.nickname, friendChat.nickname)
            loggingUser.chats.push(newMessage)
            // temporary line, thats the work of the server
            friendChat.chats.push(newMessage)
            document.getElementById("imageInput").value = "";
            setMessage((messages) => {
                let newUserMessage = [...messages]
                newUserMessage.push(newMessage)
                return newUserMessage
            })

        };
        reader.readAsDataURL(thisElement.files[0]);
        
    };
    */

    /*
    var handleVideoMsg = () => {
        console.log("upload Video");
        var thisElement = document.getElementById("videoInput");
        var reader = new FileReader();
        reader.onload = function () {
            var thisVideo = reader.result
            var time = new Date().getTime()
            if(loggingUser.nickname>=friendChat.nickname){
                loggingUser.lastMessages.set(loggingUser.nickname + friendChat.nickname, "A video has been sent" + "*" + time)
                friendChat.lastMessages.set(loggingUser.nickname + friendChat.nickname, "A video has been sent" + "*" + time)
            } else {
                loggingUser.lastMessages.set(friendChat.nickname + loggingUser.nickname, "A video has been sent" + "*" + time)
                friendChat.lastMessages.set(friendChat.nickname + loggingUser.nickname, "A video has been sent" + "*" + time)
            }
            var newMessage = new Message(thisVideo, time, "video", loggingUser.nickname, friendChat.nickname)
            loggingUser.chats.push(newMessage)
            // temporary line, thats the work of the server
            friendChat.chats.push(newMessage)
            document.getElementById("videoInput").value = "";
            setMessage((messages) => {
                let newUserMessage = [...messages]
                newUserMessage.push(newMessage)
                console.log(newUserMessage)
                return newUserMessage
            })

        };
        reader.readAsDataURL(thisElement.files[0]);
    };
    */

    /*
    var clickImageInput = () => {
        document.getElementById("imageInput").click();
    }

    var clickVideoInput = () => {
        document.getElementById("videoInput").click();
    }
    */
    
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
                        <div><span id="myNickname">{loggingUser.nickname}</span></div>
                        </div>
                        <AddFriend loggingUser={loggingUser} setFriends={setFriends} />
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
                        <div className="input-group-prepend">
                            <input id="imageInput" type="file" onChange={handleSendMessage} accept="image/*" hidden></input>

                            <button className="iconBoxes bi bi-image" id="imageUpload" onClick={handleSendMessage}><i> </i></button>

                            <input id="videoInput" type="file" onChange={handleSendMessage} accept="video/*"  hidden></input>

                            <button className="iconBoxes bi bi-camera-reels" id="videoUpload" onClick={handleSendMessage}><i ></i></button>


                            <button type="button" className="iconBoxes bi bi-mic" data-bs-toggle="modal" data-bs-target="#exampleModal" id="recordingUpload"></button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Audio Recording</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <AudioMsg setFriendChat={setFriendChat} loggingUser={loggingUser} userMessages={userMessages} setMessage={setMessage}></AudioMsg>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="text" className="form-control" id="chatBar" placeholder="New message here..."></input>
                        <button className="btn btn-secondary" id="chatBox" type="button" onClick={handleSendMessage}> Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatscreen