import React from 'react';
import styled from 'styled-components/macro';

import { Row, Col, Text, Title } from 'components';

const WorkPlaceRow = () => {
  return (
    <Container>
      <Image />

      <Col py="15px" height="100%" justifyContent="space-between">
        <Text fontWeight="600" fontSize="1.2rem">
          B-Fit Studio
        </Text>

        <Title
          lineDisable={false}
          color="gray1"
          fontWeight="400"
          fontSize="0.9rem"
          variant="h5"
          textAlign="left"
        >
          180 m , 100 kişi kapasiteli
        </Title>

        <Text color="gray1" fontSize="0.9rem" pb="10px" lineHeight="22px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <Address fontSize="0.9rem" pt="20px">
           Cevdet Paşa Caddesi No: 52-54 Bebek - İstanbul
        </Address>
      </Col>
    </Container>
  );
};

export default WorkPlaceRow;

const Address = styled(Text)`
  border-top: 0.5px solid rgba(112, 112, 112, 0.2);
`;

const Container = styled(Row)`
  border-radius: 25px;
  background: #fff;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  padding: 15px 35px 15px 15px;
`;

const Image = styled.img`
  width: 348px;
  height: 227px;
  border-radius: 25px;
  margin-right: 25px;
`;
