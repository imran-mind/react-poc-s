import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBKE3PMkBQpvUSbrWKukOl0tysGfmIFXLo",
    authDomain: "tinder-clone-b4eb5.firebaseapp.com",
    databaseURL: "https://tinder-clone-b4eb5.firebaseio.com",
    projectId: "tinder-clone-b4eb5",
    storageBucket: "tinder-clone-b4eb5.appspot.com",
    messagingSenderId: "629286047921",
    appId: "1:629286047921:web:6979ad3a123ee20f299290",
    measurementId: "G-28HP83NC32"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();

export default database;