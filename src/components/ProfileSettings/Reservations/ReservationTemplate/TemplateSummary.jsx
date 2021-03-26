import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { deleteTemplateItem } from 'actions';
import { Accordion, Text, Svg, Box } from 'components';
import { HOURS } from '../../../../constants';

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
        <Box mb="10px">
          <Svg.ClockIcon className="clock-icon" />

          <Row>
            {item.hour.map((hour, index) => (
              <Col lg={3} md={4} key={index}>
                {HOURS[hour]}
              </Col>
            ))}
          </Row>
        </Box>

        <Box>
          <span>Branşlar: </span>
          <span></span>
        </Box>

        <div>
          <span>Oturum Türleri: </span>
        </div>

        <div>
          <span>Seçili Yerler: </span>
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

const TemplateInfoRow = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  padding: 15px 15px 0 0;
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
