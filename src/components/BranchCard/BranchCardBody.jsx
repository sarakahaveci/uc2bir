import React from 'react';
import styled from 'styled-components/macro';

import { Svg } from 'components';

const BranchCardBody = () => {
  return (
    <CardBody>
      <List>
        <li>
          <Svg.ListItemIcon />
          <div>Medikal Egzersiz Uzmanlığı</div>
        </li>
        <li>
          <Svg.ListItemIcon />
          <div>Medikal Egzersiz Uzmanlığı</div>
        </li>
        <li>
          <Svg.ListItemIcon />
          <div>Medikal Egzersiz Uzmanlığı</div>
        </li>
      </List>
    </CardBody>
  );
};

export default BranchCardBody;

const CardBody = styled.div`
  background: #fcfcfc;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 15px 20px 20px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  li {
    font-size: 1rem;
    color: var(--black1);
    display: flex;
    align-items: center;
    height: 18px;
    margin-bottom: 15px;

    svg {
      margin: 0 10px 2px 0;
      width: 18px;
      height: 18px;
    }
  }
`;
