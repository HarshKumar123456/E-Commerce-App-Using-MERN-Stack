import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import About from '../pages/About';
import Contact from '../pages/Contact';
import Policy from '../pages/Policy';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import PageNotFound from '../pages/PageNotFound';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import PrivateRouteAccess from '../components/Routes/PrivateRouteAccess';
import Dashboard from '../pages/Dashboard';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<PrivateRouteAccess />}>
            <Route path='' element={<Dashboard />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
