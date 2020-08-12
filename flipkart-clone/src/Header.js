import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Header() {

    return (
        <div className="header">
            <div className="header__left">
                <img className="header__logo" src="http://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png" />
                <a href="/" className="header__link">
                    Explore
                    <span>Plus</span>
                    <img src="http://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_b13a8b.png"/>
                </a>   

            </div>

            <div className="header__search">
                <input type="text" placeholder="Search for products, brands and more"/>
                <SearchIcon color="primary" className="header_searchIcon"/>
            </div> 

            <div className="header__right">
                <div className="header__rightFlipkart">
                    <p>Flipkart</p>
                    <ArrowDropDownIcon className="header__arrow"/>
                </div>
                <div className="header__rightFlipkart">
                    <p>More</p>
                    <ArrowDropDownIcon/>
                </div>
                <div className="header__rightFlipkart">
                    <p>Cart</p>
                    <ArrowDropDownIcon/>
                </div>
            </div>
        </div>
    )
}

export default Header
