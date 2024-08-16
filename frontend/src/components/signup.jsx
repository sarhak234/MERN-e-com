import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Signup() {
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setMessage(''); // Clear previous message

    // Check if passwords match
    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        username,
        lastname, // Ensure lastname is sent correctly
        email,
        password,
      });

      console.log('Signup successful:', response.data.message);
      setMessage(response.data.message || 'Signup successful!');
      Cookies.set('token', response.data.token); // Set token with expiry (example)
      
      // Handle successful signup (e.g., redirect to profile page)
      navigate('/profile'); // Redirect to the profile page
    } catch (error) {
      console.error('Signup error:', error.response.data.message);
      setError(error.response.data.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
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
        <h3 className='text-2xl md:text-3xl mb-6'>Signup</h3>
        <input
          type="text"
          placeholder='Enter your username'
          className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
          value={username}
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder='Enter your lastname'
          className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
          value={lastname}
          name='lastname'
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder='Enter your email address'
          className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Enter your password'
          className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Re-enter your password'
          className='bg-transparent mb-4 border-2 border-white text-center rounded-md p-2 w-full'
          value={rePassword}
          name='rePassword'
          onChange={(e) => setRePassword(e.target.value)}
          required
        />
        {error && <p className='mb-3 text-red-500'>{error}</p>}
        {message && <p className='mb-3 text-green-500'>{message}</p>}
        <button type='submit' className='bg-white text-black w-full p-2 rounded-md'>
          Submit
        </button>
        <div className='mt-5'>
          <Link to="/" className='text-blue-500'>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
