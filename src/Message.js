import { Avatar } from '@material-ui/core';
import React from 'react'
import './message.css'
import moment from 'moment';

function Message({message,timestamp,user}) {
  
    return (
        <div className="message">
            <Avatar src={user.photo}/>
            <div className="message__info">
                <h4>{user.displayName}
                <span className="message__timestamp">{moment(new Date(parseInt(timestamp)).toUTCString()).fromNow()}</span></h4>
            <p>{message}</p>
            </div>
        </div>
    )
}

export default Message;
