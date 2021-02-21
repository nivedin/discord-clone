import React, { useEffect, useState } from 'react'
import "./chat.css";
import ChatHeader from './ChatHeader';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';
import axios from './axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('7e81b2c19f2a426f4a7f', {
    cluster: 'ap2'
  });


function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);

    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);
    //console.log("outer channel id",channelId);

    const getConversations = (channelId) => {
        console.log("inner_channel_id",channelId);
        if(channelId){
            axios.get(`/get/conversation?id=${channelId}`).then((res) => {
                // console.log(res.data);
                setMessages(res.data[0].conversation)
            })
        }
    }

    useEffect(() => {
        getConversations(channelId);
        const channel = pusher.subscribe('conversation');
        channel.bind('newMessage', function(data) {
            console.log("inner channel 2 id",channelId);
        getConversations(channelId)
     });
    },[channelId])

    //console.log(messages);
    const sendMessage = e => {
        e.preventDefault();

       axios.post(`/new/message?id=${channelId}`,{
           message:input,
           timestamp:Date.now(),
           user:user
       })
        setInput("")
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <div className="chat__messages">
               {messages.map((message) => (
                <Message
                 message={message.message}
                 timestamp={message.timestamp}
                 user={message.user}
                 />
               ))}
            </div>
            <div className="chat__input">
              <AddCircleIcon fontSize="large"/>
              <form>
                  <input disabled={!channelId} value={input} onChange={e => setInput(e.target.value)} placeholder={`Message #${channelName}`}/>
                  <button disabled={!channelId} onClick={sendMessage} className="chat__inputButton" type="submit">Send Message</button>
              </form>

              <div className="chat__inputIcons">
                  <CardGiftIcon fontSize="large"/>
                  <GifIcon fontSize="large"/>
                  <EmojiEmotionsIcon fontSize="large"/>
              </div>
            </div>
        </div>
    )
}

export default Chat;
