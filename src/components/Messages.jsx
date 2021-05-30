import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';

const Messages = (props) => {
    const currentChannelId = useSelector(state => state.channelsInfo.currentChannelId);
    const currentMessages = useSelector(state => state.messagesInfo.messages.filter(message => message.channelId === currentChannelId));
    const currentChannel = useSelector(state => state.channelsInfo.channels.find(ch => ch.id === currentChannelId));

    const renderMessages = () => {
        return currentMessages.map(mes => <Message key={mes.id} name={mes.username} message={mes.message} />)
    }

    return (
        <React.Fragment>
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {currentChannel && currentChannel.name}</b>
                </p>
                <span className="text-muted">
                    Сообщений - {currentMessages.length}
                </span>
            </div>

            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {renderMessages()}
            </div>
        </React.Fragment>
    )
}

export default Messages;
