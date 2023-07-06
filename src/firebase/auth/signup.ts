/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ISignUp } from '../../constant/types'
import {auth, db} from "../firebaseConfig"
import {doc, serverTimestamp, setDoc} from "firebase/firestore"

export async function signUp(formData: ISignUp) {
    try {
      if (!formData.firstName || !formData.email || !formData.password) {
        throw new Error('First Name, Email, and Password are required.');
      }
  
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
  
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: formData.userName,
      });
  
      const formCopy = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.userName,
        timeStamp: serverTimestamp(),
      };
  
      await setDoc(doc(db, 'users', user.uid), formCopy);
  
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'An error occurred during sign up.' };
    }
  }