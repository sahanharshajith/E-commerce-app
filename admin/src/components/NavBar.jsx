import React from 'react'
import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={logo} alt="" />
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xm sm:text-sm'>LogOut</button>
    </div>
  )
}

export default NavBar