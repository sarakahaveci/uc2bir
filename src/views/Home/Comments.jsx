import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import Svg from 'components/statics/svg';
import styled from 'styled-components';
import { default as SlickSlider } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getSystemComments } from 'actions/systemCommentsActions';

//bunları şimdilik ekliyoruz
// @ts-ignore

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSystemComments);
  }, []);

  return (
    <section className={`comments ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3" lineDisable={false} fontWeight={500}>
          Sizden Gelen Yorumlar
        </Title>
        <section className="comment-slider">
          <SlickSlider {...settings}>
            <div className="slider-item">
              <div className="avatar">
                <div className="img">
                  <img />
                </div>
              </div>
              <QuoteWrapper>
                <Svg.Ql className="left-quote-icon" />
                <div className="text">
                  Çok nezih, çok kaliteli bir platform olmanın yanı sıra hem
                  işleyişi hem donanımlı eğitmen kadrosuyla hem de güler yüzlü
                  çalışanlarıyla harika bir deneyim. Gerek aldığım diyetisyen
                  tavsiyeleri gerekse personal trainer eğitimlerinden çok memnun
                  kaldım, herkese gözüm kapalı önerebileceğim bi yer!
                </div>
                <Svg.Qr className="right-quote-icon" />
              </QuoteWrapper>
              <div className="foot">
                <b>Beren Ç.</b> <i>Üye</i>
              </div>
            </div>
          </SlickSlider>
        </section>
      </Container>
    </section>
  );
};

export default Comments;

const QuoteWrapper = styled.div`
  position: relative;

  .left-quote-icon {
    position: absolute;
    left: 5px;
    top: -50px;
    //TODO

    svg {
      @media (max-width: 992px) {
        width: 40px;
      }
    }
  }
  .right-quote-icon {
    position: absolute;
    right: 5px;
    bottom: -50px;
    //TODO
    svg {
      @media (max-width: 992px) {
        width: 40px;
      }
    }
  }
`;
