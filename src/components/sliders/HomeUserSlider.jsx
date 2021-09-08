import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import { default as SlickSlider } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from 'components';
import { useTranslation } from 'react-i18next';

import CardSlider from './CardSlider';
import AwesomeIcon from '../statics/icon';
import UserCard from './UserCard';

const HomeUserSlider = ({ className, data = [], handleSeeMoreClick }) => {
  const slider1 = useRef();
  const slider2 = useRef();
  const { t } = useTranslation();

  return (
    <>
      <div className={`slider-focus ${className}`}>
        <div className="slick-slider-buttons">
          <div
            className="slick-button next"
            onClick={() => {
              slider1.current.slickNext();
              slider2.current.next();
            }}
          >
            <AwesomeIcon.Next />
          </div>
        </div>
        <Container>
          <div className="row">
            <div className="col-xl-8 order-xl-2 right">
              <div className="item-right">
                <CardSlider data={data} ref={slider2} />
              </div>
            </div>
            <div className="col-xl-4 order-xl-1 left">
              <div className="slick-slider-buttons">
                <div
                  className="slick-button prev"
                  onClick={() => {
                    slider1.current.slickPrev();
                    slider2.current.previous();
                  }}
                >
                  <AwesomeIcon.Prev />
                </div>
              </div>

              <SlickSlider arrows={false} ref={slider1}>
                {data?.map((cardData) => (
                  <UserCard key={cardData.id} data={cardData} bottom />
                ))}
              </SlickSlider>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="row">
          <div
            style={{ marginTop: '-100px' }}
            className="col d-flex justify-content-center"
          >
            <Button
              lineButton
              onClick={() => handleSeeMoreClick()}
              text={t('See All')}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomeUserSlider;
