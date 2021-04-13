import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Accordion, Svg } from 'components';
import { space } from 'styled-system';
export default function ReservationAccordion({
  title,
  children,
  parent = false,
  defaultOpen = false,
  ...restProps
}) {
  const [toggleState, setToggleState] = useState(defaultOpen);
  return (
    <Accordion>
      <AccordionItemWrapper parent={parent} {...restProps}>
        <Accordion.Item defaultOpen={defaultOpen}>
          <Accordion.Toggle
            onToggle={(state) => setToggleState(state)}
            className="accordion-toggler"
          >
            <DarkTitle>{title}</DarkTitle>
            {toggleState ? <Svg.ArrowDownIcon /> : <Svg.ArrowUpIcon />}
          </Accordion.Toggle>
          <Accordion.Collapse>{children}</Accordion.Collapse>
        </Accordion.Item>
      </AccordionItemWrapper>
    </Accordion>
  );
}

const DarkTitle = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.dark};
`;

const AccordionItemWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  margin-bottom: 20px;
  width: 100%;
  ${space}

  .accordion-toggler {
    display: flex;
    background: ${(p) => (p.parent ? '#EFEFEF' : '#F8F8F8')};
    justify-content: space-between;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
  }
`;
