import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux-toolkit/store';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router >
            <AppRoutes />
        </Router>
    </Provider>
);

