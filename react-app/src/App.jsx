import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';
import { useDispatch } from 'react-redux';
import { setUser } from './redux-toolkit/reducers/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(setUser({ token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Router >
      <AppRoutes />
    </Router>
  );
}

export default App;
