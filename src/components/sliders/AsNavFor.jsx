import React, { useLayoutEffect, useState } from 'react';
import Slider from "react-slick";

//bunları şimdilik ekliyoruz.
// @ts-ignore
import womanThumpImg from "../../images/as-nav-for/thump-woman.png";
// @ts-ignore
import womanImg from "../../images/as-nav-for/woman.png";
// @ts-ignore
import womansThumpImg from "../../images/as-nav-for/thump-womans.png";
// @ts-ignore
import womansImg from "../../images/as-nav-for/womans.png";

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
                        <div className="img" style={{ backgroundImage: `url(${womanImg})` }}></div>
                    </div>
                    <div className="slider-item">
                        <div className="img" style={{ backgroundImage: `url(${womansImg})` }}></div>
                    </div>
                    <div className="slider-item">
                        <div className="img" style={{ backgroundImage: `url(${womanImg})` }}></div>
                    </div>
                    <div className="slider-item">
                        <div className="img" style={{ backgroundImage: `url(${womansImg})` }}></div>
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
                >
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${womanThumpImg})` }}></div>
                    </div>
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${womansThumpImg})` }}></div>
                    </div>
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${womanThumpImg})` }}></div>
                    </div>
                    <div className="slider-item-thump">
                        <div className="img" style={{ backgroundImage: `url(${womansThumpImg})` }}></div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default AsNavFor;