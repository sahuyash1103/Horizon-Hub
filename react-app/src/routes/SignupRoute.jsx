import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { IoChatbubble } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMobile } from "react-icons/fa6";
import { signup, getToken } from '../axios/api/auth/auth.req';
import { setToken, setTokenValid, setUser, setKeepLoggedIn as setLoggedin } from '../redux-toolkit/reducers/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/SignupRoute.css"

function SignupRoute() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        cpassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(true);
    const [error, setError] = useState({});
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const validateFromData = (_formData) => {
        const _error = {};
        let isValid = true;
        const regex = {
            name: /^([0-9]*[a-zA-Z ]){3,}[0-9]*$/,
            phone: /^[0-9]{10}$/,
            email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        }
        if (!_formData.name) {
            _error.name = "Name is required";
            isValid = false;
        }
        if (!regex.name.test(_formData.name)) {
            _error.name = "Name is invalid";
            isValid = false;
        }
        if (!_formData.phone) {
            _error.phone = "Phone number is required";
            isValid = false;
        }
        if (!regex.phone.test(_formData.phone)) {
            _error.phone = "Phone number is invalid";
            isValid = false;
        }
        if (!_formData.email) {
            _error.email = "Email is required";
            isValid = false;
        }
        if (!regex.email.test(_formData.email)) {
            _error.email = "Email is invalid";
            isValid = false;
        }
        if (!_formData.password) {
            _error.password = "Password is required";
            isValid = false;
        }
        if (!regex.password.test(_formData.password)) {
            _error.password = "Password is invalid";
            isValid = false;
        }
        if (!_formData.cpassword) {
            _error.cpassword = "Confirm password is required";
            isValid = false;
        }
        if (!regex.password.test(_formData.cpassword)) {
            _error.cpassword = "Confirm password is invalid";
            isValid = false;
        }
        if (_formData.password !== _formData.cpassword) {
            _error.cpassword = "Password and confirm password must be same";
            isValid = false;
        }
        setError(_error);
        return isValid;
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        const data = {
            ...formData,
            [name]: value
        }
        setFormData(data);
        validateFromData(data);
        setShowError(false);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        setShowError(true);
        if (!validateFromData(formData)) return;

        const res = await signup(formData.name, formData.phone, formData.email, formData.password);
        if (!res || res?.error || !res?.data) {
            console.log("Signup Response: ", res);
            alert(res|| 'Something went wrong');
            return;
        }
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
        <div className='signup_container'>
            <div className="signup_logo_container">
                <div className="logo_content">
                    <IoChatbubble className="logo" />
                    <h2 id='signup_page_title'>ChitChat</h2>
                    <h3 id='signup_page_sub_title'>Connect and Communicate</h3>
                </div>
            </div>
            <div className='signup_form'>
                <form onSubmit={handleSignup} noValidate>
                    <div className='signup_text_field'>
                        <input
                            value={formData.name}
                            type="text"
                            name='name'
                            isvalid={error?.name ? 'false' : 'true'}
                            placeholder='Enter name'
                            onChange={onChangeHandler}
                        />
                        <span className='success_message' ></span>
                        <span className='error_message' error-message={showError ? error?.name : ''}>
                        </span>
                        <FaUser className='icon' />
                        <div className="info">
                            <BsInfoCircle />
                            <p className="password_requirements">must contain atleast 3 cherecter</p>
                        </div>
                    </div>
                    <div className='signup_text_field'>
                        <input
                            value={formData.phone}
                            type="text"
                            name='phone'
                            isvalid={error?.phone ? 'false' : 'true'}
                            placeholder='Enter phone number'
                            onChange={onChangeHandler}
                        />
                        <span className='success_message' ></span>
                        <span className='error_message' error-message={showError ? error?.phone : ''}>
                        </span>
                        <FaMobile className='icon' />
                        <div className="info">
                            <BsInfoCircle />
                            <p className="password_requirements">Phone number must be of 10 digits </p>
                        </div>
                    </div>
                    <div className='signup_text_field'>
                        <input
                            value={formData.email}
                            type="text"
                            name='email'
                            isvalid={error?.email ? 'false' : 'true'}
                            placeholder='Enter email'
                            onChange={onChangeHandler}
                        />
                        <span className='success_message' ></span>
                        <span className='error_message' error-message={showError ? error?.email : ''}>
                        </span>
                        <SiGmail className='icon' />
                    </div>
                    <div className='signup_text_field'>
                        <input
                            value={formData.password}
                            name='password'
                            isvalid={error?.password ? 'false' : 'true'}
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter password'
                            onChange={onChangeHandler}
                        />
                        <span className='success_message' ></span>
                        <span className='error_message' error-message={showError ? error?.password : ''}>
                        </span>
                        <FaLock className="icon" />
                        <div className="info">
                            <BsInfoCircle />
                            <p className="password_requirements">password must be eight characters including one uppercase letter, one special character and alphanumeric characters</p>
                        </div>
                    </div>
                    <div className='signup_text_field'>
                        <input
                            value={formData.cpassword}
                            name='cpassword'
                            isvalid={error?.cpassword ? 'false' : 'true'}
                            type={showPassword ? "text" : "password"}
                            placeholder='Confirm password'
                            onChange={onChangeHandler}
                        />
                        <span className='success_message' ></span>
                        <span className='error_message' error-message={showError ? error?.cpassword : ''}>
                        </span>
                        <FaLock className="icon" />
                    </div>
                    <div className="signup_options">
                        <div className="checkbox_inputs">
                            <input
                                type="checkbox"
                                id="show_password"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="show_password">Show password</label>
                        </div>
                        <div className="checkbox_inputs">
                            <input
                                type="checkbox"
                                id="keep_logged_in"
                                checked={keepLoggedIn}
                                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                            />
                            <label htmlFor="keep_logged_in">Keep me logged in</label>
                        </div>
                    </div>
                    <button className='signup_button'>SignUp</button>
                    <div className="login_link">
                        Already registered?
                        <Link to={'/auth/login'}> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupRoute