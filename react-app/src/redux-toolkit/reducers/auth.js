import { createSlice } from "@reduxjs/toolkit"


const initState = {
    user: null,
    token: null,
    isTokenValid: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user
        },
        setToken(state, action) {
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        },
        setTokenValid(state, action) {
            state.isTokenValid = action.payload.isValid;
        },
        logout(state) {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
        }
    }
});

export const { setUser, logout, setToken } = authSlice.actions

export default authSlice.reducer