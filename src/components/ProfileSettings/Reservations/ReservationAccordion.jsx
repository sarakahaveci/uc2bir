import React from 'react';
import styled from 'styled-components/macro';

import { Accordion, Svg } from 'components';

export default function ReservationAccordion({ title, children }) {
  return (
    <Accordion>
      <AccordionItemWrapper>
        <Accordion.Item defaultOpen>
          <Accordion.Toggle className="accordion-toggler">
            <DarkTitle>{title}</DarkTitle>

            <Svg.ArrowDownIcon />
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
  border: 1px solid #c6c6c6;
  padding: 20px;
  margin-bottom: 20px;

  .accordion-toggler {
    display: flex;
    justify-content: space-between;
  }
`;
