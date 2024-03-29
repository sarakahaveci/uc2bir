import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

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
import { DIETITIAN, USER } from '../../../constants';

export default function MyCalendar({
  userId,
  typeId,
  setPage = () => {},
  isUserDetail = false,
}) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState();
  const [selectedBranch, setSelectedBranch] = useState();

  const {
    working_days: working_days,
    branches: branchList,
    slots: slots,
  } = useSelector((state) => state.userProfile.calendar);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProfessionalCalendar(userId, typeId, startDate));
  }, [startDate]);

  const handleSelect = (date) => {
    setStartDate(date);
    setSelectedHour('');
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
          {typeId === DIETITIAN ? (
            <AccordionItemWrapper>
              <Accordion.Item defaultOpen={true}>
                <Accordion.Toggle>
                  <BranchRowToggler data={startDate} typeId={typeId} />
                </Accordion.Toggle>
                <Accordion.Collapse>
                  <MyCalendarCollapser
                    data={slots}
                    setSelectedHour={setSelectedHour}
                    setSelectedBranch={setSelectedBranch}
                    typeId={typeId}
                  />
                </Accordion.Collapse>
              </Accordion.Item>
            </AccordionItemWrapper>
          ) : (
            branchList?.map((item, index) => (
              <AccordionItemWrapper key={index}>
                <Accordion.Item defaultOpen={true}>
                  <Accordion.Toggle>
                    <BranchRowToggler data={item} typeId={typeId} />
                  </Accordion.Toggle>
                  <Accordion.Collapse>
                    <MyCalendarCollapser
                      data={item}
                      setSelectedHour={setSelectedHour}
                      setSelectedBranch={setSelectedBranch}
                      typeId={typeId}
                    />
                  </Accordion.Collapse>
                </Accordion.Item>
              </AccordionItemWrapper>
            ))
          )}
        </Accordion>
        <BranchWrapper>
          {selectedHour && isUserDetail === false && user?.type_id === USER && (
            <Button
              onClick={() => {
                dispatch(clearReservation());
                dispatch(
                  setReservation({
                    isSelected: true,
                    isSelectedDate: format(startDate, 'dd.MM.yyyy'),
                    slot: [
                      {
                        date: format(startDate, 'dd.MM.yyyy'),
                        hour: selectedHour,
                      },
                    ],
                    branch_id: selectedBranch,
                  })
                );

                setPage('Reservation');
              }}
              text={t('continue')}
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
