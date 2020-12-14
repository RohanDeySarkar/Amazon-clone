import firebase from"firebase";

const firebaseConfig = {
    apiKey: "AIzaSyACGBtdo6Gc85GhywI3W4IB4vf3ylBbbaU",
    authDomain: "clone-d227e.firebaseapp.com",
    databaseURL: "https://clone-d227e.firebaseio.com",
    projectId: "clone-d227e",
    storageBucket: "clone-d227e.appspot.com",
    messagingSenderId: "638250290460",
    appId: "1:638250290460:web:dafa6620c7c0eb06a97ed9",
    measurementId: "G-YPV99EGB6Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};