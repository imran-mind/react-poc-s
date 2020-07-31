import React from 'react';
import './Chats.css';
import Chat from './Chat';

function Chats() {
    return (
        <div className="chats">
            <Chat
                name="Sara"
                message="Hey How are you"
                timestamp="40 seconds ago"
                profilePic="https://i.pinimg.com/236x/7e/46/29/7e4629c1f621d38faffb10a7ef537d8c.jpg"
            />
             <Chat
                name="Ellen"
                message="What is happening"
                timestamp="4 Minutes ago"
                profilePic="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed560d07fe4060006bbce1e%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D422%26cropX2%3D1300%26cropY1%3D0%26cropY2%3D879"
            />
             <Chat
                name="Sandra"
                message="lol"
                timestamp="4 days ago"
                profilePic="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MjE4MzI1MDA3/sandra-bullock-9542453-1-402.jpg"
            />
             <Chat
                name="Natasha"
                message="Ohh my god"
                timestamp="1 week ago"
                profilePic="https://i.pinimg.com/474x/e8/bd/f7/e8bdf73f36294c94dbb9e24054ff6a09.jpg"
            />
            {/* <h1>Chat is here</h1> */}
        </div>
    )
}

export default Chats;
