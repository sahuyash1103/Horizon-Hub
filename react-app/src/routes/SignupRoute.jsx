import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import "../signup.css"
import { IoChatbubble } from "react-icons/io5";
import { SiGmail } from "react-icons/si";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMobile } from "react-icons/fa6";

import { signup } from '../axios/api/auth/auth.req';
import { setUser } from '../redux-toolkit/reducers/auth';
import { Link, useNavigate } from 'react-router-dom';

function SignupRoute() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await signup(name, phone, email, password);
        console.log(res);

        dispatch(setUser({ user: res?.data, token: res?.token }))
        navigate('/', { state: { path: '/auth/signup' } });
    }

    return (<div className='container'>
        <IoChatbubble className="chat" />
        <h2 className='h2'>ChitChat</h2>
        <h3 className='h3'>Connect and Communicate</h3>
        <div className='form2'>
            <form onSubmit={handleLogin}>
                <div className='txt_field'>
                    <FaUser className='icon' />
                    <input type="text"
                        placeholder='Enter your name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <span></span>
                </div>
                <div className='txt_field'>
                    <FaMobile className='icon' />
                    <input type="text"
                        placeholder='Enter your phone number'
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                    <span></span>
                </div>
                <div className='txt_field'>
                    <SiGmail className='icon' />
                    <input type="email"
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <span></span>
                </div>
                <div className='txt_field'>
                    <FaLock className="icon" />
                    <input type="password"
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <span></span>
                </div>
                <button className='lgn_btn'>SignUp</button>
                <div class="login_link">Please Click Here to
                    <Link to={'/auth/login'}> Login</Link>
                </div>
            </form>
        </div>
    </div>
    );
}

export default SignupRoute