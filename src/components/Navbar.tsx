/* eslint-disable @typescript-eslint/no-unused-vars */
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';
import { auth } from '../firebase/firebaseConfig';

const Navbar: React.FC = () => {

  const [isNavbarFixed, setIsNavbarFixed] = useState(false) 
  const location = useLocation()
  const navigate = useNavigate()
  const {user} = useAuth();

  // Define an array of paths where navbar should not be displayed
  const pagesWithoutNavbar = ["/login", "/signup"]

  // Check if the current path is in the array
  const shouldHideNavbar = pagesWithoutNavbar.includes(location.pathname)

 const handleLogout = () =>{
     signOut(auth);
     navigate("/")
 }


 const handleScroll = () =>{
    if(window.pageYOffset > 0){
      setIsNavbarFixed(true)
    }
    else{
      setIsNavbarFixed(false)
    }
 }

 useEffect(()=>{
  window.addEventListener('scroll', handleScroll);
  return () =>{
    window.removeEventListener('scroll', handleScroll)
  }
 }, [])


  return  (
    <div>
      {!shouldHideNavbar &&
      <nav className={`w-full h-12 bg-primary-blue text-biege flex py-10 px-20 items-center justify-between ${
        isNavbarFixed ? 'fixed top-0 z-10' : ''
      }`}>
        <h1 className='text-lg font-bold '>CHATTER</h1>
        <ul className='flex space-x-7 cursor-pointer items-center'>
          {!user && (
              <li className="bg-coral-red w-15 h-10 px-5 py-2 rounded-md">
                <button onClick={() => navigate("/signup")} type="button">
                  Sign Up
                </button>
              </li>
            )}
         
          {user?  (
            <>
               <li><NavLink to="/feeds" className="font-bold">Feeds</NavLink></li>
              <li><NavLink to="/new" className="font-bold">Create-Post</NavLink></li>
              <li>
                <button mt-2>
                  <img src={
                    user.photoURL
                      ? user.photoURL
                      : 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
                  }
                    alt="avatar"
                    className="w-10 aspect-square rounded-full object-cover"
                    width={45}
                    height={45}
                   />
                </button>
              </li>
              <li>
                <button className='bg-coral-red w-15 h-10 px-5 py-2 rounded-md'
                  onClick={handleLogout}>
                  Sign Out
                </button>
              </li>
            </>
          ):null}
        </ul>
      </nav>
}
    </div>
  ) 
}

export default Navbar
