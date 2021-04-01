import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { Svg } from 'components';

export default function BackLink({ text, path }) {
  return (
    <EditedLink to={path}>
      <Svg.ArrowLeftIcon />

      <span>{text}</span>
    </EditedLink>
  );
}

const EditedLink = styled(Link)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  > svg {
    margin-bottom: 3px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.dark};
  }
`;
