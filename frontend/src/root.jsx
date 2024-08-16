import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import Profile from './components/profile';
import Badmin from './components/becomeadmin';
import Loginadmin from './components/loginadmin';
import Cart from './components/cart'; 
import ProfileAdmin from './components/profile_for_admin';
import AboutProfile from './components/aboutprofile';
import Loader from './components/loader';
import SearchOutput from './components/searchoutput';

function App() {
  return (
    <Router>
      <Routes >
        <Route path='/searchprod' element={<SearchOutput/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/loader' element={<Loader/>}/>
        <Route path="/becomeAdmin" element={<Badmin />} />
        <Route path="/loginadmin" element={<Loginadmin />} />
        <Route path="/aboutprofile" element={<AboutProfile/>} />
        <Route path="/adminprofile" element={<ProfileAdmin/>} /> 

      </Routes>
    </Router>
  );
}

export default App;
