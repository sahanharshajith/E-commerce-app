import React, { useState } from 'react'

const Login = () => {

  const [currentState, setcurrentState] = useState('Sign Up');

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <form onClick={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input type="text" placeholder='Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>}
      <input type="email" placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
      <input type="password" placeholder='Password' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p onClick={()=>setcurrentState('Sign Up')} className='cursor-pointer' >Create account</p>
          : <p onClick={()=>setcurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white px-16 py-3 my-8 mt-6 text-sm active:bg-gray-700 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login