import React from 'react';
import { Container } from 'react-bootstrap';
import { Title, DefBackground } from '../../components';
import AsNavFor from '../../components/sliders/AsNavFor';

const TopPromotion = (props) => {
  return (
    <section className={`top-promotion ${props.className}`}>
      {props.background && (
        <div
          className="backgorund-element"
          style={{ backgroundImage: `url(${DefBackground.elementBackground})` }}
        ></div>
      )}
      <Container>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <Title
              variant="h3"
              component="h3"
              lineDisable={false}
              textLeft
              fontWeight="600"
            >
              başarmak İçİn başla!
            </Title>
          </div>
          <div className="slider-p0 col-lg-6 d-flex">
            <AsNavFor />
          </div>
        </div>
        {props.children}
      </Container>
    </section>
  );
};

export default TopPromotion;
