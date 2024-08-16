import React, { useState } from 'react';
import Header from './header';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Footer from './footer';

function BecomeAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/admin", {
        email,
        password,
        brandname: brandName
      });
      console.log('Admin created:', response.data);
      setMessage('Admin created successfully!');
      setEmail('');
      setPassword('');
      setRePassword('');
      setBrandName('');
      Cookies.set('admin-token',response.data.token)
      
    } catch (error) {
      console.error('Error creating admin:', error);
      setError(error.response?.data?.error || 'An error occurred while creating admin');
    }
  }

  return (
    <div>
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
          <h3 className='text-2xl md:text-3xl mb-6'>Become Admin</h3>
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
          <input
            type="password"
            placeholder='Re-enter admin password'
            className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder='Enter name of your brand'
            className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          {error && <p className='text-red-500 text-center'>{error}</p>}
          {message && <p className='text-green-500 text-center'>{message}</p>}
          <button type='submit' className='bg-white text-black w-full p-2 rounded-md'>
            Submit
          </button>
          <Link to='/loginadmin' className='mt-4 text-blue-500'>
            Login
          </Link>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default BecomeAdmin;
