import React, { useState, useEffect}from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import firebase from './firebase';
// {
//     name: 'steve jobs',
//     url: 'https://media.gettyimages.com/photos/apple-inc-ceo-steve-jobs-announces-the-new-ipad-as-he-speaks-during-picture-id96211512?k=6&amp;m=96211512&amp;s=612x612&amp;w=0&amp;h=GJuEBeNoHff9JTmzBuZuh7CLQJlZAGWQxTwnEmNql68='
// },
// {
//     name: 'mark zakarberg',
//     url: 'https://media.gettyimages.com/photos/mark-zuckerberg-chief-executive-officer-of-facebook-checks-his-phone-picture-id998115102?k=6&amp;m=998115102&amp;s=612x612&amp;w=0&amp;h=ZA-OnNvsC773-zBYn2tFy7jCHdjeN3J0HO7DAhhqvT8='
// }
function TinderCards() {
    const [people,setPeople] = useState([
        
    ])

    useEffect(()=>{
       const unsubscribe = firebase
            .collection('people')
            .onSnapshot(snapshot=>(
            setPeople(snapshot.docs.map(doc=>doc.data()))
        ));

        // this is the cleanup function
        return ()=>{
            unsubscribe();
        } 
    },[])
    return (
        <div>
            <div className="tinderCards__cardContainer">
                {
                    people.map(person=> (
                        <TinderCard
                            className="swipe"
                            key={person.name}
                            preventSwipe={['up','down']}
                            >
                            <div className="card"
                                style={{backgroundImage:`url(${person.url})`}}
                            >
                                <h3>{person.name}</h3> 
                            </div>
                        </TinderCard>
                    ))
                }
            </div>
        </div>
    )
}

export default TinderCards
