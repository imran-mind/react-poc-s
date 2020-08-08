import React,{ useState} from 'react';
import './Header.css';
import Menu from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import Apps from '@material-ui/icons/Apps';
import VideoCall from '@material-ui/icons/VideoCall';
import Notifications from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';

function Header() {
    const [input,setInput] = useState('');

    return (
        <div className="header">
            <div className="header__left">
                <Menu/>
                <Link to="/">
                    <img className="header__img" src="https://cdn.mos.cms.futurecdn.net/SytNGv3ZxAVCkvcspmbbvh.jpg"/>
                </Link>
            </div>
            
            <div className="header__input">
                <input onChange={e=>{setInput(e.target.value)}} type="text" placeholder="Search" />
                <Link to={`/search/${input}`}>
                    <Search className="header__inputButton"/>
                </Link>
            </div>

            <div className="header__right">
                <VideoCall className="header__icon"/>
                <Apps className="header__icon"/>
                <Notifications className="header__icon"/>
                <Avatar
                    className="header__icon"
                    src="https://yt3.ggpht.com/a-/AOh14Gi0blNucH98Bom2X83gIgXcQVh-bMgYBD6j2ocboA=s88-c-k-c0xffffffff-no-rj-mo"
                />
            </div>
        </div>
    )
}

export default Header
