import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Login() {
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');
    function handleUsername(e){
        const uname = e.target.value;
        setUserName(uname);
        // console.log(username);
    }
    const [password, setPassword] = useState('');
    function handlePassword(e){
        const pass = e.target.value;
        setPassword(pass);
        // console.log(password);in
    }
    function handleLogin(e){
        e.preventDefault();
        let role;
        if(username === "Admin" && password === "password123"){
            role = "Admin";   
        }
        else if(username === "Editor" && password === "password123"){
            role = "Editor";
        }
        else if(username === "Viewer" && password === "password123"){
            role = "Viewer";
        }
        else{
            console.log("sorry u are not authenticated!");
            setError('Invalid username or password!');
            role = undefined;
        }
        if(role !== undefined){
        const header=btoa(JSON.stringify({"alg":"HS256","typ":"JWT"}));
        const payload = btoa(JSON.stringify({
        "username":username,
        "role":role
        }));
        const signature = "fakesignature"
        const mockToken = header+"."+payload+"."+signature;
        console.log("welcome " + role);
        localStorage.setItem("jwtToken",mockToken);
        dispatch(login({
            role: role,
            token: mockToken
        }));
        setError('');
        }else{
            setError("invalid role");
        }
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    name="username"
                    type="text"
                    onChange={handleUsername}
                    id="username"
                    value={username}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input 
                    name="password"
                    type="password"
                    onChange={handlePassword} 
                    id="password"
                    value={password}
                    ></input>
                </div>
                <button>
                Login
                </button>
                <div>{error}</div>
            </form>
        </div>
    );
    }

export default Login;