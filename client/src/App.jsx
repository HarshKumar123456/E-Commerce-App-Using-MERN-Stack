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
import Dashboard from '../pages/users/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import AdminRouteAccess from '../components/Routes/AdminRouteAccess';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Categories from '../pages/Admin/Category/Categories';
import Products from '../pages/Admin/Product/Products';
import CreateProduct from '../pages/Admin/Product/CreateProduct';
import UpdateDeleteProduct from '../pages/Admin/Product/UpdateDeleteProduct';
import DetailsOfProduct from '../pages/DetailsOfProduct';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detailsOfProduct/:productSlug' element={<DetailsOfProduct />} />
        <Route path='/dashboard' element={<PrivateRouteAccess />}>
            <Route path='user' element={<Dashboard />} />
        </Route>
        <Route path='/dashboard' element={<AdminRouteAccess />}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/categories' element={<Categories />} />
            <Route path='admin/products' element={<Products />} />
            <Route path='admin/create-product' element={<CreateProduct />} /> 
            <Route path='admin/updateDeleteProduct/:productSlug' element={<UpdateDeleteProduct />} /> 
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
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
