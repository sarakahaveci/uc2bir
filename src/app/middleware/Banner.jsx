// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';

import { default as SlickSlider } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//bunları şimdilik ekliyoruz
// @ts-ignore
import s1 from "../../images/banner/download.jpg";
import GoogleApp from '../../components/google-maps';

const Banner = ({ className = "", settings, searchBar }) => {
    const [height, setHeight] = useState("768px");
    const [windowSize, setWindowSize] = useState(false);

    useLayoutEffect(() => {
        window.addEventListener('resize', () => setWindowSize(window.innerWidth));
        if ( windowSize < 1200 ) {
            setHeight("65vh");
        }
    }, [windowSize]);

    return (
        <section className={`banner ${className}`}>
            <SlickSlider {...settings}>
                <div className="slider-item" >
                    <div className="img" style={{ backgroundImage: `url(${s1})` }}></div>
                </div>
                <div className="slider-item have-map">
                    <div className="img">
                        {<GoogleApp frame={{width: "100%", height}}/>}
                    </div>
                </div>
            </SlickSlider>
            {searchBar.status && searchBar.element()}
        </section>
    );
}

export default Banner;