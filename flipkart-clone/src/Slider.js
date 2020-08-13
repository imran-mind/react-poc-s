import React,{useState} from 'react';
import './Slider.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Slider() {
    const [images,setImage] = useState([
        'https://rukminim1.flixcart.com/flap/1688/280/image/ca8755c7346ca496.jpg?q=50',
        'https://rukminim1.flixcart.com/flap/1688/280/image/5e026c91aaaf79b8.jpg?q=50',
        'https://rukminim1.flixcart.com/flap/1688/280/image/5bc079c307a7d6ac.jpg?q=50',
        'https://rukminim1.flixcart.com/flap/1688/280/image/45350f46b7892207.jpg?q=50'
    ])
    return (
        <div className="slider">
            {/* <div className="left__icon">
                <div className="slider__leftButton">
                    <ArrowBackIosIcon className=""/>
                </div>
            </div> */}
            {
                images.map((item,i)=>(
                     <img src={item} alt="image" id={i}/>
                ))
            }
            {/* <div className="right__icon">
                <div className="slider__rightButton">
                    <ArrowForwardIosIcon/>
                </div>
            </div> */}
        </div>
    )
}

export default Slider
