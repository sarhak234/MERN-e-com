import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoader(true);
    navigate('/loader'); // Navigate to loading page
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating a delay
    localStorage.removeItem('token');
    setLoader(false);
    navigate('/'); // Navigate to home page after logging out
  };

  return (
    <button onClick={handleLogout} className="ml-16 bg-black w-16 rounded-md text-white">
      Logout
    </button>
  );
}

export default Logout;
