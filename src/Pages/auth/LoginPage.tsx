import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../../components/Login'


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='flex w-full h-full'>
      <div className=" h-screen w-2/4 bg-primary-blue text-biege flex flex-col justify-center items-center ">
        <h1 className='text-4xl font-bold mb-7'>Welcome Back!</h1>
        <p>To keep connected with us please </p>
        <p>login to your personal details</p>
        <button className='w-52 h-10 border rounded-lg mt-7 border-biege hover:bg-coral-red hover:border-coral-red'
        onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <div className="w-2/4">
        <Login />
      </div>
    </div>
  )
}


export default LoginPage
