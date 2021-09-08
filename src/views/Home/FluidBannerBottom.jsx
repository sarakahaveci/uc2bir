import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// @ts-ignore
import { default as NativeFluidBanner } from '../../components/banner/fluid-banner';
import { Title, Text, Button } from '../../components';

// @ts-ignore
import backgroundImage from '../../components/statics/background/images/banner-bottom.jpg';
import { Container } from 'react-bootstrap';

const FluidBanner = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const handleClick = () => {
    history.push('/login');
  };
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
            {t('Wherever you are, the sport and the trainer are there!')}
          </Title>
          <Text
            textAlign="center"
            color="white"
            fontSize="1.2rem"
            letterSpacing="1px"
            lineHeight="30px"
          >
            {t('Sports fans choose trainers, determine the place and time')}
            <br />
            {t(
              'One-on-one attention, dietitian support, gym options are all here'
            )}
            <br />
            {t('Get started now to succeed!')}
          </Text>
          <br />

          <Button
            // style={{ paddingLeft: '70px', paddingRight: '70px' }}
            text={t('SIGN UP')}
            soft
            onClick={() => handleClick()}
          />
        </Text>
      </Container>
    </NativeFluidBanner>
  );
};

export default FluidBanner;
