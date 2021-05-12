import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import {
  ApproveCard,
  DatePicker,
  RejectModal,
  ApproveModal,
  Svg,
} from 'components';
import moment from 'moment';

import { device } from 'utils';
import {
  getUserAwaitings,
  UserAwaitingApprove,
  UserAwaitingReject,
} from 'actions';
import { useDispatch, useSelector } from 'react-redux';
const Awaitings = () => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.userReservation?.awaitings
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(undefined);
  const [openReject, setOpenReject] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    setSelectedDate(new Date());
    dispatch(getUserAwaitings());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getUserAwaitings(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getUserAwaitings(moment(selectedDate).format('DD.MM.YYYY')));
  }
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          <AccordionContainer>
            <ReservationAccordion
              defaultOpen={true}
              parent
              title={moment(selectedDate).format('DD.MM.YYYY')}
            >
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Gym />}
                title="SPOR ALANI"
                defaultOpen
              >
                <>
                  {items?.appointment?.[
                    moment(selectedDate).format('DD.MM.YYYY')
                  ]?.gym?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        cardType="userCard"
                        date={elm?.hour}
                        customerName={elm?.student}
                        optionalField_1={elm?.branch}
                        optionalField_2={{
                          label: 'SALON',
                          value: elm?.bs?.name,
                        }}
                        optionalField_3={{
                          value:
                            elm?.town + '  ' + elm?.district + ' ' + elm?.city,
                        }}
                        onApprove={() => {
                          setOpenApprove(elm?.id);
                        }}
                        onReject={() => {
                          setOpenReject(elm?.id);
                        }}
                      />
                    </ApproveCardContainer>
                  ))}
                </>
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Park />}
                title="EV / PARK"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.home_place?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      date={elm?.hour}
                      customerName={elm?.student}
                      optionalField_1={elm?.branch}
                      cardType="userCard"
                      optionalField_2={{
                        label: 'SALON',
                        value: 'ŞAVKAR ARENA',
                      }}
                      optionalField_3={{
                        value: '1020 sokak no 56 Mardin Midyat',
                      }}
                      onApprove={() => {
                        //setOpenApprove(elm.id);
                      }}
                      onReject={() => {
                        setOpenReject(elm.id);
                      }}
                    />
                  </ApproveCardContainer>
                ))}
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Online />}
                title="ONLİNE"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.online?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      cardType="userCard"
                      date={elm?.hour}
                      customerName={elm?.pt?.name ? elm?.pt?.name : elm?.student}
                      optionalField_1={elm?.branch} 
                      onApprove={() => {
                        setOpenApprove(elm?.id);
                      }}
                      onReject={() => {
                        setOpenReject(elm?.id);
                      }}
                    />
                  </ApproveCardContainer>
                ))}
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Park />}
                title="KLİNİK"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.clinic?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      date={elm?.hour}
                      customerName={elm?.student}
                      optionalField_1={elm?.branch}
                      cardType="userCard"
                      optionalField_2={{
                        label: 'KLİNİK',
                        value: elm?.address_title,
                      }}
                      optionalField_3={{
                        value: elm?.address_detail,
                      }}
                      onApprove={() => {
                        //setOpenApprove(elm.id);
                      }}
                      onReject={() => {
                        setOpenReject(elm.id);
                      }}
                    />
                  </ApproveCardContainer>
                ))}
              </ReservationAccordion>
            </ReservationAccordion>
          </AccordionContainer>
          {!(startOfWeeksArr().length > 0) && (
            <text>Bu tarihe ilişkin veri bulunamadı</text>
          )}
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
              minDate={new Date()}
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RejectModal
        headerText="Rezervasyonu reddetmek istediğinize emin misiniz?"
        descText="24 Kasım Çarşamba, saat 16:00 - 17:00 için gelen rezervasyon talebiniz reddedilecektir."
        cancelLabel="VAZGEÇ"
        rejectLabel="REDDET"
        open={openReject}
        reject={(id, status) => {
          dispatch(UserAwaitingReject(id, status, getSelectedDate));
          setOpenReject(undefined);
        }}
        cancel={() => {
          setOpenReject(undefined);
        }}
      />
      <ApproveModal
        open={openApprove}
        approve={(id) => {
          setOpenApprove(undefined);
          dispatch(UserAwaitingApprove(id, getSelectedDate));
        }}
        cancel={() => {
          setOpenApprove(undefined);
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
export default Awaitings;
