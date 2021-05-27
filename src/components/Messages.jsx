import React from 'react';
import Message from './Message';

const Messages = (props) => {

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            <Message name="ser" message="1" />
            <Message name="admin" message="Hello" />
            <Message name="admin" message="Fuck you" />
        </div>
    )
}

export default Messages;
