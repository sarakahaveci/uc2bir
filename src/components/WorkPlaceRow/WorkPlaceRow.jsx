import React from 'react';
import styled from 'styled-components/macro';

import { Row, Col, Text, AwesomeIcon } from 'components';

const WorkPlaceRow = ({ title, area, description, price, address }) => {
  return (
    <Container>
      <Image />

      <Col py="15px" height="100%" justifyContent="space-between">
        <Text fontWeight="600" fontSize="1.2rem">
          {title}
        </Text>

        <Text underline color="gray1" fontWeight="400" fontSize="0.9rem">
          {area}
        </Text>

        <Text fontWeight="bold" color="dark" fontSize="1.1rem">
          {price} <AwesomeIcon.Tl />
        </Text>

        <Text color="gray1" fontSize="0.9rem" pb="10px" lineHeight="22px">
          {description}
        </Text>

        <Address fontSize="0.9rem" pt="20px" color="gray1">
          {address}
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
  margin: 20px 0;
`;

const Image = styled.img`
  width: 348px;
  height: 227px;
  border-radius: 25px;
  margin-right: 25px;
`;
