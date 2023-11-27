import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { getProfile } from '../axios/api/profile/getProfile.req';
import { logout, setToken, setTokenValid, setUser } from '../redux-toolkit/reducers/auth';
import { setProfile } from '../redux-toolkit/reducers/user';

function ProtectedRoute({ element, children, ...rest }) {
  const { profile } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = async () => {
    if (profile) return;
    const res = await getProfile();
    if (res?.data) {
      dispatch(setProfile(res?.data));
      dispatch(setUser(res?.data));
      dispatch(setToken(res?.token));
      dispatch(setTokenValid(true));
      return;
    }
    dispatch(setTokenValid(false));
    dispatch(setUser(null));
    dispatch(logout());

    navigate(location.state?.from || '/auth/login', { state: { from: location.pathname } });
  }

  useEffect(() => {
    isAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {children || element}
    </>
  )
}

export default ProtectedRoute