import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const List = ({ dropDown = [], className = null, children }) => {
  return (
    <Lists className={className}>
      <Item>
        {children}
        {dropDown.length > 0 && (
          <Lists className="drop-down">
            {dropDown.map((val, key) => (
              <Item className="col" key={key}>
                <A onClick={val.onClick} to={val.to}>
                  <Icon className="item-icon">{val.icon}</Icon> {val.name}
                </A>
              </Item>
            ))}
          </Lists>
        )}
      </Item>
    </Lists>
  );
};

const Lists = styled.ul`
  list-style-type: none;
  margin: 0px !important;
`;

const Item = styled.li`
  visibility: visible;
`;

const A = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Icon = styled.span`
  display: inline-flex;
`;

export default List;
