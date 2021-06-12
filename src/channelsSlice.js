import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        channels: [],
        currentChannelId: null
    },
    reducers: {
        addChannel: (state, action) => {
            state.channels.push(action.payload.channel);
        },
        setInitialState: (state, action) => {
            const { channels, currentChannelId } = action.payload
            const newState = { ...state, channels, currentChannelId }
            return newState;
        },
        changeChannel: (state, action) => {
             state.currentChannelId = action.payload;
        },
        removeChannel: (state, action) => {
            state.channels = state.channels.filter(channel => channel.id !== action.payload.id);
        },
        renameChannel: (state, action) => {
            state.channels = state.channels.map(channel => {
                if (channel.id === action.payload.id) {
                    return { ...channel, name: action.payload.name };
                }
                return channel;
            })
        }
    },

});



export const { addChannel, setInitialState, changeChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
