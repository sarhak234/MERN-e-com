// src/main.jsx or src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Ensure this import is here
import Root from './root';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
