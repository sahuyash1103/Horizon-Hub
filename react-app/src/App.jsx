import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { testAPI } from './axios/api/auth/auth.req';
import './App.css';

function App() {
  const checkApi = () => {
    testAPI().then(res => console.log(res)).catch(err => console.error(err));
  }

  useEffect(() => {
    checkApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router >
      <AppRoutes />
    </Router>
  );
}

export default App;
