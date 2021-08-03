import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import { ApproveCard, DatePicker, RateModal, Svg } from 'components';
import { device } from 'utils';
import { getSessionHistorys, rateAndComment } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const SessionHistory = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(false);
  const [appointment, setAppointment] = useState(undefined);
  const [appointmentAll, setAppointmentAll] = useState(undefined);

  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.ptReservation?.session_historys
  );
  const [selectedDate, setSelectedDate] = useState();
  const startOfWeeksArr = () => {
    if (items?.date) {
      return Object.keys(items?.date).map(
        (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
      );
    } else {
      return [];
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getSessionHistorys());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      getSelectedDate();
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getSessionHistorys(moment(selectedDate).format('DD.MM.YYYY')));
  }
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
          <>
            {items?.appointment?.[
              moment(date).format('DD.MM.YYYY')
            ]?.gym?.map((elm, i) => (
              <ApproveCardContainer key={i}>
                <Svg.SessionType.Gym style={{ marginRight: '10px' }} />
                <ApproveCard
                  date={elm?.hour}
                  customerName={elm?.student}
                  user_id={elm?.student_id}

                  type="history"
                  rateText="Puanla"
                  has_comment={elm?.pt?.has_comment}

                  onApprove={() => {
                    setAppointmentAll(elm)
                    setAppointment({
                      id: elm?.id,
                      userId: elm?.pt?.id,
                    });
                    setOpenRateModal(true);
                  }}
                />
              </ApproveCardContainer>
            )) || <></>}
          </>

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.home_park?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Park style={{ marginRight: '10px' }} />

              <ApproveCard
                date={elm?.hour}
                customerName={elm?.student}
                user_id={elm?.student_id}

                type="history"
                rateText="Puanla"
                has_comment={elm?.pt?.has_comment}

                onApprove={() => {
                  setAppointmentAll(elm)
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.pt?.id,
                  });
                  setOpenRateModal(true);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.online?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Online style={{ marginRight: '10px' }} />

              <ApproveCard
                date={elm?.hour}
                customerName={elm?.student}
                user_id={elm?.student_id}

                type="history"
                rateText="Puanla"
                has_comment={elm?.pt?.has_comment}

                onApprove={() => {
                  setAppointmentAll(elm)
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.pt?.id,
                  });
                  setOpenRateModal(true);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}
        </ReservationAccordion>
      )
    } else {
      return (<></>)
    }
  } return (
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
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RateModal
        appointmentAll={appointmentAll}
        appointment_id={appointment?.id}
        descText="Öğrencinizi puanlamak ister misiniz?"
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
  flex-direction: column;

`;
const ApproveCardContainer = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
margin: 20px 0;
padding:5px;
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
