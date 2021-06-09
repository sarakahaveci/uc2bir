import React, { useLayoutEffect, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';



export default function AsNavFor({ onChangeSlideHandler,className, sliderItems = [] }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1;
  let slider2;

  useLayoutEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  return (
    <div className={cx('as-nav-for', { [`${className}`]: className })}>
      <Slider
        className="as-nav-for__main"
        asNavFor={nav2}
        arrows={false}
        ref={(slider) => (slider1 = slider)}
        afterChange={onChangeSlideHandler}
      >
        {sliderItems?.length && sliderItems?.map((item, i) => (
          <div key={i} className="as-nav-for__main__item">
            <img src={item?.src} alt={`slider-img-${i}`} />
          </div>
        ))}
      </Slider>
      <Slider
        className="as-nav-for__thump"
        asNavFor={nav1}
        ref={(slider) => (slider2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        autoplay={true}
        autoplaySpeed={7500}
        speed={2000}
        arrows={false}
      >
        {sliderItems?.length && sliderItems?.map((item, i) => (
          <div key={i} className="as-nav-for__thump__item">
            <img src={item?.src} alt={`slider-img-${i}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
