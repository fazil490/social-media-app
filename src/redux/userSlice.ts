import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    uid: string | null,
    name: string | null,
    email?: string | null,
    photoUrl: string | null,
    bio: string | null,
    isAuthenticated?: boolean
    coverImg: string | null
}

const initialState: UserState = {
    uid: null,
    name: null,
    email: null,
    photoUrl: null,
    bio: null,
    coverImg: null,
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
            state.coverImg = action.payload.coverImg
        },
        logOut: (state) => {
            state.uid = null;
            state.name = null;
            state.email = null;
            state.photoUrl = null;
            state.isAuthenticated = false;
            state.coverImg = null
            state.bio = null
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
    }
})

export const { logIn, logOut, setUser } = userSlice.actions
export default userSlice.reducer