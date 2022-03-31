// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuUXx9IF2SzHWnyudu-rIqpiOuvtT8NP0",
  authDomain: "preject-53394.firebaseapp.com",
  databaseURL: "https://preject-53394-default-rtdb.firebaseio.com",
  projectId: "preject-53394",
  storageBucket: "preject-53394.appspot.com",
  messagingSenderId: "71904085582",
  appId: "1:71904085582:web:f7c045f65f2bf9b01aa51f",
};

// Initialize Firebase
const fireBaseAuth = initializeApp(firebaseConfig);
export const db = getDatabase(fireBaseAuth)
console.log(db);
export {fireBaseAuth}
