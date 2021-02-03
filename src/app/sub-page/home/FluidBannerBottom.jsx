import React from 'react';
// @ts-ignore
import { default as NativeFluidBanner } from '../../../components/banner/fluid-banner';
import Title from '../../../components/typography/title';
import Text from '../../../components/typography/text';

// @ts-ignore
import backgroundImage from '../../../statics/background/images/banner-bottom.jpg';
import { Container } from 'react-bootstrap';
import Button from '../../../components/buttons/button';

const FluidBanner = (props) => {
  return (
    <NativeFluidBanner
      className={props.className}
      backgroundImage={backgroundImage}
    >
      <Container>
        <Text style={{ paddingBottom: '60px' }} textAlign="center">
          <Title
            color="white"
            variant="h5"
            component="h5"
            style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}
            lineDisable
          >
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing
          </Title>
          <Text textAlign="center" color="white" fontSize="1.2rem">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim
            Ad Minim Veniam, Quis Nostrud Exercitation
            <br />
            <br />
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim
            Ad Minim Veniam, Quis Nostrud Exercitation
          </Text>
          <br />
          <br />
          <Button
            style={{ paddingLeft: '70px', paddingRight: '70px' }}
            text="ÜYE OL"
            soft
          />
        </Text>
      </Container>
    </NativeFluidBanner>
  );
};

export default FluidBanner;
