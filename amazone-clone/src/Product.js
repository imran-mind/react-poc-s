import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({id,title, image,price, rating}) {
    const [state,dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                id,title,image,price,rating
            }
        })
    }
    return (
        <div className="product" id={id}>
            <div callback="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_)=>{
                            return <p>⭐</p>
                        })
                    }
                </div>
            </div>
            
            <img src={image} alt="title"/>
            <button onClick={addToBasket}>Add to basket</button>
        </div>
    )
}

export default Product
