import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggin: Boolean(localStorage.getItem("token"))
    },
    reducers: {
        signInState: (state) => {
            state.isLoggin = true;
        },
        signOutState: (state) => {
            state.isLoggin = false;
        }
    },

});



export const { signInState, signOutState } = loginSlice.actions;

export default loginSlice.reducer;
