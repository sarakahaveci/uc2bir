import React from 'react';
import styled from 'styled-components/macro';

import { Svg } from 'components';

const BranchRowCollapser = ({ speciality }) => {
  return (
    <CardBody>
      <List>
        {speciality?.map((spec) => (
          <li key={spec}>
            <Svg.ListItemIcon />
            <div>{spec}</div>
          </li>
        ))}
      </List>
    </CardBody>
  );
};

export default BranchRowCollapser;

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
    color: ${(p) => p.theme.colors.dark};
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
