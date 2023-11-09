import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteUserStart: (state, action) => {
            state.loading = true;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signoutUserStart: (state, action) => {
            state.loading = true;
        },
        signoutUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signoutUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const { signInFailure, signInStart, 
    signInSuccess, updateUserFailure, 
    updateUserStart, updateUserSuccess,
deleteUserFailure,deleteUserStart, deleteUserSuccess,
signoutUserFailure, signoutUserStart, signoutUserSuccess} = userSlice.actions;

export default userSlice.reducer;