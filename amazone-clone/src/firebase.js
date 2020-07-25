import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDZ6sFmlFRYTZb1c3V8zaW1V8GGXPeaJnw",
    authDomain: "clone-2c9a9.firebaseapp.com",
    databaseURL: "https://clone-2c9a9.firebaseio.com",
    projectId: "clone-2c9a9",
    storageBucket: "clone-2c9a9.appspot.com",
    messagingSenderId: "957323206238",
    appId: "1:957323206238:web:e034803d93710b318a1ecf",
    measurementId: "G-0QFG5TWRGQ"
});

const auth = firebase.auth();
export {auth};