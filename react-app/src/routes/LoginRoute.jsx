import "../login.css"
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { googleAuth, login, githubAuth, getToken } from '../axios/api/auth/auth.req';
import { setToken, setTokenValid, setUser, setKeepLoggedIn as setLoggedin } from '../redux-toolkit/reducers/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function LoginRoute() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const validateFormData = (_formData) => {
        const _errors = {};
        let isValid = true;
        const regex = {
            email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
        }

        if (!_formData.email) {
            _errors.email = 'Email is required';
            isValid = false;
        }
        if (!_formData.password) {
            _errors.password = 'Password is required';
            isValid = false;
        }
        if (!regex.email.test(_formData.email)) {
            _errors.email = 'Invalid email';
            isValid = false;
        }
        if (!regex.password.test(_formData.password)) {
            _errors.password = 'Invalid password';
            isValid = false;
        }

        setErrors(_errors);
        return isValid
    }

    const onChangeHandler = (e) => {
        const data = { ...formData, [e.target.name]: e.target.value };
        setFormData(data);
        validateFormData(data)
        showError && setShowError(false);
    }

    const loginWithGoogle = async () => {
        const url = googleAuth();
        window.open(url, '_self');
        sessionStorage.setItem('keepLoggedIn', JSON.stringify(keepLoggedIn));
    }

    const loginWithGithub = async () => {
        const url = githubAuth();
        window.open(url, '_self');
        sessionStorage.setItem('keepLoggedIn', JSON.stringify(keepLoggedIn));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setShowError(true);

        if (!validateFormData(formData)) return;

        const res = await login(formData.email, formData.password,);
        dispatch(setUser(res?.data));
        dispatch(setToken(res?.token));
        dispatch(setTokenValid(true));
        dispatch(setLoggedin(keepLoggedIn));
        sessionStorage.setItem('keepLoggedIn', JSON.stringify(keepLoggedIn));
        sessionStorage.setItem('token', res?.token);
        navigate(location.state?.from || '/', { replace: true });
    }

    const isLoggedin = async () => {
        let token = sessionStorage.getItem('token');
        if (!token) {
            const res = await getToken();
            token = res?.token;
        };
        if (!token) return;
        dispatch(setToken(token));
        sessionStorage.setItem('token', token);
        dispatch(setTokenValid(true));
        navigate(location.state?.from || '/', { replace: true });
    }

    useEffect(() => {
        isLoggedin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='login_container'>
            <div className='login_form'>
                <form onSubmit={handleLogin}>
                    <div className="loing_text_field">
                        <input
                            value={formData.email}
                            name="email"
                            type="text"
                            isvalid={errors.email ? 'false' : 'true'}
                            onChange={onChangeHandler}
                            placeholder='Enter your Email'
                        />
                        <span className="success_line"></span>
                        <span className="error_message" error-message={showError ? errors.email : ''}>
                        </span>
                        <FaUser className="icons" />
                    </div>
                    <div className="loing_text_field">
                        <input
                            value={formData.password}
                            name="password"
                            isvalid={errors.password ? 'false' : 'true'}
                            onChange={onChangeHandler}
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter password'
                        />
                        <span className="success_line"></span>
                        <span className="error_message" error-message={showError ? errors.password : ''}>
                        </span>
                        <FaLock className="icons" />
                        <div className="pass_info">
                            <BsInfoCircle />
                            <p className="password_requirements">password must be eight characters including one uppercase letter, one special character and alphanumeric characters</p>
                        </div>
                    </div>
                    <div className="login_options">
                        <div className="show_psswrd">
                            <input
                                type="checkbox"
                                id="show_password"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="show_password">Show password</label>
                        </div>
                        <div className="frgt_psswrd">
                            <p>Forgot password?</p>
                        </div>
                    </div>
                    <div className="login_btn_container">
                        <div className="keep_logged_in">
                            <input
                                type="checkbox"
                                id="keep_logged_in"
                                checked={keepLoggedIn}
                                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                            />
                            <label htmlFor="keep_logged_in">Keep me logged in</label>
                        </div>
                        <button className="login_button" type="submit" >Login</button>
                    </div>
                </form>
                <h3 className="or">or</h3>
                <button
                    className="google_button"
                    onClick={loginWithGoogle}
                >
                    <div className="google_icon">
                        <FcGoogle />
                    </div>
                    Continue with google
                </button>
                <button
                    className="github_button"
                    onClick={loginWithGithub}
                >
                    <div className="github_icon">
                        <BsGithub />
                    </div>
                    Continue with github
                </button>
                <div className="signup_link">
                    Not registered?
                    <Link to="/auth/signup">Signup</Link>
                </div>
            </div>
            <div className="login_logo_container">
                <div className="logo_content">
                    <IoChatbubble className="logo" />
                    <h2 id="login_page_title">ChitChat</h2>
                    <h3 id="login_page_sub_title">Connect and Communicate</h3>
                </div>
            </div>
        </div>
    );
}

export default LoginRoute