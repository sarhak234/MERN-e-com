import React from 'react';
import Header from './header'
import Profile  from './profile'
import Footer from './footer'
import { Outlet } from 'react-router-dom';
function design() {
  return (
    <>
    <Header />
    <Outlet/>
    <Footer/>
    </>
  );
}

export default design;
