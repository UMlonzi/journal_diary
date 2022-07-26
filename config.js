import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyADqGdEpwbZp1r1I5dlt9ebMqgRgEW3hkc",
  authDomain: "journaldiary-decaa.firebaseapp.com",
  projectId: "journaldiary-decaa",
  storageBucket: "journaldiary-decaa.appspot.com",
  messagingSenderId: "227134562845",
  appId: "1:227134562845:web:46163b07351b8dc87c9cf4",
  measurementId: "G-T3K5ZKWWC7"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }