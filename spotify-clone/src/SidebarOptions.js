import React from 'react'
import './SidebarOptions.css';

function SidebarOptions({id,title,Icon}) {
    return (
        <div id={id} className="sidebarOption">
            {Icon && <Icon className="sidebarOption__icon"/>}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SidebarOptions
