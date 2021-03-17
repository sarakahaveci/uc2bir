import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components/macro';

export default function CustomSpinner(props) {
  return (
    <Styledwrapper>
      <Spinner animation="border" variant="info" {...props} />
    </Styledwrapper>
  );
}

const Styledwrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
