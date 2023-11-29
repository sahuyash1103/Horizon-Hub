import { Navigate, useRoutes } from 'react-router-dom';

import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HomeRoute from './routes/HomeRoute';
import Layout from './components/Layout';

const routes = [
    {
        path: '/',
        element: <Navigate to={'/home'} />
    },
    {
        path: '/auth/login',
        element: <LoginRoute />
    },
    {
        path: '/auth/signup',
        element: <SignupRoute />
    },
    {
        path: '/home',
        element: (<ProtectedRoute element={<Layout />} />),
        children: [
            {
                path: '/home/chat',
                element: <h1>home</h1>
            }
        ]
    },
    {
        path: '*',
        element: <h1>404 Not Found</h1>
    }
];

const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
}

export default AppRoutes;