// @ts-nocheck
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../style/main.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

/**
 * @param {{ children: void; }} props
 */
const Master = props => {
    const toastContextClass = {
        success: "bg-blue-600",
        error: "bg-red-600",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    return (
        <>
            <Header />
            {props.children}
            <Footer />
            <ToastContainer autoClose={2000} />
        </>
    )
};

export default Master;