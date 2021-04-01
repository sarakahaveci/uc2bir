import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/main.scss';

import Header from './Header';
import Footer from './Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <div id="pt-point-page">
      <Header />
      {props.children}
      <Footer />
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Layout;
