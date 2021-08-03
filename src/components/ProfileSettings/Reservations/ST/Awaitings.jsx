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
const Awaitings = ({ setAwaitingCount }) => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.userReservation?.awaitings
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(undefined);
  const [openReject, setOpenReject] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [choosenElm, setChoosenElm] = useState(null);

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
    for (const i in items?.date) {
      if (i === moment(selectedDate).format('DD.MM.YYYY')) {
        setAwaitingCount(items?.date[i])
      } else {
        setAwaitingCount(0)
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
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
        ]?.gym?.map((elm, i) => (
          <ApproveCardContainer key={i}>
            <Svg.SessionType.Gym style={{ marginRight: '10px' }} />

            <ApproveCard
              cardType="userCard"
              date={elm?.hour}
              user_id={elm?.pt?.id}
              customerName={elm?.pt?.name}

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
                setChoosenElm(elm);
                setOpenApprove(elm?.id);
              }}
              onReject={() => {
                setChoosenElm(elm);
                setOpenReject(elm?.id);
              }}
            />
          </ApproveCardContainer>
        )) || <></>}


        {items?.appointment?.[
          moment(date).format('DD.MM.YYYY')
        ]?.home_park?.map((elm, i) => (

          <ApproveCardContainer key={i}>
            <Svg.SessionType.Park style={{ marginRight: '10px' }} />

            <ApproveCard
              date={elm?.hour}
              user_id={elm?.student_id}

              customerName={elm?.student}
              optionalField_1={elm?.branch}
              cardType="userCard"
              optionalField_2={{
                label: 'YER',
                value: elm?.district,
              }}
              optionalField_3={{
                value: elm?.address_detail
              }}
              onApprove={() => {
                //setOpenApprove(elm.id);
              }}
              onReject={() => {
                setChoosenElm(elm);
                setOpenReject(elm.id);
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
              cardType="userCard"
              date={elm?.hour}
              user_id={elm?.pt?.id || elm?.dt?.id}

              customerName={elm?.pt?.name ? elm?.pt?.name : elm?.dt?.name}
              optionalField_1={elm?.branch}
              onApprove={() => {
                setChoosenElm(elm);
                setOpenApprove(elm?.id);
              }}
              onReject={() => {
                setChoosenElm(elm);
                setOpenReject(elm?.id);
              }}
            />
          </ApproveCardContainer>
        )) || <></>}

        {items?.appointment?.[
          moment(date).format('DD.MM.YYYY')
        ]?.clinic?.map((elm, i) => (
          <ApproveCardContainer key={i}>
            <Svg.SessionType.Clinic style={{ marginRight: '10px' }} />

            <ApproveCard
              date={elm?.hour}
              user_id={elm?.dt?.id}

              customerName={elm?.dt?.name}
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
                setChoosenElm(elm);
                setOpenReject(elm.id);
              }}
            />
          </ApproveCardContainer>
        )) || <></>}
      </ReservationAccordion>
    )}else{
      return(<></>)
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
              minDate={new Date()}
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RejectModal
        elm={choosenElm}
        headerText="Rezervasyonu reddetmek istediğinize emin misiniz?"
        descText=""
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
        elm={choosenElm}
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
export default Awaitings;
