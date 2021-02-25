// @ts-nocheck
import React from 'react';

import styled from 'styled-components/macro';
import { Col } from 'react-bootstrap';

export const CardFooter = ({ children }) => {
  return <StyledCardFooter>{children}</StyledCardFooter>;
};

const Card = ({ img, children }) => {
  return (
    <StyledCard img={img}>
      {children}
      <CardFooter />
    </StyledCard>
  );
};

const StyledCard = styled(Col)`
  max-width: 375px;
  height: 285px;
  position: relative;
  background-image: url('${(props) => props.img}');
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  span.team {
    position: absolute;
    left: 0;
    top: 0;
    padding: 7px 15px;
    color: #00b2a9;
    font-weight: bold;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.5);
    border-top-left-radius: 30px;
  }

  span.span {
    position: absolute;
    right: 30px;
    top: 30px;

    &.background {
      background: #fff;
      padding: 5px;
      border-radius: 5px;
    }

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const StyledCardFooter = styled.div`
  display: flex;
  position: absolute;
  bottom: -15px;
  width: 100%;
  justify-content: flex-end;
  padding-right: 30px;

  .list {
    margin-left: 7px;
    box-shadow: 5px 5px 10px -8px rgba(0, 0, 0, 0.75);
  }
`;

export default Card;
