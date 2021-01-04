import React from 'react';

import { default as SlickSlider } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//bunları şimdilik ekliyoruz
// @ts-ignore
import s1 from "../../images/banner/slider-item-1.png";

function Banner({ className = "", settings, searchBar }) {
    return (
        <section className={`banner ${className}`}>
            <SlickSlider {...settings}>
                <div className="slider-item" >
                    <div className="img" style={{ backgroundImage: `url(${s1})` }}></div>
                </div>
                <div className="slider-item">
                    <div className="img" style={{ backgroundImage: `url(${s1})` }}></div>
                </div>
            </SlickSlider>
            {searchBar.status && searchBar.element()}
        </section>
    );
}

export default Banner;