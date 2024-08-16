import React, { useState } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

function ProfileForAdmin() {
  const [product, setProduct] = useState({
    image: null,
    title: '',
    description: '',
    price: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.image);

    try {
      const response = await axios.post('http://localhost:3000/admin/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || 'Product uploaded successfully!');
      setProduct({
        image: null,
        title: '',
        description: '',
        price: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error uploading product. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                Product Image:
              </label>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleChange} 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Product Title:
              </label>
              <input 
                type="text" 
                name="title" 
                value={product.title} 
                onChange={handleChange} 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Product Description:
              </label>
              <textarea 
                name="description" 
                value={product.description} 
                onChange={handleChange} 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                Product Price:
              </label>
              <input 
                type="number" 
                name="price" 
                value={product.price} 
                onChange={handleChange} 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center mb-5">{error}</p>}
            {message && <p className="text-green-500 text-center mb-5">{message}</p>}
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileForAdmin;
