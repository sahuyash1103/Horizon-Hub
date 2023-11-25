import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

function ProtectedRoute({ element, children, ...rest }) {
  const { user, token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute', user, token);
    if (user || token) return;
    if (location.state?.path === '/auth/signup')
      navigate('/auth/signup');
    else
      navigate('/auth/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token])
  return (
    <>
      {children || element}
    </>
  )
}

export default ProtectedRoute