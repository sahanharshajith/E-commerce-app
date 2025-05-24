import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {

    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

      if (response.data.success) {
        //localStorage.setItem('admin-token', response.data.token);
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
