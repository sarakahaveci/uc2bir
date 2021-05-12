import React from 'react';
// @ts-ignore
import { default as NativeFluidBanner } from '../../components/banner/fluid-banner';
import { Title, Text, Button } from '../../components';

// @ts-ignore
import backgroundImage from '../../components/statics/background/images/banner-bottom.jpg';
import { Container } from 'react-bootstrap';

const FluidBanner = (props) => {
  return (
    <NativeFluidBanner
      className={props.className}
      backgroundImage={backgroundImage}
    >
      <Container>
        <Text textAlign="center">
          <Title
            color="white"
            variant="h5"
            component="h5"
            style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}
            lineDisable
          >
            Sen neredeysen spor ve eğitmen orada!
          </Title>
          <Text
            textAlign="center"
            color="white"
            fontSize="1.2rem"
            letterSpacing="1px"
            lineHeight="30px"
          >
            Sporseverler, eğitmen seçiyor, yeri ve zamanı belirliyor.
            <br />
            Bire bir ilgi, diyetisyen desteği, spor salonu seçenekleri hepsi
            burada.
            <br />
            Başarmak için hemen başla!
          </Text>
          <br />

          <Button
            // style={{ paddingLeft: '70px', paddingRight: '70px' }}
            text="ÜYE OL"
            soft
          />
        </Text>
      </Container>
    </NativeFluidBanner>
  );
};

export default FluidBanner;
