import React from 'react';
import './RowCard.css';


function RowCard({image, title, offerText, otherText}) {
    return (
        <div className="rowcard">
            <img src={image} alt=""/>
            <div className="rowcard__title">{title}</div>
            <div className="rowcard__offer">{offerText}</div>
            <div className="rowcard__other">{otherText}</div>
        </div>
    )
}

export default RowCard
