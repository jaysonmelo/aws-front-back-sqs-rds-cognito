import { Component } from 'react'
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import userpool from './userpool';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from './home'
import Login from './login'
import Dashboard from './dashboard'
import ProductsList from './components/ProductsList'
import AddProducts from './components/AddProducts';
import UpdateProduct from './components/UpdateProduct';
import MyOrders from './components/MyOrders'
import Logout from './logout';

function App() {

  
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState('');

    let logado = false;
    if (localStorage.getItem('username') !== null) {
      logado = true;
    }

    useEffect(() => {
      let user=userpool.getCurrentUser();
      if(user){
        <Navigate to="/dashboard" replace />
      }
      setUser(user);

  
      // If the token/email does not exist, mark the user as logged out
      if (!user || !user.token) {
        setLoggedIn(false)
        return
      } else {
        setLoggedIn(true)
        return
      }
      

    }, []);

    return (
      <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              ANN-Traders
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/productsList"} className="nav-link">
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"product/add"} className="nav-link">
                  Add Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/myOrders"} className="nav-link">
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to={ !logado ? "/login" : ""} className="nav-link">
                { !logado ? "Login" : ""}
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>}  />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/productsList" element={<ProductsList/>} />
            <Route path="/product/add" element={<AddProducts/>} />
            <Route path="/product/:id" element={<UpdateProduct/>} />
            <Route path="/myOrders" element={<MyOrders/>} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>
    );
  }

export default App