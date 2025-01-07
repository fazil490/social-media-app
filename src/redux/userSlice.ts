import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    uid: string | null,
    name: string | null,
    email: string | null,
    photoUrl: string | null,
    bio: string | null,
    isAuthenticated: boolean
}

const initialState: UserState = {
    uid: null,
    name: null,
    email: null,
    photoUrl: null,
    bio: null,
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.uid = action.payload.uid
            state.name = action.payload.name
            state.email = action.payload.email
            state.photoUrl = action.payload.photoUrl
            state.bio = action.payload.bio
            state.isAuthenticated = true
        },
        logOut: (state) => {
            state.uid = null;
            state.name = null;
            state.email = null;
            state.photoUrl = null;
            state.isAuthenticated = false;
        }
    }
})

export const { logIn, logOut } = userSlice.actions
export default userSlice.reducer