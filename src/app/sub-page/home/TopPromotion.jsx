import React from 'react';
import { Container } from 'react-bootstrap';
import Button from '../../../components/buttons/button';
import AsNavFor from '../../../components/sliders/AsNavFor';
import Text from '../../../components/typography/Text';
import Title from '../../../components/typography/title';
import DefBackground from '../../../statics/background';

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
          <div className="col-lg-6">
            <Title variant="h3" component="h3" lineDisable textLeft>
              ..VE YENİ BİR SEN
            </Title>
            <Title fontWeight="normal" variant="h4" component="h4" textLeft>
              Salon VE/Veya Eğitmen Video Alanı
            </Title>
            <Text color="blue" fontWeight="500" fontSize="20px">
              Your body hears everything that your mind says. You have to have a
              positive attitude if you want to achieve your goals.
            </Text>
            <Text fontWeight="500" fontSize="20px" color="gray1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo cons ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliqui….
              <br />
              <Button className="p-0" variant="link" text="İNCELE" />
            </Text>
          </div>
          <div className=".slider-p0 col-lg-6 d-flex">
            <AsNavFor />
          </div>
        </div>
        {props.children}
      </Container>
    </section>
  );
};

export default TopPromotion;
