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
              Başarmak için başla!
            </Title>
            <Title fontWeight="normal" variant="h4" component="h4" textLeft>
              {/* "" */}
            </Title>
            <Text color="blue" fontWeight="500" fontSize="20px">
              {/* "" */}
            </Text>
            <Text fontWeight="500" fontSize="20px" color="gray1">
              {/* "" */}
              <br />
              {/*<Button className="p-0" variant="link" text="İNCELE" />*/}
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
