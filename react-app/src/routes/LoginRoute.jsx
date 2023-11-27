import "../login.css"
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";

import { login } from '../axios/api/auth/auth.req';
import { setToken, setTokenValid, setUser } from '../redux-toolkit/reducers/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function LoginRoute() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await login(email, password,);
        dispatch(setUser(res?.data));
        dispatch(setToken(res?.token));
        dispatch(setTokenValid(true));
        localStorage.setItem('token', res?.token);
        navigate(location.state?.from || '/', { replace: true });
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

                <div className="google_button">
                    <button className="btn_google">
                        <  FcGoogle className="google" />
                        Login with google
                    </button>
                </div>

                <button className="otp_btn">Login with OTP?</button>

                <div className="register_link">Not registered?
                    <Link to="/auth/signup"> Signup</Link>
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