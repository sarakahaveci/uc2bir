// @ts-nocheck
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../style/main.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * @param {{ children: void; }} props
 */
const Master = props => {
    return (
        <>
            {props.children}
        </>
    )
};

export default Master;