import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { localStorage } from 'utils';

const CookieConsent = () => {
  const [visibity, setVisibity] = useState(false);
  function setPerm() {
    localStorage.set('cookiePerm', true);
    setVisibity(false);
  }
  function controller() {
    var perm = localStorage.get('cookiePerm');
    if (!perm) setVisibity(true);
  }
  useEffect(() => {
    controller();
  }, []);

  return (
    <Container style={{ display: visibity ? 'initial' : 'none' }}>
      <Wrapper>
        <Text>
          Sizlere daha iyi bir hizmet vermek adına sitemizde çerez
          kullanılmaktadır.
        </Text>
        <Button onClick={setPerm}>Kabul Et</Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  padding: 5px;
  background: red;
  position: fixed;
  z-index: 99999999999999999999999;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background: #00b2a9;
  @media ${device.sm} {
    padding: 2px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const Text = styled.text`
  color: White;
  font-family: 'Poppins', sans-serif;
  @media ${device.sm} {
    font-size: 14px;
  }
`;
const Button = styled.div`
  margin-top: 10px;
  width: 100px;
  padding: 10px;
  font-family: 'Poppins', sans-serif;
  background: white;
  cursor: pointer;
  border-radius: 5px;
  @media ${device.sm} {
    width: 80px;
    height: 40px;
    font-size: 13px;
  }
`;
export default CookieConsent;
