import firebase from "firebase";
var config = {
  apiKey: "AIzaSyB_xNJOYrLSgXuXL3mC0DeJrnLETELd4fQ",
  authDomain: "train-scrape.firebaseapp.com",
  databaseURL: "https://train-scrape.firebaseio.com",
  projectId: "train-scrape",
  storageBucket: "train-scrape.appspot.com",
  messagingSenderId: "742792206024"
};
firebase.initializeApp(config);

export default firebase.database();
