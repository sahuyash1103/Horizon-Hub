import "../login.css"
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";

import { login } from '../axios/api/auth/auth.req';
import { setUser } from '../redux-toolkit/reducers/auth';
import { useNavigate } from 'react-router-dom';

function LoginRoute() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await login(email, password,);
        console.log(res);

        dispatch(setUser({ user: res.data, token: res.token }))
        navigate('/', { state: { path: '/auth/login' } });
    }

    return (<div className='container'>

        <div className='form'>
        
            <form onSubmit={handleLogin}>
                <div className="text_field">
                    <FaUser className="icons" />
                    <input type="email" placeholder='Enter registered user id'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <span></span>
                </div>
                <div className="text_field">
                    <FaLock className="icons" />
                    <input type="password" placeholder='Enter password' required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <span></span>
                </div>
                
                <button type="submit" >Login</button>

                <div class="google_button">
                    <button class="btn_google">
                            <  FcGoogle className="google" />
                            Login with google
                    </button>
                </div>

                <button className="otp_btn">Login with OTP?</button>
                
                <div class="register_link">Not registered? 
                    <a href=""> Register</a>
                </div>
            </form>
        </div>
        {/* <h1>LOGIN</h1> */}
        <IoChatbubble className="chat_icon" />
        <h2>ChitChat</h2>
        <h3>Connect and Communicate</h3>
    
    </div>

    );
}

export default LoginRoute