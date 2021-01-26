// @ts-nocheck
import React, { useLayoutEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../style/main.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import env from '../../../env';

/**
 * @param {{ children: void; }} props
 */
const Master = props => {
    useLayoutEffect(() => {
        if ( env.token ) {
            console.log(env.token);
            return axios.defaults.headers.common['Authorization'] = env.token;
        }
    });
    return (
        <div id="pt-point-page">
            <Header />
            {props.children}
            <Footer />
            <ToastContainer autoClose={2000} />
        </div>
    )
};

export default Master;