import React from 'react';
import './SearchPage.css';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import ChannelRow from './ChannelRow';
import VideoRow from './VideoRow';

function SearchPage() {
    return (
        <div className="searchPage">
            <div className="searchPage__filter">
                <TuneOutlinedIcon/>
                <h2>FILTER</h2>
            </div>
            <hr/>

            <ChannelRow
                image="https://yt3.ggpht.com/a-/AOh14Gi0blNucH98Bom2X83gIgXcQVh-bMgYBD6j2ocboA=s88-c-k-c0xffffffff-no-rj-mo"
                channel="Imran Shaikh"
                verified
                subs="1M"
                noOfVideos={400}
                description="You can find awesome web development videos here"
            />

            <hr/>

            <VideoRow
                views="1.4M"
                subs="656k"
                description="Do you want to learn web dev free"
                timestamp="30 seconds ago"
                channel="Imran Shaikh"
                title="Let's Build First React App for Beginners"
                image="https://i.ytimg.com/vi/3C7Db8cRuec/hqdefault.jpg"
            /> 
            <VideoRow
                views="1.4M"
                subs="656k"
                description="Do you want to learn web dev free"
                timestamp="30 seconds ago"
                channel="Imran Shaikh"
                title="10 modern layouts in 1 line of CSS"
                image="https://i.ytimg.com/vi/qm0IfG1GyZU/hqdefault.jpg"
            /> 
            <VideoRow
                views="1.4M"
                subs="656k"
                description="Do you want to learn web dev free"
                timestamp="30 seconds ago"
                channel="Imran Shaikh"
                title="🔴 Build a COVID-19 Tracker with REACT JS for Beginners (React Hooks and Material UI)"
                image="https://i.ytimg.com/vi/tCAt8eEKPDc/hqdefault.jpg"
            />            
        </div>
    )
};

export default SearchPage
