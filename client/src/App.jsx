import React,{ useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from "../pages/Home";
import About from '../pages/About';
import Contact from '../pages/Contact';
import Policy from '../pages/Policy';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import PageNotFound from '../pages/PageNotFound';
import Register from '../pages/Register';

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/policy' element={ <Policy /> } />
        <Route path='/privacy-policy' element={ <PrivacyPolicy /> } />
        <Route path='*' element={ <PageNotFound /> } />
      </Routes>
    </>
  );
}

export default App;
