import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <header className='relative'>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-blue to-transparent"></div>
      <img src="../images/landing.png" alt="" 
      className='h-full w-full object-cover'/>
      <div className="absolute inset-0 flex flex-col content-start text-white mt-36 ml-28">
        <h1 className='text-5xl leading-tight font-bold'>Welcome to Chatter: A Haven for Test- <br/>Based Content</h1>
        <p className='mt-7 text-lg text-biege'>Unleash the Power of words, Connent with Like-minded Readers</p>
        <p className='text-lg text-biege'>and Writers</p>
        <div className='mt-7 w-32 pl-6 pt-2 h-10 bg-coral-red rounded-md border-coral-blue'><button onClick={
         () =>navigate("/signup") 
        }>Get Started</button></div>
      </div>
      
    </header>
  )
}

export default Header
