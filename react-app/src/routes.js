import { Navigate, useRoutes } from 'react-router-dom';

import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HomeRoute from './routes/HomeRoute';
import Layout from './components/Layout';
import NotFoundRoute from './routes/NotFoundRoute';

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
                path: '/home/',
                element: <HomeRoute />
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundRoute />
    }
];

const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
}

export default AppRoutes;