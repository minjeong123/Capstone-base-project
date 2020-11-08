import app from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAyK3NVYA71Po-toaowCqCNwhHfGubNhbM",
  authDomain: "job-listing-e3ef7.firebaseapp.com",
  databaseURL: "https://job-listing-e3ef7.firebaseio.com",
  projectId: "job-listing-e3ef7",
  storageBucket: "job-listing-e3ef7.appspot.com",
  messagingSenderId: "765081935728",
  appId: "1:765081935728:web:baecb3b6ef92f87b71f9b5",
};
// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };
