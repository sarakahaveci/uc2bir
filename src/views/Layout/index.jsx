import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/main.scss';

import Header from './Header';
import Footer from './Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'

const Layout = (props) => {
  const location = useLocation();
  if (location.pathname === "/myprofile/online") {
    return (
      <>
        {props.children}
      </>
    )
  } else {
    return (
      <div id="pt-point-page">
        <Header />
        {props.children}
        <Footer />
        <ToastContainer autoClose={2000} />
      </div>
    )
  }
};

export default Layout;
