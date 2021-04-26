import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { format } from 'date-fns';

import { Accordion, Button, DatePicker } from 'components';
import BranchRowToggler from 'components/BranchRow/BranchRowToggler';
import MyCalendarCollapser from './MyCalendarCollapser';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearReservation,
  getProfessionalCalendar,
  setReservation,
} from '../../../actions';
import moment from 'moment';

export default function MyCalendar({ userId, typeId, setPage = () => {} }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState();

  const { working_days: working_days, branches: branchList } = useSelector(
    (state) => state.userProfile.calendar
  );

  useEffect(() => {
    dispatch(getProfessionalCalendar(userId, typeId, startDate));
  }, [startDate]);

  const handleSelect = (date) => {
    setStartDate(date);
  };

  const startOfWeeksArr = working_days?.map(
    (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
  );

  return (
    <Row>
      <Col lg={7}>
        <DatePicker
          minDate={new Date()}
          inline
          selected={startDate}
          onSelect={handleSelect}
          highlightDates={[
            {
              'react-datepicker__day--highlighted': startOfWeeksArr,
            },
          ]}
          selectsRange
        />
      </Col>

      <Col lg={5}>
        <Accordion>
          {branchList?.map((item, index) => (
            <AccordionItemWrapper key={index}>
              <Accordion.Item>
                <Accordion.Toggle>
                  <BranchRowToggler data={item} />
                </Accordion.Toggle>

                <Accordion.Collapse>
                  <MyCalendarCollapser
                    data={item}
                    setSelectedHour={setSelectedHour}
                  />
                </Accordion.Collapse>
              </Accordion.Item>
            </AccordionItemWrapper>
          ))}
        </Accordion>
        <BranchWrapper>
          {selectedHour && (
            <Button
              onClick={() => {
                dispatch(clearReservation());
                dispatch(
                  setReservation({
                    isSelected: true,
                    date: format(startDate, 'dd.MM.yyyy'),
                    slot: [selectedHour],
                  })
                );
                setPage('Reservation');
              }}
              text="Devam Et"
              className="blue"
              width={'476px'}
              height={'66px'}
            />
          )}
        </BranchWrapper>
      </Col>
    </Row>
  );
}

const AccordionItemWrapper = styled.div`
  margin-bottom: 20px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
`;

const BranchWrapper = styled(Col)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
