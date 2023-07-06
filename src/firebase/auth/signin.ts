/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILogin } from "../../constant/types";
import {auth} from "../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";


export const signIn = async (formData: ILogin) => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
  
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'An error occurred during sign in.' };
    }
  };