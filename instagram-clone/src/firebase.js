import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDasoUs4xW1poAfXtEvYgcx23j39JV42t8",
    authDomain: "instagram-clone-bf3b3.firebaseapp.com",
    databaseURL: "https://instagram-clone-bf3b3.firebaseio.com",
    projectId: "instagram-clone-bf3b3",
    storageBucket: "instagram-clone-bf3b3.appspot.com",
    messagingSenderId: "343592462841",
    appId: "1:343592462841:web:c9d06060d428387a557528",
    measurementId: "G-RLPST42V8M"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage}