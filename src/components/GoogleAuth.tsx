/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {signInWithPopup} from "firebase/auth"
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore"
import {db, auth, provider} from "../firebase/firebaseConfig"
import { useLocation, useNavigate } from 'react-router-dom'

const GoogleAuth:React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const handleAuthWithGoogle = async (e: any) =>{
    e.preventDefault();

    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user

        //check for user
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        //if !user, create user
        if(!docSnap.exists()){
            await setDoc(docRef, {
                name: user.displayName,
                email: user.email,
                timeStamp: serverTimestamp()
            });
        }
        navigate("/Feeds")
    }
    catch(error: any){
        alert(error.message)
    }
  }
  return (
    <button onClick={handleAuthWithGoogle}
    className="font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full h-10  bg-primary-blue text-biege flex gap-x-3 justify-center items-center"
    type='button'>
        <p>Sign {location.pathname === "/signup" ? "up" : "in"} with</p> Google
    </button>
  )
}

export default GoogleAuth
