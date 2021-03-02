import React from 'react';

import { Col, Span, Text } from 'components';

const ProfileCancellation = ({ checkIsValidCancellation }) => {
  return (
    <Col mx="10px" onClick={checkIsValidCancellation}>
      <Span
        textDecoration="underline"
        color="black2"
        fontSize="0.9rem"
        opacity="0.8"
        cursor="pointer"
      >
        Üyelik İptali
      </Span>

      <Text color="gray4" fontWeight="300" fontSize="0.8rem">
        Üyelik iptali durumunda kişiler size ulaşamayacaklardır.
      </Text>
    </Col>
  );
};

export default ProfileCancellation;
