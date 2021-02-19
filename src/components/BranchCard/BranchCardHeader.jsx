import React from 'react';
import styled, { css } from 'styled-components/macro';

import { Svg, AwesomeIcon, Row } from 'components';
import { sportIconGenerator } from 'utils';

const BranchCardHeader = ({ isActive, sportType, sportName, level, price }) => {
  return (
    <StyledCardHeader isActive={isActive}>
      <StyledRow center className="first">
        {sportIconGenerator(sportType)}
        <Title>{sportName}</Title>
      </StyledRow>

      <Row>
        <RightCell>{level} Seviye</RightCell>
        <RightCell className="mid">
          <span>{price}</span>
          <AwesomeIcon.Tl />
        </RightCell>
        <RightCell className="last">
          <Svg.ArrowRightIcon />
        </RightCell>
      </Row>
    </StyledCardHeader>
  );
};

export default BranchCardHeader;

const StyledRow = styled(Row)`
  .yoga {
    svg {
      width: 22px;
      height: 22px;
      margin-right: 15px;
      margin-bottom: 2px;
    }
  }
`;

const RightCell = styled.div`
  border-left: 1px solid #d3d3d3;
  padding: 0 10px;

  &:last-child {
    padding-right: 0;
  }

  &.first {
    font-size: 0.9rem;
    line-height: 17px;
    color: var(--black1);
  }

  &.mid {
    color: var(--blue);

    svg {
      margin-left: 5px;
    }
  }
`;

const Title = styled.h4`
  font-size: 1.1rem;
  letter-spacing: 0.21em;
  color: var(--black1);
  font-weight: 600;
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 15px 20px;
  border-radius: 10px;
  background: #fcfcfc;
  border-bottom: 0.5px solid transparent;

  .last {
    svg {
      transition: all 0.5s;
      transform: ${(p) => p.isActive && 'rotate(90deg)'};
    }
  }

  ${(p) =>
    p.isActive &&
    css`
      border-bottom: 0.5px solid rgba(197, 196, 196, 0.6);
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    `}
`;