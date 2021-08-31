import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import { ApproveCard, DatePicker, RateModal, Svg, SessionComment } from 'components';
import { device } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import { getDtSessionHistorys, rateAndComment } from 'actions';
import moment from 'moment';

const SessionHistory = ({ setSubPage = () => { } }) => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.dtReservation?.session_historys
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
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
  function openSessionComment(id) {
    setSubPage(
      <SessionComment session_id={id} goBack={() => { setSubPage() }}></SessionComment>
    );
  }
  function onStatusChange(){
    
  }
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getDtSessionHistorys());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      getSelectedDate();
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getDtSessionHistorys(moment(selectedDate).format('DD.MM.YYYY')));
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

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.clinic?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Clinic style={{ marginRight: '10px' }} />

              <ApproveCard
                type="history"
                date={elm?.hour}
                session_status={elm?.session_status}
                onStatusChange={onStatusChange}
                customerName={elm?.student}
                has_comment={elm?.dt?.has_comment}
                rateText="Puanla"
                onSessionComment={() => { openSessionComment(elm?.id) }}

                onApprove={() => {
                  setAppointmentAll(elm)
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.dt?.id,
                  });
                  setOpenRateModal('index');
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
                type="history"
                date={elm?.hour}
                customerName={elm?.student}
                has_comment={elm?.dt?.has_comment}
                session_status={elm?.session_status}
                onStatusChange={onStatusChange}
                onSessionComment={() => { openSessionComment(elm?.id) }}
                rateText="Puanla"
                onApprove={() => {
                  setAppointmentAll(elm)
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.dt?.id,
                  });
                  setOpenRateModal('index');
                }}
              />
            </ApproveCardContainer>
          )) || <></>}
        </ReservationAccordion>
      )
    } else {
      return (<></>)
    }
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
            />
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
        rate={({ rate, comment, commented_id, rateType, session_file }) => {

          if (rateType == 'session') {
            dispatch(
              rateAndCommentSession(
                {
                  appointment_id: appointment?.id,
                  rating: rate,
                  comment: comment,
                  session_file: session_file
                },
                () => {
                  setAppointment(undefined);
                  setOpenRateModal(null);
                },
                () => {
                  setAppointment(undefined);
                  setOpenRateModal(null);
                }
              )
            );
          } else {

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
                  setOpenRateModal(null);
                },
                () => {
                  setAppointment(undefined);
                  setOpenRateModal(null);
                }
              )
            );
          }
        }}
        cancel={() => {
          setAppointment(undefined);
          setOpenRateModal(null);
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
