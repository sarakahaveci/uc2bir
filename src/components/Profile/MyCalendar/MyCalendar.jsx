import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

import { Accordion, Calendar } from 'components';
import BranchRowToggler from 'components/BranchRow/BranchRowToggler';
import MyCalendarCollapser from './MyCalendarCollapser';
import { theme } from 'utils';

const mockData = [
  {
    sportType: 1,
    sportName: 'FITNESS',
    level: 'A',
    price: 150,
  },
  {
    sportType: 2,
    sportName: 'YOGA',
    level: 'A',
    price: 150,
  },
  {
    sportType: 3,
    sportName: 'PLATES',
    level: 'A',
    price: 150,
  },
  {
    sportType: 4,
    sportName: 'TENIS',
    level: 'A',
    price: 150,
  },
];

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <Row>
      <Col lg={6}>
        <Calendar
          color={theme.colors.blue}
          date={date}
          onChange={(item) => setDate(item)}
          minDate={new Date()}
        />
      </Col>

      <Col lg={6}>
        <Accordion>
          {mockData.map((item, index) => (
            <AccordionItemWrapper key={index}>
              <Accordion.Item>
                <Accordion.Toggle>
                  <BranchRowToggler data={item} />
                </Accordion.Toggle>

                <Accordion.Collapse>
                  <MyCalendarCollapser />
                </Accordion.Collapse>
              </Accordion.Item>
            </AccordionItemWrapper>
          ))}
        </Accordion>
      </Col>
    </Row>
  );
}

const AccordionItemWrapper = styled.div`
  margin-bottom: 20px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
`;
