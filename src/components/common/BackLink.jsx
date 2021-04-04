import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { space } from 'styled-system';

import { Svg, Span } from 'components';

export default function BackLink({
  text,
  path,
  onClick = () => {},
  ...restProps
}) {
  return (
    <EditedLink to={path} onClick={onClick} {...restProps}>
      <Svg.ArrowLeftIcon />

      <Span fontWeight="600" fontSize="1.2rem">
        {text}
      </Span>
    </EditedLink>
  );
}

const EditedLink = styled((props) =>
  props.path ? <Link {...props} /> : <div {...props} />
)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 3px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.dark};
  }

  ${space}
`;
