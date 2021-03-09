import React, { useContext } from 'react';
import styled, { css } from 'styled-components/macro';

import { AccordionItemContext, CollapseContext } from './AccordionContext';

const Collapse = ({ children, uid }) => {
  const { isActive } = useContext(AccordionItemContext);

  return (
    <CollapseContext.Provider value={{ isActive }}>
      <Wrapper>
        <CollapseWrapper id={`item-${uid}`} isActive={isActive}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              isActive,
            })
          )}
        </CollapseWrapper>
      </Wrapper>
    </CollapseContext.Provider>
  );
};

export default Collapse;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CollapseWrapper = styled.div`
  flex-basis: 0px;
  overflow: hidden;

  ${(p) =>
    p.isActive &&
    css`
      flex-basis: 100%;
    `}
`;
