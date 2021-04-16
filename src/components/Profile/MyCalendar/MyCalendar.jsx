import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

import { Accordion, DatePicker } from 'components';
import BranchRowToggler from 'components/BranchRow/BranchRowToggler';
import MyCalendarCollapser from './MyCalendarCollapser';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBranchList } from '../../../actions';

export default function MyCalendar({ userId }) {
  const dispatch = useDispatch();
  const { branches: branchList } = useSelector(
    (state) => state.userProfile.branch
  );

  useEffect(() => {
    dispatch(getUserBranchList(userId));
  }, []);
  return (
    <Row>
      <Col lg={7}>
        <DatePicker minDate={new Date()} inline selected={null} />
      </Col>

      <Col lg={5}>
        <Accordion>
          {branchList?.branches?.map((item, index) => (
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
