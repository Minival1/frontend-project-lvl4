import React from 'react';
import Channel from './Channel';
import { useSelector } from 'react-redux';

const Channels = (props) => {
    const channels = useSelector((state) => state.channelsInfo.channels);
    const activeChannel = useSelector(state => state.channelsInfo.currentChannelId);
    return (
        <ul className="nav flex-column nav-pills nav-fill">
            { channels.map(channel => <Channel key={channel.id} id={channel.id} active={activeChannel === channel.id} name={channel.name} isEditable={channel.removable} />) }
        </ul>
    );
};

export default Channels;
