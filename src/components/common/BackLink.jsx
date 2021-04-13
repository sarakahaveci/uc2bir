import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { space } from 'styled-system';

import { Svg, Span } from 'components';

export default function BackLink({
  text,
  path,
  onClick = () => {},
  size = 'lg',
  ...restProps
}) {
  return (
    <EditedLink to={path} onClick={onClick} size={size} {...restProps}>
      <Svg.ArrowLeftIcon />

      <Span fontWeight="600" fontSize="1.2rem">
        {text}
      </Span>
    </EditedLink>
  );
}

const EditedLink = styled((props) =>
  props.to ? <Link {...props} /> : <div {...props} />
)`
  display: inline-flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 3px;
  }

  > span {
    ${(p) =>
      p.size === 'sm' &&
      css`
        font-weight: 400;
        font-size: 0.9rem;
      `}

    ${(p) =>
      p.size === 'lg' &&
      css`
        font-weight: 600;
        font-size: 1.2rem;
      `}
   
    margin-left: 10px;
    color: ${(p) => p.theme.colors.dark};
  }

  ${space}
`;
