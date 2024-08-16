import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const res = await axios.post('http://localhost:3000/products');
      const result = res.data;
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (Array.isArray(data)) {
      const product = data.find(item => 
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (product) {
        navigate('/searchprod', { state: { product } });
      } else {
        console.log('Product not found');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative ml-2 md:ml-10 flex flex-col md:flex-row items-center md:items-stretch">
      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search for products"
        className="border-2 border-black outline-none h-9 rounded-md w-[60vw] md:w-[40vw] pl-2 mb-2 md:mb-0"
      />
      
      <button 
        className="bg-black rounded-md w-full md:w-20 text-white h-9 md:ml-2 "
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
