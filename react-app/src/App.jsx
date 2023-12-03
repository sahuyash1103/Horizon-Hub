import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';
import { testAPI } from './axios/api/auth/auth.req';

function App() {
  const checkApi = () => {
    testAPI().then(res => console.log(res)).catch(err => console.error(err));
  }
  useEffect(() => {
    checkApi();
  }, []);
  return (
    <Router >
      <AppRoutes />
    </Router>
  );
}

export default App;
