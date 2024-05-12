// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFrvlqx51WnUzY778yWPy68H7W4ClNoUw",
  authDomain: "my-first-app-15b82.firebaseapp.com",
  projectId: "my-first-app-15b82",
  storageBucket: "my-first-app-15b82.appspot.com",
  messagingSenderId: "491538683381",
  appId: "1:491538683381:web:0eafadf5cce5fa34337cbc",
  measurementId: "G-YYYFS15NGC"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { app, db, auth ,firebase};
