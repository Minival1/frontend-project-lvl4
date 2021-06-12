import { createSlice } from '@reduxjs/toolkit';
import { setInitialState } from './channelsSlice.js';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) => {
            const { message } = action.payload;
            state.messages.push(message);
        },
        removeMessages: (state, action) => {
            state.messages = state.messages.filter(message => message.channelId !== action.payload.id);
        }
    },
    extraReducers: {
        [setInitialState]: (state, action) => {
            const { messages } = action.payload;
            const newState = {
                ...state,
                messages
            };
            return newState;
        }
    }
});

export const { addMessage, removeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
