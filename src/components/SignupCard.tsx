/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { ISignUp } from '../constant/types'
import { signUpResolver, signUpDefaultValue} from '../constant/validtion';
import {useForm} from "react-hook-form"
import GoogleAuth from './GoogleAuth';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../firebase/auth/signup';


const SignupCard: React.FC = () => {


  const { register, handleSubmit, formState: { errors } } = useForm<ISignUp>({
    defaultValues: signUpDefaultValue,
    resolver: signUpResolver
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (values: ISignUp) => {
    
    setLoading(true);
    const { error } = await signUp(values);
    if (error) {
      console.log(error);
      
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/feed")

  }

  
  return (
    <div className='bg-biege flex  pt-7 w-full h-full'>
      <div className="px-16 text-primary-blue">
        <h2 className='text-2xl font-bold mb-4 text-center'>Create an account</h2>
        <form className='px-8 py-7 w-full h-full' >
          <div className="flex  mb-5 items-center justify-between">
            <div className=" mr-10">
              <label className='mr-7 mb-4'>First Name</label>
              <input type="text" 
              placeholder='John'
              {...register("firstName")}
              className=" border border-primary-blue rounded-md h-10 px-4 py-2 "
              />
              {errors.firstName && <p className='text-red w-full'>{errors.firstName.message}</p>}
            </div>
            <div className="w-2/4">
              <label className='mb-4'>Last Name</label>
              <input type="text" 
              placeholder='Doe '
              {...register("lastName")}
              className="border border-primary-blue rounded-md h-10 px-4 py-2"
              />
              {errors.lastName && <p className='text-red'>{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="mb-5">
            <label className='mb-4'>User Name</label>
            <input type="text"
            placeholder='Enter your username' 
            {...register("userName")}
            className="w-full border px-4 py-2 h-10 rounded-md"/>
            {errors.userName && <p className='text-red'>{errors.userName.message}</p>}
          </div>
          <div className="mb-5">
            <label className='mb-4'>Email</label>
            <input type="text"
            placeholder='example@gmail.com' 
            {...register("email")}
            className="w-full border px-4 py-2 h-10 rounded-md"/>
            {errors.email && <p className='text-red'>{errors.email.message}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="" className='mb-4'>Password</label>
            <input type="password"
            {...register("password")}
            placeholder="Enter password"
            className="w-full border px-4 py-2 h-10 rounded-md"/>
            {errors.password && <p className='text-red'>{errors.password.message}</p>}
          </div>
          <div className="mb-7">
            <label htmlFor="" className='mb-5'>Confirm Password</label>
            <input type="password" 
            {...register("confirmPassword")}
            placeholder="Confirm passwordss"
            className="w-full border px-4 py-2 h-10 rounded-md"/>
            {errors.confirmPassword && <p className='text-red'>{errors.confirmPassword.message}</p>}
          </div>

          <button type='button' className='w-full h-10 border rounded-md bg-primary-blue text-biege mb-3.5 font-bold align-center'
          onClick={handleSubmit(handleSignup)}>
            {loading? (
              <p className='flex justify-center items-center w-full'>Loading...</p>
            ): (
              "Create account"
            )}
            </button>
          <GoogleAuth />
        </form>
      </div>
      
    </div>
  )
}

export default SignupCard


