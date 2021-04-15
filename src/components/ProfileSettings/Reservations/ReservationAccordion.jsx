import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Accordion, Svg } from 'components';
import { space } from 'styled-system';
export default function ReservationAccordion({
  title,
  children,
  parent = false,
  accordionBackground ='',
  accordionRadius='10px',
  defaultOpen = false,
  miniIcon = <></>,
  ...restProps
}) {
  const [toggleState, setToggleState] = useState(defaultOpen);
  return (
    <Accordion>
      <AccordionItemWrapper parent={parent} {...restProps}  accordionRadius={accordionRadius} accordionBackground={accordionBackground}>
        <Accordion.Item defaultOpen={defaultOpen}>
          <Accordion.Toggle
            onToggle={(state) => setToggleState(state)}
            className="accordion-toggler"


          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {miniIcon}
              <DarkTitle>{title}</DarkTitle>
            </div>
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
  margin-left: 5px;
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
    background: ${(p) => (p.parent ? '#EFEFEF' : p.accordionBackground? p.accordionBackground :'#F8F8F8')};
    justify-content: space-between;
    border-radius:  ${(p) => (p.accordionRadius ? p.accordionRadius : '10px')};
    padding: 15px;
    margin-bottom: 10px;
  }
`;
