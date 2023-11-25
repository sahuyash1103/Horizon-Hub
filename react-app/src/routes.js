import { useRoutes } from 'react-router-dom';

import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HomeRoute from './routes/HomeRoute';

const routes = [
    {
        path: '/',
        element: <ProtectedRoute element={<HomeRoute />} />
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
        path: '*',
        element: <h1>404 Not Found</h1>
    }
];

const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
}

export default AppRoutes;