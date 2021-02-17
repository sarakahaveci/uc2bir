import React from 'react';
import styled from 'styled-components';

import { Text, Svg } from 'components';

export default function Certificate({ isOdd, fileText }) {
  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    background: ${isOdd && '#e8fcfb'} !important;
  `;

  return (
    <Wrapper>
      <Svg.CertificateIcon />
      <Text fontSize="15px" className="ml-10">
        {fileText}
      </Text>
    </Wrapper>
  );
}
