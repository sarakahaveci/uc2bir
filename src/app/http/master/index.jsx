// @ts-nocheck
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../style/main.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { ToastContainer } from 'react-toastify';

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
            <ToastContainer
                toastClassName={({ type }) => toastContextClass[type || "default"] +
                    " flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                }
                bodyClassName={() => "text-sm font-white font-med block p-3"}
                position="bottom-left"
                autoClose={3000} />
        </>
    )
};

export default Master;