import React from 'react';
import notFoundIcon from '../assets/not_found.png';
import lookFor from '../assets/look_for.png';

const Message = ({ type, msg }) => {
    const src = type === 'error' ? notFoundIcon : lookFor;
    return (
        <div className="message">
            <img src={src} alt={msg}/>
            <div>{msg}</div>
        </div>
    );
}

export default Message;