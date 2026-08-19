import { useState } from "react";


function Login() {
    const [username, setUserName] = useState('');
    function handleUsername(e){
        const uname = e.target.value;
        setUserName(uname);
        console.log(username);
    }
    const [password, setPassword] = useState('');
    function handlePassword(e){
        const pass = e.target.value;
        setPassword(pass);
        console.log(password);
    }
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username">username:</label>
                    <input name="username" type="text" onChange={handleUsername} id="username" value={username}></input>
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input name="password" type="password" onChange={handlePassword} id="password" value={password}></input>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
    }

export default Login;