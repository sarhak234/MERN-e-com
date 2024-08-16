import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header'
import Footer from './footer'


function AboutProfile() {
  const [data,setData]=useState('')
  const apifetch = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const response = await axios.post('http://localhost:3000/aboutprofile', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }});
      setData(response.data)

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('An error occurred:', error); // Handle the error as needed
    }
  }

  useEffect(() => {
    apifetch();
  }, []);

  return (
    <>
      <Header />
      <div className='container mx-auto p-6'>
        <h1 className='text-5xl flex justify-center my-8'>Profile</h1>
        <div className='flex justify-center'>
          <div className='w-full md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg p-6'>
            <div className='flex items-center'>
              
              <ul className='text-xl mt-5 mb-5 space-y-3'>
                <li>
                  <span className='font-bold'>Name:</span> {data}
                </li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutProfile;
