import { createSlice } from "@reduxjs/toolkit"


const initState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        },
        logout(state) {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
        }
    }
});

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer