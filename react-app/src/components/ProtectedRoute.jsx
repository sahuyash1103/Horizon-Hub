import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { getProfile } from '../axios/api/profile/getProfile.req';
import { logout as setLogout, setToken, setTokenValid, setUser } from '../redux-toolkit/reducers/auth';
import { setProfile } from '../redux-toolkit/reducers/user';
import { getToken, verifyToken, logout } from '../axios/api/auth/auth.req';

function ProtectedRoute({ element, children, ...rest }) {
  const { profile } = useSelector(state => state.user);
  const { keepLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cleanup = async () => {
    console.log("Clean up");
    dispatch(setLogout());
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('keepLoggedIn');
    const res = await logout();
    alert(`${res?.message}: keep logged in was unchecked` || 'Something went wrong: logout');
    navigateToLogin();
  }


  const navigateToLogin = () => {
    dispatch(setTokenValid(false));
    dispatch(setUser(null));
    dispatch(setLogout());
    sessionStorage.removeItem('token');
    navigate(location.state?.from || '/auth/login', { state: { from: location.pathname } });
  }

  const storeToken = async () => {
    const res = await getToken();
    const token = res?.token;
    // alert("Token: " + token);
    if (!token) return;
    dispatch(setToken(token));
    sessionStorage.setItem('token', token);
  }

  const checkToken = async () => {
    const res = await verifyToken();
    if (res?.data?.isValid) {
      dispatch(setTokenValid(true));
      return;
    }
    navigateToLogin();
  }

  const auth = async () => {
    if (profile) return;

    let token = sessionStorage.getItem('token');
    if (!token) await storeToken();

    checkToken();

    const res = await getProfile();
    if (res?.data) {
      dispatch(setProfile(res?.data));
      dispatch(setUser(res?.data));
      dispatch(setTokenValid(true));
      return;
    }

    navigateToLogin();
  }

  useEffect(() => {
    auth();
    return () => {
      const sessionKeepLoggedIn = JSON.parse(sessionStorage.getItem('keepLoggedIn')) || true;
      if (!keepLoggedIn && !sessionKeepLoggedIn) {
        cleanup();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {children || element}
    </>
  )
}

export default ProtectedRoute