import {Link, useNavigate} from "react-router-dom";
import usersList from './usersDB'
import './Loginform.css'

function LoginForm() {
    const navigate = useNavigate();

    const loginClick = async () => {
        let loggingPassword,loggingID;
        loggingPassword = document.getElementById("loginPassword").value;
        loggingID = document.getElementById("loginID").value;

        //valFetch is the returned value from login page
        var valFetch = await fetch('http://localhost:5094/api/Login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'},
            body: JSON.stringify({Id: loggingID, Password: loggingPassword})
        })
        console.log(valFetch.status);
        //wrong username
        if(valFetch.status == 404)
            alert("No such user");
        //wrong password
        else if (valFetch.status == 400)
            alert("Wrong password");    
        //logged in
        else {
            localStorage.setItem('currentUser', loggingID);
            navigate("/chat");
        }
            /*
        
        var c = await fetch('http://localhost:5094/api/Contacts/', {
        method: 'POST',
        headers: {    
            'Content-Type': 'application/json'},
        body: JSON.stringify({ id: loggingID, name: loggingPassword, server: "localhost:1000", user:"bob2" })
        })
        
        var b = await fetch('http://localhost:5094/api/Contacts/')
        */
       /*
        var loggingUser = usersList.find(x => x.username === loggingID);
        if (!loggingUser)
            alert("No such username");
        else if ((loggingUser) && loggingUser.password === loggingPassword) {
            localStorage.setItem('currentUser', loggingUser.username)
        navigate("/chat");
        }
        else {
            alert("Wrong password");
        }
        */
    }

    return (
        <div className="loginbox">
        <form action="">
        <span className="d-flex justify-content-center">
            <div>
                <div className="d-flex justify-content-center">
                    <h1>Login page</h1>
                </div>
                <br />
                <div className="row mb-3">
                    <label htmlFor="loginID" className="col-sm-3 col-form-label col-form-label-sm">Username</label>
                    <div className="col-sm-7">
                        <input type="username" className="form-control form-control-sm" id="loginID" placeholder="Enter Username" required/>
                    </div>
                </div>
                
                <div className="row mb-3">
                    <label htmlFor="loginPassword" className="col-sm-3 col-form-label-sm">Password</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control form-control-sm" id="loginPassword" placeholder="Enter password" required/>
                    </div>
                </div>
                <div className="row-sm">
                    <button type="button" className="btn btn-secondary" onClick = {loginClick}>Login</button>
                    <label className="m-1">Not registered? click <Link to="/register">here</Link> to register</label>
                </div>
            </div>            
        </span>
        </form>
        </div>
    );
}

export default LoginForm