import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { login } from '../axios/api/auth/auth.req';
import { setUser } from '../redux-toolkit/reducers/auth';

function LoginRoute() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await login(email, password);
        console.log(res);

        dispatch(setUser({ user: res.data, token: res.token }))
    }

    return (<div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button type="submit" >Login</button>
        </form>
    </div>
    );
}

export default LoginRoute