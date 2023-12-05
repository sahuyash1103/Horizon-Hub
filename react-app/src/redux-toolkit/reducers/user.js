import { createSlice } from "@reduxjs/toolkit"


const initState = {
    profile: {},
    friends: {},
    friendRequests: {},
    messages: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload
        },
        setFriends(state, action) {
            state.friends = action.payload
        },
        setFriendRequests(state, action) {
            state.friendRequests = action.payload
        },
        setMessages(state, action) {
            state.messages = action.payload
        },
        logout(state) {
            state.profile = null
            state.friends = null
            state.friendRequests = null
            state.messages = null
        }
    }
});

export const { logout, setFriendRequests, setFriends, setMessages, setProfile } = userSlice.actions

export default userSlice.reducer