import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';

import { default as SlickSlider } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//bunları şimdilik ekliyoruz
// @ts-ignore
import avatar from '../../assets/avatar/a1.png';

const Comments = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7500,
    pauseOnHover: false,
  };

  return (
    <section className={`comments ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3">
          Sizden Gelen Yorumlar
        </Title>
        <section className="comment-slider">
          <SlickSlider {...settings}>
            <div className="slider-item">
              <div className="avatar">
                <div className="img">
                  <img src={avatar} />
                </div>
              </div>
              <div className="text">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut
                Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris
                Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis...
              </div>
              <div className="foot">
                <b>Sena Ç.</b> <i>Üye</i>
              </div>
            </div>
            <div className="slider-item">
              <div className="avatar">
                <div className="img">
                  <img src={avatar} />
                </div>
              </div>
              <div className="text">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
                Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut
                Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris
                Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis...
              </div>
              <div className="foot">
                <b>Sena Ç.</b> <i>Üye</i>
              </div>
            </div>
          </SlickSlider>
        </section>
      </Container>
    </section>
  );
};

export default Comments;
