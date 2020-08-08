import React from 'react';
import './ChannelRow.css';
import { Avatar } from '@material-ui/core';
import Verfiied from '@material-ui/icons/CheckCircleOutlineOutlined';
function ChannelRow({image,channel,verified,subs,noOfVideos,description}) {
    return (
        <div className="channelRow">
            <Avatar
                className="channelRow__logo"
                src={image}
                alt={channel}
            />

            <div className="channelRow__text">
                <h4>{channel} {verified && <Verfiied/>}</h4>
                <p>
                    {subs} subscribers . {noOfVideos} Videos
                </p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ChannelRow
