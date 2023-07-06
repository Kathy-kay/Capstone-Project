import React from 'react'
import { ILogin } from '../constant/types'
import { loginDefaultValue, loginResolver } from '../constant/validtion'
import {useForm} from "react-hook-form"
import GoogleAuth from './GoogleAuth'

const Login: React.FC = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<ILogin>({
    defaultValues: loginDefaultValue,
    resolver: loginResolver
  })
  return (
    <div className='bg-biege flex  pt-7 w-full h-full'>
      <div className=" px-16 text-primary-blue">
        <h2 className="text-2xl  font-bold mb-4 text-center">Welcome to Chatter</h2>
        <form className='px-8 py-7 w-full h-full' >
          <div className="mb-7 w-full">
              <label className='mb-4'>Email</label>
              <input type="text"
              placeholder='example@gmail.com' 
              {...register("email")}
              className="w-full border px-4 py-2 h-10 rounded-md"/>
              {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="mb-7">
              <label htmlFor="" className='mb-4'>Password</label>
              <input type="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full border px-4 py-2 h-10 rounded-md"/>
              {errors.password && <p>{errors.password.message}</p>}
          </div>
          <GoogleAuth />
        </form>
      </div>
      
    </div>
  )
}

export default Login
