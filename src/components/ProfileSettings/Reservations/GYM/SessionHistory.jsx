import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import { ApproveCard, DatePicker, RateModal, Svg } from 'components';
import { device } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import { getGymSessionHistorys, rateAndComment } from 'actions';
import moment from 'moment';

const SessionHistory = () => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.dtReservation?.session_historys
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [appointment, setAppointment] = useState(undefined);
  const [appointmentAll, setAppointmentAll] = useState(undefined);

  const startOfWeeksArr = () => {
    if (items?.date) {
      return Object.keys(items?.date).map(
        (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
      );
    } else {
      return [];
    }
  };
  function _renderTab(date) {
    if (items?.appointment?.[
      moment(date).format('DD.MM.YYYY')
    ]) {
      return (
        <ReservationAccordion
          defaultOpen={true}
          parent
          title={moment(date).format('DD.MM.YYYY')}
        >
          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.with_pt?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Gym style={{ marginRight: '10px' }} />

              <ApproveCard
                user_id={elm?.student_id}

                type="history"
                date={elm?.hour}
                customerName={elm?.student}
                has_comment={elm?.bs?.has_comment}
                rateText="Puanla"
                onApprove={() => {
                  setAppointmentAll(elm)
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.bs?.id,
                  });
                  setOpenRateModal(true);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.without_pt?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Gym style={{ marginRight: '10px' }} />

              <ApproveCard
                user_id={elm?.student_id}

                type="history"
                date={elm?.hour}
                customerName={elm?.student}
                has_comment={elm?.bs?.has_comment}

                rateText="Puanla"
                onApprove={() => {
                  setAppointmentAll(elm)
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.bs?.id,
                  });
                  setOpenRateModal(true);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}
        </ReservationAccordion>
      )
    } else { return (<></>) }
  }
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getGymSessionHistorys());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      getSelectedDate();
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getGymSessionHistorys(moment(selectedDate).format('DD.MM.YYYY')));
  }
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          <AccordionContainer>
            {
              startOfWeeksArr().map((date) => (
                _renderTab(date)
              ))

            }
            {!(startOfWeeksArr()?.length > 0) && <text style={{ padding: '20px' }}>Onay bekleyen hiçbir rezervasyon talebi yoktur</text>}
          </AccordionContainer>
        </StyledCol>
        <StyledCol
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          xs={{ order: IsSmallScreen ? 1 : 2 }}
          lg={4}
        >
          <DateContainer>
            <DatePicker
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
              }}
              selectsRange
              inline
              highlightDates={[
                {
                  'react-datepicker__day--highlighted': startOfWeeksArr(),
                },
              ]}
            />{' '}
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RateModal
        appointmentAll={appointmentAll}
        appointment_id={appointment?.id}
        descText="Danışanızı puanlamak ister misiniz?"
        rateLabel="PUANLA"
        cancelLabel="VAZGEÇ"
        open={openRateModal}
        rate={({ rate, comment, commented_id }) => {
          dispatch(
            rateAndComment(
              {
                appointment_id: appointment?.id,
                rating: rate,
                comment: comment,
                commented_id: commented_id,
              },
              () => {
                setAppointment(undefined);
                setOpenRateModal(false);
              },
              () => {
                setAppointment(undefined);
                setOpenRateModal(false);
              }
            )
          );
        }}
        cancel={() => {
          setAppointment(undefined);
          setOpenRateModal(false);
        }}
      />
    </StyledContainer>
  );
};

const DateContainer = styled.div`
  width: 100%;
`;
const AccordionContainer = styled.div`
  display: flex;
`;
const ApproveCardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  @media ${device.sm} {
    margin: 0;
  }
`;

const StyledCol = styled(Col)`
  @media ${device.sm} {
    padding: 0;
    margin: 0;
  }
`;
const StyledRow = styled(Row)`
  @media ${device.sm} {
    margin: 0;
  }
`;
const StyledContainer = styled(Container)`
  @media ${device.sm} {
    margin: 0;
    padding: 0;
  }
`;
export default SessionHistory;
