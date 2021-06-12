import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpened: false,
        type: null,
        channelId: null
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpened = true;
            state.type = action.payload.type;
            state.channelId = action.payload.channelId;
        },
        closeModal: (state) => {
            state.isOpened = false;
            state.type = null;
            state.channelId = null;
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
