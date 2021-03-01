// @ts-nocheck
import React from 'react';

import styled from 'styled-components/macro';
import { Main, Title, Text, Button, Svg } from 'components';
import img from '../../assets/404.jpg';
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Main>
      <Section className="not-found-page">
        <Div>
          <Title
            variant={'h1'}
            component={'h1'}
            textAlign="center"
            fontWeight="bold"
            margin="0"
            lineDisable
            color="white"
          >
            404
          </Title>
          <div style={{marginTop: 90}}>
            <Title
              variant={'h4'}
              component={'h4'}
              textAlign="center"
              fontWeight="normal"
              margin="0"
              lineDisable
              color="white"
              icon={
                <Svg.Hki
                  style={{
                    display: 'inline-flex',
                    position: 'relative',
                    top: '-25px',
                  }}
                />
              }
            >
              Üzgünüz!
            </Title>
          </div>
          <Text textAlign="center" color="white">
            Sayfa silinmiş ya da hiç var olmamış olabilir.
          </Text>
          <Button
            onClick={() => history.push('/')}
            text="Anasayfa"
            style={{
              color: 'white',
              margin: 30,
              background: 'transparent',
              border: '1px solid #fff',
              padding: '15px 30px',
            }}
          />
        </Div>
      </Section>
    </Main>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background-image: url('${img}');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100vh;

  &:after {
    content: '';
    height: 100%;
    width: 100%;
    display: block;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
  }
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

export default NotFoundPage;
