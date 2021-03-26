import React from 'react';
import styled from 'styled-components';

import { Text, Svg } from 'components';

export default function Certificate({ isOdd, fileText, path }) {
  const Wrapper = styled.a`
    display: flex;
    width: 100%;
    align-items: center;
    background: ${isOdd && '#e8fcfb'} !important;
    padding: 5px 0;
    color: black;
  `;

  return (
    <Wrapper href={path} target="_blank">
      <Svg.CertificateIcon className="mb-2 ml-2" />
      <Text fontSize="15px" className="ml-10">
        {fileText}
      </Text>
    </Wrapper>
  );
}
