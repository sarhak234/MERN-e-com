import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './searchbar';
import Logout from './logout';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="shadow-md bg-white">
      <div className="h-[70px] flex items-center justify-between px-4 w-full overflow-hidden">
        <div className="flex-1 flex justify-center md:justify-start">
          <SearchBar />
        </div>
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-gray-500 ${isActive ? 'text-black font-bold' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/aboutprofile"
            className={({ isActive }) =>
              `text-gray-500 ${isActive ? 'text-black font-bold' : ''}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/becomeAdmin"
            className={({ isActive }) => (isActive ? 'text-black font-bold' : 'text-gray-500')}
          >
            Become Admin
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'text-black font-bold' : 'text-gray-500')}
          >
            Cart
          </NavLink>
          <Logout />
        </div>
        <button
          className="md:hidden text-gray-600 ml-4 p-2 focus:outline-none w-5 h-5"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6H20M4 12H20M4 18H11V16H4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {showMenu && (
        <div className="md:hidden absolute top-[70px] right-4 bg-white shadow-md rounded-md flex flex-col items-start p-4 w-48 z-50">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block py-2 px-4 ${isActive ? 'text-black font-bold' : 'text-gray-500'}`
            }
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/aboutprofile"
            className={({ isActive }) =>
              `block py-2 px-4 ${isActive ? 'text-black font-bold' : 'text-gray-500'}`
            }
            onClick={() => setShowMenu(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/becomeAdmin"
            className={({ isActive }) =>
              `block py-2 px-4 ${isActive ? 'text-black font-bold' : 'text-gray-500'}`
            }
            onClick={() => setShowMenu(false)}
          >
            Become Admin
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `block py-2 px-4 ${isActive ? 'text-black font-bold' : 'text-gray-500'}`
            }
            onClick={() => setShowMenu(false)}
          >
            Cart
          </NavLink>
          <Logout />
        </div>
      )}
    </div>
  );
}

export default Header;
