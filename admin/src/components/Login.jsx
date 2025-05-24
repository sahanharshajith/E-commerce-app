import React from 'react';

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const OnsubmitHandler = async (e) => {
        try{
            e.preventDefault();
        }catch (error){

        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-white'>
        <div className='bg-gray-200 shadow-md rounded-lg px-8 py-6 max-w-md w-full'>
            <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Admin Panel</h1>
            <form onSubmit={OnsubmitHandler} className='space-y-4'>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id="email"
                        className='rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        type='email' 
                        placeholder='your@email.com' 
                        required 
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        className='rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        type='password' 
                        placeholder='Enter your password' 
                        required 
                    />
                </div>
                <button 
                    type='submit' 
                    className='w-full bg-black text-white font-medium py-2 px-4 rounded-md transition duration-200 cursor-pointer'
                >
                    Login
                </button>
            </form>
        </div>
    </div>
  );
};

export default Login;