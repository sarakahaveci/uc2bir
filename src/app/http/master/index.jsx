// @ts-nocheck
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../style/main.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

/**
 * @param {{ children: void; }} props
 */
const Master = props => {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
};

export default Master;