// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH2x0YKud_d0buGfcEzv2eMlvlMfk0cX4",
  authDomain: "chatter-5debe.firebaseapp.com",
  projectId: "chatter-5debe",
  storageBucket: "chatter-5debe.appspot.com",
  messagingSenderId: "56596560193",
  appId: "1:56596560193:web:dbf5055c8050cbd6e109c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app)


export { auth, db, provider, storage}