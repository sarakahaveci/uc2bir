import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import {
  ApproveCard,
  DatePicker,
  RateModal,
  Svg,
  SessionComment,
  RejectStatusModal
} from 'components';
import { device } from 'utils';
import { getUserSessionHistorys } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  rateAndCommentSession,
  SessionStatusResponse,
  getSessionComment,
} from 'actions';

const SessionHistory = ({ setSubPage = () => {} }) => {
  const { t } = useTranslation();

  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(null);
  const [appointment, setAppointment] = useState(undefined);
  const [appointmentAll, setAppointmentAll] = useState(undefined);
  const [openRejectModal, setOpenRejectModal] = useState(null);

  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.userReservation?.session_historys
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
  function onStatusChange(status, elm,comment) {
    dispatch(
      SessionStatusResponse(
        {
          appointment_id: elm?.id,
          type: status == 0 ? 'rejected' : 'approved',
          reason: comment
        },
        () => {
          dispatch(getUserSessionHistorys());
        }
      )
    );
  }
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getUserSessionHistorys());
  }, []);
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
  useEffect(() => {
    if (selectedDate) {
      getSelectedDate();
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getUserSessionHistorys(moment(selectedDate).format('DD.MM.YYYY')));
  }
  function _renderTab(date) {
    if (items?.appointment?.[moment(date).format('DD.MM.YYYY')]) {
      return (
        <ReservationAccordion
          defaultOpen={true}
          parent
          title={moment(date).format('DD.MM.YYYY')}
        >
          {items?.appointment?.[moment(date).format('DD.MM.YYYY')]?.gym?.map(
            (elm, i) => (
              <ApproveCardContainer key={i}>
                <Svg.SessionType.Gym style={{ marginRight: '10px' }} />

                <ApproveCard
                  date={elm?.hour}
                  customerName={elm?.address_title}
                  user_id={elm?.bs?.id}
                  elm={elm}
                  has_comment={elm?.pt?.has_comment}
                  type="history"
                  rateText={t('rate it')}
                  onSessionComment={() => {
                    openSessionComment(elm?.id);
                  }}
                  onReject={() => {
                    setAppointmentAll(elm)
                    setOpenRejectModal('index');
                  }}
                  onApprove={() => {
                    setAppointmentAll(elm);
                    setAppointment({
                      id: elm?.id,
                      userId: elm?.pt?.id,
                    });
                    dispatch(getSessionComment(elm?.id));

                    setOpenRateModal('index');
                  }}
                  onStatusChange={(status) => {
                    onStatusChange(status, elm);
                  }}
                />
              </ApproveCardContainer>
            )
          ) || <></>}

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.home_park?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Park style={{ marginRight: '10px' }} />

              <ApproveCard
                date={elm?.hour}
                customerName={elm?.pt?.name}
                user_id={elm?.pt?.id}
                onSessionComment={() => {
                  openSessionComment(elm?.id);
                }}
                onReject={() => {
                  setAppointmentAll(elm)
                  setOpenRejectModal('index');
                }}
                elm={elm}
                type="history"
                rateText={t('rate it')}
                has_comment={elm?.pt?.has_comment}
                onApprove={() => {
                  setAppointmentAll(elm);
                  setAppointment({
                    id: elm?.id,
                    userId: elm?.pt?.id,
                  });
                  dispatch(getSessionComment(elm?.id));

                  setOpenRateModal('index');
                }}
                onStatusChange={(status) => {
                  onStatusChange(status, elm);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}

          {items?.appointment?.[moment(date).format('DD.MM.YYYY')]?.online?.map(
            (elm, i) => (
              <ApproveCardContainer key={i}>
                <Svg.SessionType.Online style={{ marginRight: '10px' }} />

                <ApproveCard
                  date={elm?.hour}
                  customerName={elm?.pt?.name || elm?.dt?.name}
                  user_id={elm?.pt?.id || elm?.dt?.id}
                  elm={elm}
                  onReject={() => {
                    setAppointmentAll(elm)
                    setOpenRejectModal('index');
                  }}
                  type="history"
                  rateText="Puanla"
                  has_comment={elm?.dt?.has_comment}
                  onSessionComment={() => {
                    openSessionComment(elm?.id);
                  }}
                  onApprove={() => {
                    setAppointmentAll(elm);
                    setAppointment({
                      id: elm?.id,
                      userId: elm?.dt?.id || elm?.pt?.id,
                    });
                    dispatch(getSessionComment(elm?.id));

                    setOpenRateModal('index');
                  }}
                  onStatusChange={(status) => {
                    onStatusChange(status, elm);
                  }}
                />
              </ApproveCardContainer>
            )
          ) || <></>}

          {items?.appointment?.[moment(date).format('DD.MM.YYYY')]?.clinic?.map(
            (elm, i) => (
              <ApproveCardContainer key={i}>
                <Svg.SessionType.Clinic style={{ marginRight: '10px' }} />

                <ApproveCard
                  date={elm?.hour}
                  customerName={elm?.dt?.name}
                  user_id={elm?.dt?.id}
                  onSessionComment={() => {
                    openSessionComment(elm?.id);
                  }}
                  onReject={() => {
                    setAppointmentAll(elm)
                    setOpenRejectModal('index');
                  }}
                  elm={elm}
                  type="history"
                  rateText={t('Rate the Dietitian')}
                  has_comment={elm?.dt?.has_comment}
                  onApprove={() => {
                    setAppointmentAll(elm);
                    setAppointment({ id: elm?.id, userId: elm?.dt?.id });
                    dispatch(getSessionComment(elm?.id));

                    setOpenRateModal('index');
                  }}
                  onStatusChange={(status) => {
                    onStatusChange(status, elm);
                  }}
                />
              </ApproveCardContainer>
            )
          ) || <></>}
        </ReservationAccordion>
      );
    } else {
      return <></>;
    }
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
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RateModal
        appointmentAll={appointmentAll}
        appointment_id={appointment?.id}
        descText={t('Want to rate the selected professional?')}
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
