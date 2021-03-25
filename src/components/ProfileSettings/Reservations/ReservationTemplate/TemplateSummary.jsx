import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useSelector } from 'react-redux';

import { Accordion, Text, Svg } from 'components';
import { HOURS } from '../../../../constants';

export default function TemplateSummary() {
  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

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
                {selectedDay.dates.map((item, index) => (
                  <div key={index}>
                    {HOURS[item.hours[0]]}-{HOURS[item.hours[1]]}
                  </div>
                ))}
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
