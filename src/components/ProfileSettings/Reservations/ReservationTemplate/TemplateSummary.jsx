import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTemplateItem } from 'actions';
import { Accordion, Text, Svg, Box, Span } from 'components';

export default function TemplateSummary() {
  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

  const dispatch = useDispatch();

  const templateItems = selectedDay?.slice?.map((item) => (
    <TemplateInfoRow key={item.id}>
      <Svg.TrashIcon
        className="trash-icon"
        onClick={() => dispatch(deleteTemplateItem(selectedDay.day, item.id))}
      />

      <div>
        <HourWrapper>
          <Svg.ClockIcon className="clock-icon" />

          <Box row alignItems="center">
            {item.hour}
          </Box>
        </HourWrapper>

        <Box>
          <Span fontWeight="600">Branşlar: </Span>
          {item.branch.map((branch, index) => (
            <span key={index}>
              {branch.name}

              {index < item.branch.length - 1 && ', '}
            </span>
          ))}
        </Box>

        <div>
          <Span fontWeight="600">Oturum Türleri: </Span>
        </div>

        <div>
          <Span fontWeight="600">Seçili Yerler: </Span>
        </div>
      </div>
    </TemplateInfoRow>
  ));

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
                {templateItems}
              </AccordionCollapseWrapper>
            </Accordion.Collapse>
          </Accordion.Item>
        </AccordionItemWrapper>
      </Accordion>
    </div>
  );
}

const HourWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;

  svg {
    margin-bottom: 5px;
  }
`;

const TemplateInfoRow = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  padding: 15px 15px 15px 0;
  position: relative;

  .trash-icon {
    position: absolute;
    top: 15px;
    right: 0;
    cursor: pointer;
  }

  .clock-icon {
    margin-right: 10px;
  }
`;

const AccordionToggleWrapper = styled.div`
  ${(p) => p.isActive && css``}

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
