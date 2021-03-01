import React from 'react';
import styled from 'styled-components/macro';

const Section = ({children}) => {
  return (
    <StyledSection>
      {children}
    </StyledSection>
  )
}

const StyledSection = styled.section`
  visibility: visible;
`;

export default Section;
