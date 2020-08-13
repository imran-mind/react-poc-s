import React from 'react';
import './Menu.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Menu() {
    return (
        <div className="menu">
            <ul className="menu__list">
                <li>
                    <span>Electronics</span>
                    <ExpandMoreIcon className="menu__icon"/>
                </li>
                <li>
                    <span>TVs & Appliances</span>
                    <ExpandMoreIcon className="menu__icon"/>
                </li>
                <li>
                    <span>Men</span>
                    <ExpandMoreIcon className="menu__icon"/>
                </li>
                <li>
                    <span>Women</span>
                    <ExpandMoreIcon className="menu__icon"/>
                </li>
                <li>
                    <span>Baby & Kids</span>
                    <ExpandMoreIcon className="menu__icon"/>
                </li>
                <li>
                    <span>Home & Furniture</span>
                    <ExpandMoreIcon className="menu__icon"/>
                </li>
                <li>
                    <span>Sports,Books & More</span>
                    <ExpandMoreIcon className="menu__icon"/>
                </li>
                <li>
                    <span>Flight</span>
                </li>
                <li>
                    <span>Offer Zone</span>
                </li>
            </ul>
        </div>
    )
}

export default Menu
