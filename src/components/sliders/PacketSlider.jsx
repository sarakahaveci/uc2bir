/* eslint-disable no-unused-vars */

import React from 'react';
import { Container } from 'react-bootstrap';

import { default as SlickSlider } from 'react-slick';

import 'slick-carousel/slick/slick.css';

import AwesomeIcon from '../statics/icon';
import { Button } from 'components';

import Groups from './packets-items';

function PacketSlider(props) {
  const { data, query, categories, handleSeeMoreClick } = props;
  let slider;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 7500,
    speed: 100,
    pauseOnHover: false,

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`packet-slider ${props.className}`}>
      <Container>
        <div className="slick-slider-buttons">
          <a className="slick-button next" onClick={() => slider.slickNext()}>
            <AwesomeIcon.Next />
          </a>
          <a className="slick-button prev" onClick={() => slider.slickPrev()}>
            <AwesomeIcon.Prev />
          </a>
        </div>
        <div className="packet-category">
          <ul>
            {categories &&
              categories.length > 0 &&
              categories.map((val) => (
                <li className={val.activeClass} key={`category-${val.id}`}>
                  <a href={val.link}>{val.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </Container>
      <Container fluid>
        <div className="sliders">
          <SlickSlider ref={(c) => (slider = c)} {...settings}>
            {query &&
              data.map((val, key) => Groups[props.groups]({ key, val }))}
          </SlickSlider>
        </div>
      </Container>
      <Container>
        <div className="row">
          <div
            style={{ marginTop: '45px' }}
            className="col d-flex justify-content-center"
          >
            <Button
              lineButton
              onClick={() => handleSeeMoreClick()}
              text="Tümünü Gör"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PacketSlider;
