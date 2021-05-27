import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import Svg from 'components/statics/svg';
import styled from 'styled-components';
import { default as SlickSlider } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getSystemComments } from 'actions/systemCommentsActions';

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
  const data = useSelector((state) => state?.systemComments?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSystemComments());
  }, []);

  return (
    <section className={`comments ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3" lineDisable={false} fontWeight={500}>
          Sizden Gelen Yorumlar
        </Title>
        <SlickSlider {...settings}>
          {data.map((item, index) => {
            return (
              <section className="comment-slider" key={index}>
                <div className="slider-item">
                  <div className="avatar">
                    <div className="img">
                      <img src={item.path} />
                    </div>
                  </div>
                  <QuoteWrapper>
                    <Svg.Ql className="left-quote-icon" />
                    <div className="text">{item.comment}</div>

                    <Svg.Qr className="right-quote-icon" />
                  </QuoteWrapper>
                  <div className="foot">
                    <b>{item.name}</b>
                  </div>
                </div>
              </section>
            );
          })}
        </SlickSlider>
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
