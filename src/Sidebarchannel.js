import React from 'react'
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './features/appSlice';
import './sidebarchannel.css'

function Sidebarchannel({id,channelName}) {
    const dispatch = useDispatch();

    return (
        <div className="sidebarChannel" onClick={() => dispatch(setChannelInfo({
            channelId:id,
            channelName:channelName,
        })
        )
        }
        >
            <h4>
            <span className="sidebarChannel__hash">#</span>
            <span>{channelName}</span>
            </h4>
        </div>
    )
}

export default Sidebarchannel
