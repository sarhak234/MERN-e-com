import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/3 mb-6">
            <h2 className="text-2xl font-bold mb-2">Kalchakra</h2>
            <p className="text-gray-400">A premium collection of watches</p>
          </div>
          <div className="w-full sm:w-1/3 mb-6">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul>
              <li className="mb-1">
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li className="mb-1">
                <Link to="/profile" className="hover:underline">Profile</Link>
              </li>
              <li className="mb-1">
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 mb-6">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400">
          &copy; 2024 Kalchakra. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
