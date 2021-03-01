import React from 'react';
import styled from 'styled-components/macro';

import { Svg, Title, Text, redBackground, Button } from 'components';

const CancellationFinalize = () => {
  return (
    <>
      <Wrapper>
        <RedBackground mb="25px">
          <Svg.SadFaceIcon />
        </RedBackground>

        <Title component="h5">Merhaba..</Title>

        <Text
          textAlign="center"
          color="dark"
          fontWeight="500"
          lineHeight="25px"
        >
          Üyelik iptal talebin tarafımızca incelendikten sonra seni
          bilgilendireceğiz.
        </Text>
      </Wrapper>
      <Footer>
        <Button text="Çıkış Yap" fontWeight="500" />
      </Footer>
    </>
  );
};

export default CancellationFinalize;

const Wrapper = styled.div`
  padding: 30px 90px 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  padding: 5px 0;
  display: flex;
  justify-content: center;
`;

const RedBackground = styled.div`
  ${redBackground}
  margin-bottom: 25px;
`;
