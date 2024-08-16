import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';

function Cart() {
  const [cartData, setCartData] = useState([]);

  const apifetch = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post('http://localhost:3000/cart', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = response.data.cart;
      setCartData(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    apifetch();
  }, []);

  return (
    <>
      <Header />
      <div className='h-[100vh] w-[100vw] bg-gray-100 p-4 overflow-hidden'>
        {cartData.length > 0 ? (
          cartData.map((item) => (
            <div key={item._id} className='flex flex-col md:flex-row bg-white shadow-lg rounded-lg mb-4 p-4'>
              <img
                src={`data:image/jpeg;base64,${convertToBase64(item.prod_image.data)}`}
                alt={item.title}
                className='w-full md:w-32 h-32 object-cover rounded-md'
              />
              <div className='mt-4 md:mt-0 md:ml-4 flex-1'>
                <h4 className='text-xl font-bold'>{item.title}</h4>
                <p className='text-gray-700 mt-1'>{item.description.substring(0, 25) + '...'}</p>
                <p className='text-lg font-semibold mt-2'>Rs.{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500 text-lg'>Your cart is empty</p>
        )}
      </div>
      <Footer />
    </>
  );
}

const convertToBase64 = (buffer) => {
  try {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return '';
  }
};

export default Cart;
