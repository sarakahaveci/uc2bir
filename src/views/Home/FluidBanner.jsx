import React from 'react';
// @ts-ignore
import { default as NativeFluidBanner } from '../../components/banner/fluid-banner';
import { Title, Text, Button } from '../../components';

// @ts-ignore
import backgroundImage from '../../components/statics/background/images/fluid-banner.jpg';
import { Container } from 'react-bootstrap';

const FluidBanner = (props) => {
  return (
    <NativeFluidBanner
      className={props.className}
      backgroundImage={backgroundImage}
      fixed
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
          <Text textAlign="center" color="white" fontSize="18px">
            Sporseverler, eğitmen seçiyor, yeri ve zamanı belirliyor. Bire bir
            ilgi, diyetisyen desteği, spor salonu seçenekleri hepsi burada.
            <br />
            Başarmak için hemen başla!
          </Text>
          <Button text="ÜYE OL" soft />
        </Text>
      </Container>
    </NativeFluidBanner>
  );
};

export default FluidBanner;
