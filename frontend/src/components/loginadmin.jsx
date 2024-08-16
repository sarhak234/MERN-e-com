import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie'; // Import Cookies

function Loginadmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/admin/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      setMessage('Login successful!');
      setEmail('');
      setPassword('');

      // Set the token cookie
      Cookies.set('admin-token', response.data.token, { expires: 7 }); // Cookie expires in 7 days

      // Navigate to admin profile page
      navigate('/adminprofile');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <Header />
      <div className='min-h-screen flex flex-col justify-center items-center bg-slate-300 p-4'>
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
          <h3 className='text-2xl md:text-3xl mb-6'>Admin Login</h3>
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
            className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className='text-red-500 text-center'>{error}</p>}
          {message && <p className='text-green-500 text-center'>{message}</p>}
          <button type='submit' className='bg-white text-black w-full p-2 rounded-md'>
            Submit
          </button>
          <Link to='/becomeAdmin' className='mt-4 text-blue-800'>
            Signup
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Loginadmin;
