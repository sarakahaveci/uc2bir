import React from 'react';
import styled from 'styled-components/macro';
import { colorGenerator } from 'utils';

const Item = ({ icon, span, notify = null }) => {
  return (
    <>
      <Icon className="icon">{icon}</Icon>
      <Span className="title">{span}</Span>
      {notify > 0 && <Notify>{notify}</Notify>}
    </>
  );
};

const Notify = styled.div`
  position: absolute;
  border-radius: 100%;
  background: ${colorGenerator('blue')};
  right: 0px;
  top: -5px;
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

const Icon = styled.span`
  width: 100%;
`;

export default Item;
