import React,{useState} from 'react';
import './MainCard.css';
import RowCard from './RowCard';

function Card() {
    const [cards,setCards ] = useState([
        {
            image:'https://rukminim1.flixcart.com/image/150/150/j5vcknk0/mixer-grinder-juicer/d/x/r/singer-chefy-original-imaewghzpsvumy7h.jpeg?q=70',
            title:'Best Deals On Appliances',
            offerText:'Up to 60% Off',
            otherText:'Irons, Mixers & more',
        },
        {
            image:'https://rukminim1.flixcart.com/image/150/150/jwjkh3k0/pendrive/pendrive/f/7/w/sandisk-sdcz73-032g-i35-original-imafh3xkhmyzxadk.jpeg?q=70',
            title:'Pendrives & Memory Cards',
            offerText:'From ₹289',
            otherText:'Samsung, Sandisk & More',
        },
        {
            image:'https://rukminim1.flixcart.com/image/150/150/jamtevk0/carabiner/n/s/6/silver-colour-car-design-1-techpro-original-imafy5n9cjacnweb.jpeg?q=70',
            title:'Pens, Key Chains & More',
            offerText:'Upto50%+Extra10% Off',
            otherText:'Faber-Castell, Cello & More',
        },
        {
            image:'https://rukminim1.flixcart.com/image/150/150/jmf76vk0/oil-dispenser/d/b/j/pp-842-mastercook-original-imaf9c69cct6chfh.jpeg?q=70',
            title:'Oil Dispenser & more',
            offerText:'From ₹149',
            otherText:'Wonderchef &amp; more',
        },{
            image:'https://rukminim1.flixcart.com/image/150/150/jjelq4w0/shoe/e/f/c/pikaw20180014-8-provogue-tan-original-imaf6zj82yshc3sp.jpeg?q=70',
            title:'Provogue, Ducati...',
            offerText:'Under ₹999',
            otherText:'Shoes, Sandals...',
        },
        {
            image:'https://rukminim1.flixcart.com/image/150/150/k0wqwsw0/sticker/q/k/n/wall-stickers-wallpaper-gold-batik-motifs-living-room-creative-original-imafkhkm3zgatha5.jpeg?q=70',
            title:'Home Decor Range',
            offerText:'From ₹49',
            otherText:'Stickers & more',
        },
        {
            image:'https://rukminim1.flixcart.com/flap/150/150/image/d83a8d44e30052f3.jpg?q=70',
            title:'Sports & Fitness Accessories',
            offerText:'Upto 80% Off',
            otherText:'Badminton, Dumbbells & more'
        },
        {
            image:'https://rukminim1.flixcart.com/image/150/150/k0wqwsw0/bulb/6/u/y/10w-eveready-original-imafkhzxxmzvmuam.jpeg?q=70',
            title:'LED Bulbs & more',
            offerText:'From ₹99',
            otherText:'Eveready, Philips &amp; more'
        }
    ])
    return (
        <div className="maincard">
            <div className="maincard__cards">
                {
                    cards.map((card,id)=>(
                        <RowCard id={id} title={card.title} image={card.image} offerText={card.offerText} otherText={card.otherText}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Card
