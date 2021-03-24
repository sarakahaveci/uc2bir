import React from 'react';
import styled, { css } from 'styled-components/macro';

import { Accordion, Text, Svg } from 'components';

export default function TemplateSummary() {
  return (
    <div>
      <Accordion>
        <AccordionItemWrapper>
          <Accordion.Item>
            <Accordion.Toggle>
              <AccordionToggleWrapper>
                <Text fontWeight="600" color="dark" fontSize="1.1rem">
                  Rezervasyonlarınız
                </Text>

                <Svg.ArrowDownIcon />
              </AccordionToggleWrapper>
            </Accordion.Toggle>

            <Accordion.Collapse>
              <AccordionCollapseWrapper>
                <div>örnek </div>
                <div>örnek </div>
                <div>örnek </div>
                <div>örnek </div>
              </AccordionCollapseWrapper>
            </Accordion.Collapse>
          </Accordion.Item>
        </AccordionItemWrapper>
      </Accordion>
    </div>
  );
}

const AccordionToggleWrapper = styled.div`
  ${(p) =>
    p.isActive &&
    css`
      border-bottom: 0.5px solid rgba(144, 144, 144, 0.5);
      padding-bottom: 10px;
    `}

  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccordionItemWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  border: 1px solid ${(p) => p.theme.colors.gray9};
  padding: 20px 30px;
`;

const AccordionCollapseWrapper = styled.div`
  padding-top: 10px;
`;
