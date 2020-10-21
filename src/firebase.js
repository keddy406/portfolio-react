// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTnXlQZAbilZD3nJ7EwQzaWKuO9dAuQE4",
  authDomain: "my-website-24f95.firebaseapp.com",
  databaseURL: "https://my-website-24f95.firebaseio.com",
  projectId: "my-website-24f95",
  storageBucket: "my-website-24f95.appspot.com",
  messagingSenderId: "720137476602",
  appId: "1:720137476602:web:22723cab00d6c4f4b76c43",
  measurementId: "G-554S6TE3BV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
// const provider = new firebase.auth.EmailAuthProvider();

export { storage, auth };
export default db;
