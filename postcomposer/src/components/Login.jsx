import { useState } from "react";
function Login({setIsLoggedIn}) {
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
        // console.log(password);
    }
    function handleLogin(e){
        e.preventDefault();
        if(username === "admin" && password === "password123"){
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0=.fakesignature";
            console.log("welcome admin!");
            localStorage.setItem("jwtToken",mockToken);
            setIsLoggedIn(true);
            setError('');
        }
        // else if(password==="letmein"){
        //     const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0=.fakesignature";
        //     console.log("welcome user");
        //     localStorage.setItem("jwtToken",mockToken);
        //     setIsLoggedIn(true);
        //     setError('');
        // }
        else{
            console.log("sorry u are not admin!");
            setError('Invalid username or password!');
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