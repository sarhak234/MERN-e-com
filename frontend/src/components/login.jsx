import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Loginadmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      setMessage('Login successful!');
      setEmail('');
      setPassword('');
      Cookies.set('token', response.data.token); // Set the token cookie
      navigate('/profile'); // Navigate to profile page
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center bg-slate-300 p-4'>
        <div className="text-center mb-5">
          <h1 className='text-4xl md:text-6xl font-extrabold text-blue-700 drop-shadow-lg'>
            KALCHAKRAS
          </h1>
          <h2 className='text-lg md:text-2xl font-semibold text-gray-700 mb-5'>
            A premium collection of watches
          </h2>
        </div>
        <form
          className='bg-black rounded-sm text-white flex flex-col items-center p-4 w-full max-w-sm md:max-w-md'
          onSubmit={handleSubmit}
        >
          <h3 className='text-2xl md:text-3xl mb-6'>Login</h3>
          <div className="flex flex-col items-center w-full mb-4" style={{ height: '200px' }}>
            <input
              type="email"
              placeholder='Enter admin email'
              className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder='Enter admin password'
              className='bg-transparent mb-4 mt-5 border-2 border-white text-center rounded-md p-2 w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          {message && <p className='text-green-500 text-center'>{message}</p>}
          <button type='submit' className='bg-white text-black w-full p-2 rounded-md'>
            Submit
          </button>
          <Link to='/signup' className='mt-4 text-blue-800'>
            Signup
          </Link>
        </form>
      </div>
    </>
  );
}

export default Loginadmin;
