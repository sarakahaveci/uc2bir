import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import {
  ApproveCard,
  DatePicker,
  RateModal,
  Svg,
  SessionComment,
  RejectStatusModal
} from 'components';
import { device } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import { getGymSessionHistorys, SessionStatusResponse, rateAndCommentSession, getSessionComment } from 'actions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const SessionHistory = ({ setSubPage = () => { } }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.dtReservation?.session_historys
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [appointment, setAppointment] = useState(undefined);
  const [appointmentAll, setAppointmentAll] = useState(undefined);
  const [openRejectModal, setOpenRejectModal] = useState(null);

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
      <SessionComment
        session_id={id}
        goBack={() => {
          setSubPage();
        }}
      ></SessionComment>
    );
  }
  function onStatusChange(status, elm,comment) {
    dispatch(SessionStatusResponse({
      appointment_id: elm?.id,
      type: status == 0 ? 'object' : 'approve',
      reason: comment
    }, () => { dispatch(getGymSessionHistorys()) }))
  }
  function _renderTab(date) {
    if (items?.appointment?.[moment(date).format('DD.MM.YYYY')]) {
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
                onSessionComment={() => {
                  openSessionComment(elm?.id);
                }}
                elm={elm}
                onStatusChange={(status) => {
                  onStatusChange(status, elm);
                }}
                type="history"
                date={elm?.hour}
                customerName={elm?.student}
                has_comment={elm?.bs?.has_comment}
                rateText={t('rate it')}
                onReject={() => {
                  setAppointmentAll(elm)
                  setOpenRejectModal('index');
                }}
                onApprove={() => {
                  setAppointmentAll(elm);
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.bs?.id,
                  });
                  dispatch(getSessionComment(elm?.id))

                  setOpenRateModal('index');
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
                onSessionComment={() => {
                  openSessionComment(elm?.id);
                }}
                elm={elm}
                onStatusChange={(status) => {
                  onStatusChange(status, elm);
                }}
                type="history"
                date={elm?.hour}
                customerName={elm?.student}
                has_comment={elm?.bs?.has_comment}
                onReject={() => {
                  setAppointmentAll(elm)
                  setOpenRejectModal('index');
                }}
                rateText={t('rate it')}
                onApprove={() => {
                  setAppointmentAll(elm);
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.bs?.id,
                  });
                  dispatch(getSessionComment(elm?.id))

                  setOpenRateModal('index');
                }}
              />
            </ApproveCardContainer>
          )) || <></>}
        </ReservationAccordion>
      );
    } else {
      return <></>;
    }
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
            {startOfWeeksArr().map((date) => _renderTab(date))}
            {!(startOfWeeksArr()?.length > 0) && (
              <text style={{ padding: '20px' }}>
                {t('There are no pending reservation requests')}
              </text>
            )}
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
      <RejectStatusModal
        open={openRejectModal}
        appointmentAll={appointmentAll}
        appointment_id={appointment?.id}

        reject={(comment) => {
          onStatusChange(0, appointmentAll, comment)
          setAppointment(undefined);
          setOpenRejectModal(null)
        }}
        cancel={() => {
          setAppointment(undefined);
          setOpenRejectModal(null)
        }}
      ></RejectStatusModal>
       <RateModal
        appointmentAll={appointmentAll}
        appointment_id={appointment?.id}
        descText={t('Would you like to rate your client?')}
        rateLabel={t('rate it')}
        cancelLabel={t('Give Up')}
        open={openRateModal}
        rate={(multipart) => {

          dispatch(
            rateAndCommentSession(
              multipart,
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
  justify-content: space-between;
  margin: 20px 0;
  padding: 5px;
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
