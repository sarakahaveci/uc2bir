// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';

import { default as SlickSlider } from "react-slick";

import loading from '../../../images/2.gif';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({ className = "", settings, searchBar, virtual, setVirtual, virtuals }) => {
    return (
        <section className={`banner-virtual ${className}`}>
            <div className="virtual-banner">
                <div className="loading"><img src={loading}/></div>
                <div className={`slider-item ${virtuals[virtual].className}`}>
                    {virtuals[virtual].component && virtuals[virtual].component()}
                </div>
            </div>
            {searchBar.status && searchBar.element()}
        </section>
    );
}

export default Banner;