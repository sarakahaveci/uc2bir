/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { default as SlickSlider } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AwesomeIcon from '../statics/icon';

const SliderFocus = ({ className, data = [], userType }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1;
  let slider2;

  useLayoutEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  return (
    <>
      <div className={`slider-focus ${className}`}>
        <div className="slick-slider-buttons">
          <a className="slick-button next" onClick={() => slider1.slickNext()}>
            <AwesomeIcon.Next />
          </a>
        </div>
        <Container>
          <div className="row">
            <div className="col-xl-8 order-xl-2 right">
              <div className="item-right">
                <SlickSlider
                  asNavFor={nav1}
                  ref={(slider) => (slider2 = slider)}
                  slidesToShow={3}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  autoplay={false}
                  autoplaySpeed={7500}
                  speed={2000}
                >
                  {data.map((val, key) =>
                    Groups[userType]({ key, val, top: true })
                  )}
                </SlickSlider>
              </div>
            </div>
            <div className="col-xl-4 order-xl-1 left">
              <div className="slick-slider-buttons">
                <a
                  className="slick-button prev"
                  onClick={() => slider1.slickPrev()}
                >
                  <AwesomeIcon.Prev />
                </a>
              </div>
              <SlickSlider
                asNavFor={nav2}
                arrows={false}
                ref={(slider) => (slider1 = slider)}
              >
                {data.map((val, key) =>
                  Groups[groups]({ key, val, bottom: true })
                )}
              </SlickSlider>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="row">
          <div
            style={{ marginTop: '-45px' }}
            className="col d-flex justify-content-center"
          >
            {/*   <Button
              lineButton
              onClick={() => history.push(props.link)}
              text="Tümünü Gör"
            /> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default SliderFocus;
