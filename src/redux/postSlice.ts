import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface postContent {
    description: string | null;
    media: string[];
    uid: string | null;
    userName: string | null;
    userProfilePicture: string | null;
    likes: string[];
    mediaType: string | null;
}

const initialState: postContent = {
    description: null,
    media: [],
    uid: null,
    userName: null,
    userProfilePicture: null,
    likes: [],
    mediaType: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setUserDetails: (
            state,
            action: PayloadAction<{ uid: string; userName: string; userProfilePicture: string }>
        ) => {
            state.uid = action.payload.uid;
            state.userName = action.payload.userName;
            state.userProfilePicture = action.payload.userProfilePicture;
        },
        updateDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        addMedia: (state, action: PayloadAction<string>) => {
            state.media.push(action.payload);
        },
        removeMedia: (state, action: PayloadAction<string>) => {
            state.media = state.media.filter((url) => url !== action.payload);
        },
        setMediaType: (state, action: PayloadAction<string>) => {
            state.mediaType = action.payload;
        },
        clearPost: (state) => {
            state.description = null;
            state.media = [];
            state.mediaType = null;
            state.likes = []
        },
        clearAll: () => initialState,
    },
})

export const { setUserDetails, updateDescription, addMedia, removeMedia, setMediaType, clearPost, clearAll } = postSlice.actions
export default postSlice.reducer