import React, { useLayoutEffect, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import styled from 'styled-components/macro';


export default function AsNavFor({ onChangeSlideHandler, className, sliderItems = [] }) {
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
            {item?.file?.type == 'image' && <img src={item?.file?.path} alt={`slider-img-${i}`} />
            }
            {item?.file?.type == 'video' && 
                <Video
                controls="controls"
                class="video-stream"
                x-webkit-airplay="allow"
                data-youtube-id="N9oxmRT2YWw"
                src={item?.file?.path}
              ></Video>
            }
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
            {
              item?.file?.type == 'image' && <img src={item?.file?.path} alt={`slider-img-${i}`} />
            }
            {
              item?.file?.type == 'video' && <Video src={item?.file?.path} />
            }
          </div>
        ))}
      </Slider>
    </div>
  );
}
const Video = styled.video`
  display:flex;
  width: 100%;
  height:100%;
  z-index:99;

`;
