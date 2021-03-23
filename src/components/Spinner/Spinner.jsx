import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled, { css } from 'styled-components/macro';

export default function CustomSpinner(props) {
  return (
    <Styledwrapper type={props.type}>
      <Spinner animation="border" variant="info" {...props} />
    </Styledwrapper>
  );
}

const Styledwrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${(p) =>
    p.type === 'static' &&
    css`
      position: relative;
    `}
`;
