import React from 'react';
import styled, { css } from 'styled-components/macro';

import { pulse } from 'components';
import { device } from 'utils';

const Item = ({ icon, text, pulse, notify = null }) => {
  return (
    <ItemWrapper>
      <IconWrapper pulse={pulse} className="icon">
        {icon}
      </IconWrapper>

      <Span className="title">{text}</Span>

      {notify > 0 && <Notify>{notify}</Notify>}
    </ItemWrapper>
  );
};

const IconWrapper = styled.span`
  ${(p) =>
    p.pulse &&
    css`
      animation: pulse 1s;
      animation-iteration-count: 2;

      ${pulse}
    `}
`;

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;

  @media ${device.lg} {
    flex-direction: column;
  }

  @media ${device.sm} {
    margin-top: 5px;
    border: none;
    padding: 10px;
    background: #e5e5e5;
    font-size: 0.9rem;
    margin: 5px 15px 0;

    svg {
      width: 25px;
      height: 25px;
      margin-right: 15px;
    }
  }

  @media ${device.lg} {
    align-items: center;
  }
`;

const Notify = styled.div`
  position: absolute;
  border-radius: 100%;
  background: ${(p) => p.theme.colors.blue};
  right: 0px;
  top: 5px;
  font-size: 9pt;
  font-weight: bold;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Span = styled.span`
  position: relative;
  width: 100%;
`;

export default Item;
