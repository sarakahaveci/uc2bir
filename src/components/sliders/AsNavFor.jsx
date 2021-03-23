import React, { useLayoutEffect, useState } from 'react';
import Slider from "react-slick";

import img1 from "../../assets/as-nav-for/iStock-1176357828.jpg";
import img2 from "../../assets/as-nav-for/iStock-1215209609.jpg";
import img3 from "../../assets/as-nav-for/iStock-860080766.jpg";
import img4 from "../../assets/as-nav-for/iStock-872164142.jpg";

const AsNavFor = ({ className = "" }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    let slider1;
    let slider2;

    useLayoutEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, []);

    return (
        <div className={`as-nav-for ${className}`}>
            <div className="item img col">
                <Slider
                    asNavFor={nav2}
                    ref={slider => (slider1 = slider)}
                >
                    <div className="slider-item">
                        <div className="img" style={{ backgroundImage: `url(${img1})` }}></div>
                    </div>
                    <div className="slider-item">
                        <div className="img" style={{ backgroundImage: `url(${img2})` }}></div>
                    </div>
                    <div className="slider-item">
                        <div className="img" style={{ backgroundImage: `url(${img3})` }}></div>
                    </div>
                    <div className="slider-item">
                        <div className="img" style={{ backgroundImage: `url(${img4})` }}></div>
                    </div>
                </Slider>
            </div>
            <div className="item thump col-auto">
                <Slider
                    asNavFor={nav1}
                    ref={slider => (slider2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    autoplay={true}
                    autoplaySpeed={7500}
                    speed={2000}
                >
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${img1})` }}></div>
                    </div>
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${img2})` }}></div>
                    </div>
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${img3})` }}></div>
                    </div>
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${img4})` }}></div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default AsNavFor;