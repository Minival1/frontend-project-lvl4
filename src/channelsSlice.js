import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        channels: [],
        messages: [],
        currentChannelId: null
    },
    reducers: {
         addChannel: (state, action) => {
             state.channels.push(action.payload);
         },
        setInitialState: (state, action) => {
            const newState = { ...state, ...action.payload }
            return newState;
        },
        changeChannel: (state, action) => {
             state.currentChannelId = action.payload;
        }
    },

});



export const { addChannel, setInitialState, changeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
