import { Button, Modal } from 'react-bootstrap/'
import { useState, useEffect } from 'react'
import React from 'react'
import usersList from '../usersDB';
import './AddFriend.css'

//using logging.user.nickname
//logginguser.friends
//using setFriends
function AddFriend(props) {
    
    const [AllUsersNicknames,setUsersNicknames]  = useState("");
    
    const fetchAllNicknames = async() => {
        const response = await fetch('http://localhost:5094/api/Users/GetAllUsers',{
            method:'get',
            headers: {
                'Content-Type' : 'application/json'},
        })
        var allNickNames = await response.json();
        setUsersNicknames(allNickNames)
    }
    useEffect(() =>{
        fetchAllNicknames();
        console.log(AllUsersNicknames);
    },[]);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd = () => {
        let friendNick = document.getElementById("friendNick").value
        let friendUser = AllUsersNicknames.find(x => x == friendNick)
        console.log(friendUser)
        if (friendUser) {
            //User can't add himself as a contact
            if (props.loggingUserNickname==friendNick) {
                alert("User can't add himself as a contact");
                return;
            }
            //User can't add a friend that already in his contact list
            if (props.userContacts.find(x=>x == friendNick)) {
                alert("Friend already in contacts list");
                return;
            }
            props.setFriends((currentFriends) => {
                let newFriends = [...currentFriends];
                props.userContacts.push(friendNick)
                newFriends.push(friendNick)
                handleClose();
                console.log(props.userContacts);
                return newFriends;
            })
        }
        //No such friend in database
        else{
            alert("Friend doesn't exist")
        }
    }

    return (
        <div>
            <Button id="addFriendButton" onClick={handleShow}>Add friend</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add friend to chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input placeholder="Enter friend's name" id="friendNick"></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default AddFriend;