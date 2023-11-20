import { useRoutes } from 'react-router-dom';

import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRoute';
import App from './App';

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/auth/login',
        element: <LoginRoute />
    },
    {
        path: '/auth/signup',
        element: <SignupRoute />
    }
];

const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
}

export default AppRoutes;