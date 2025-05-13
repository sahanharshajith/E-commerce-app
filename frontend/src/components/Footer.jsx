import React from 'react'
import { assets } from '../assets/assets' 
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="px-4">
      <div className='grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <Link to='/'><img src={assets.logo} alt="Logo" className='w-32 mb-5' /></Link>
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul> 
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-000-000-0000</li>
            <li>greatstackdev@gmail.com</li>
            <li>Instagram</li>
          </ul> 
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center w-full mt-10">
        <hr className="w-full border-gray-300" />
        <p className="py-5 text-sm text-gray-800">
          © 2025 <span className="font-semibold">forver.com</span> – All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
