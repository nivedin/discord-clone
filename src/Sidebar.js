import React, { useEffect, useState } from 'react';
import './sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Sidebarchannel from './Sidebarchannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import {selectUser} from './features/userSlice';
import { useSelector } from 'react-redux';
import db, { auth } from './firebase';
import axios from './axios';
import Pusher from 'pusher-js';

var pusher = new Pusher('7e81b2c19f2a426f4a7f', {
    cluster: 'ap2'
  });

function Sidebar() {
  const user = useSelector(selectUser);

  const [channels,setChannels] = useState([]);

  const getChannels = () => {
      axios.get('/get/channelList')
      .then((res) => {
          setChannels(res.data)
      })
  }

  useEffect(() => {
     getChannels()
     const channel = pusher.subscribe('channels');
     channel.bind('newChannel', function(data) {
       getChannels()
     });

  },[])
  const handleAddChannel = () => {
      const channelName = prompt('Enter a new channel name');

      if(channelName){
          axios.post('/new/channel',{
              channelName:channelName
          })
      }
  }

    return (
        <div className="sidebar">

            <div className="sidebar__top">
                <h3>Discord</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>

                <div className="sidebar__channelList">
                    {channels.map((channel,i) => (
                        <Sidebarchannel channelName={channel.name} id={channel.id} key={i} />
                    ))}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>@{user.displayName}</h3>
                    <p>#{user.uid.substring(0,7)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>

        </div>
    )
}

export default Sidebar
