import React from 'react'
import './Header.css';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import { Link,useHistory } from 'react-router-dom';

function Header({backButton}) {
    const history = useHistory();

    return (
        <div className="header">
                {backButton ?(
                    <IconButton onClick={()=>history.replace(backButton)}>
                        <ArrowBackIcon
                            className="header__icon"
                            fontSize="large"/>
                    </IconButton>
                ) : ( <IconButton>
                        <PersonIcon className="header__icon" fontSize="large" />    
                    </IconButton>
                )}
            <Link to="/">
                <img
                    // src="https://www.kindpng.com/picc/b/19/195266.png"
                    src="https://1000logos.net/wp-content/uploads/2018/07/tinder-logo.png"
                    alt=""
                    className="header__logo"
                />
            </Link>
            <Link to="/chat">
                <IconButton>
                    <ForumIcon className="header__icon" fontSize="large"/>
                </IconButton>
            </Link>
        </div>
    )
}

export default Header
