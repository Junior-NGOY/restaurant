// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqIiDXeywJvqCEcq-bsqx4RNRAR8UQHqw",
  authDomain: "bistro-d8cd7.firebaseapp.com",
  projectId: "bistro-d8cd7",
  storageBucket: "bistro-d8cd7.appspot.com",
  messagingSenderId: "725500541312",
  appId: "1:725500541312:web:9ba944ff3046024e1a6965",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
export { /* auth, */ db, storage, firebase };
