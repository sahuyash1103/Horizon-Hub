import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { signup } from '../axios/api/auth/auth.req';
import { setUser } from '../redux-toolkit/reducers/auth';

function SignupRoute() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await signup(name, phone, email, password);
        console.log(res);

        dispatch(setUser({ user: res.data, token: res.token }))
    }

    return (<div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="text"
                placeholder='Enter your name'
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <input type="text"
                placeholder='Enter your phone number'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
            />
            <input type="email"
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input type="password"
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button type="submit" >Login</button>
        </form>
    </div>
    );
}

export default SignupRoute