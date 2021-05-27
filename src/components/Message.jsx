import React from 'react';

const Message = (props) => {
    const { name, message } = props;

    return <div className="text-break mb-2"><b>{name}</b>: {message}</div>
}

export default Message;
