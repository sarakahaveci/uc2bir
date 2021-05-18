import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/main.scss';

import Header from './Header';
import Footer from './Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const Layout = (props) => {
  const location = useLocation();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  if (
    location.pathname === '/myprofile/online' ||
    location.pathname === '/mobile/buy/success' ||
    location.pathname === '/mobile/buy/fail'
  ) {
    return <>{props.children}</>;
  } else {

    return (
      <div id="pt-point-page">
        <Header isSearchBarOpen={isSearchBarOpen} setIsSearchBarOpen={setIsSearchBarOpen} />
        <div onClick={() => { if (isSearchBarOpen) { setIsSearchBarOpen(false) } }}>
          {props.children}
        </div>
        <Footer />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
};

export default Layout;
