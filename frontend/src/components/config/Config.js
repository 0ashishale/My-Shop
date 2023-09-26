import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAo96fGG9zHAdGyU7wa7iQ2etigs-fC5N8",
    authDomain: "sr-solution.firebaseapp.com",
    projectId: "sr-solution",
    storageBucket: "sr-solution.appspot.com",
    messagingSenderId: "829656453126",
    appId: "1:829656453126:web:530e7f1598112d32b53387",
    measurementId: "G-XHD7SD49QL"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  const storage = firebase.storage();

  export {auth, db, storage}
