import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import themeReducer from './reducers/theme.reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        theme: themeReducer
    }
});

export default store;

