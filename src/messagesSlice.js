import { createSlice } from '@reduxjs/toolkit';
import { setInitialState } from './channelsSlice.js';

export const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messages: []
    },
    reducers: {
      addMessage: (state, action) => {
        const { message }  = action.payload;
        state.messages.push(message);
      }
    },
    extraReducers: {
        [setInitialState]: (state, action) => {
            const { messages } = action.payload
            const newState =  { ...state, messages }
            return newState
        }
    }
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer;
