import React from 'react';
import styled from 'styled-components/macro';

export default function Select({ children, ...restProps }) {
  return <StyledForm {...restProps}>{children}</StyledForm>;
}

const StyledForm = styled.select`
  background: #f5f5f5;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.04);
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  font-weight: 300;
  font-size: 0.9rem;
  color: ${(p) => p.theme.colors.dark};
`;
