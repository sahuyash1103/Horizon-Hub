import "../login.css"
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";

import { googleAuth, login, githubAuth } from '../axios/api/auth/auth.req';
import { setToken, setTokenValid, setUser } from '../redux-toolkit/reducers/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function LoginRoute() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const loginWithGoogle = async () => {
        const url = googleAuth();
        window.open(url, '_self');
    }
   
    const loginWithGithub = async () => {
        const url = githubAuth();
        window.open(url, '_self');
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await login(email, password,);
        dispatch(setUser(res?.data));
        dispatch(setToken(res?.token));
        dispatch(setTokenValid(true));
        sessionStorage.setItem('token', res?.token);
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

                <div className="frgt_psswrd">
                    <p>Forgot password?</p>
                </div>

                <button type="submit" >Login</button>
            </form>
            <div className="or">
                <h3 className="h3">or</h3>
            </div>
            <div className="google_button">
                <button className="btn_google" onClick={loginWithGoogle}>
                    Login with google
                    <div className="google"> <  FcGoogle /></div>
                </button>
            </div>
            <div className="google_button">
                <button className="btn_google" onClick={loginWithGithub}>
                    Login with github
                    <div className="google"> <  FcGoogle /></div>
                </button>
            </div>
            <div className="register_link">Not registered?
                <Link to="/auth/signup"> Signup</Link>
            </div>
        </div>
        {/* <h1>LOGIN</h1> */}
        <IoChatbubble className="chat_icon" />
        <h2>ChitChat</h2>
        <h3>Connect and Communicate</h3>

    </div>

    );
}

export default LoginRoute