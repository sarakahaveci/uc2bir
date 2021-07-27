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
  ReturnMoneyModal,
  CongratsModal,
} from 'components';
import { device } from 'utils';
import { getUserRejects, transferRefund } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Rejecteds = ({ setRejectCount = () => { } }) => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.userReservation?.rejecteds
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openCongrats, setOpenCongrats] = useState(false);
  const [choosenElm, setChoosenElm] = useState(null);
  const [transactionId, setTransactionId] = useState('null');

  // const items = useSelector(
  //   (state) => state.professionalReservation?.userReservation?.rejecteds
  // );

  const startOfWeeksArr = () => {
    if (items?.date) {
      return Object.keys(items?.date).map(
        (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
      );
    } else {
      return [];
    }
  };

  const handleRefundSuccess = () => {
    dispatch(getUserRejects(moment(selectedDate).format('DD.MM.YYYY')));
  };

  const handleRefund = (type) => {
    dispatch(
      transferRefund(
        { type: type, transaction_id: transactionId },
        handleRefundSuccess
      )
    );
  };

  useEffect(() => {
    if (selectedDate) {
      dispatch(getUserRejects(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getUserRejects());
  }, []);
  useEffect(() => {
    for (const i in items?.date) {
      if (i === moment(selectedDate).format('DD.MM.YYYY')) {
        setRejectCount(items?.date[i]);

      } else {
        setRejectCount(0);
      }
    }
  }, [selectedDate]);

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
              <Svg.SessionType.Gym />
              <ApproveCard
                user_id={elm?.pt?.id}

                status_bs={elm?.status_bs}
                status_pt={elm?.status_pt}
                date={elm?.hour}
                transaction_id={
                  elm?.transaction_id ? elm.transaction_id : null
                }
                customerName={elm?.pt?.name}
                type="rejecteds"
                userType="user"
                onTransfer={() => {
                  setOpenTransfer(true);
                }}
                onApprove={() => {
                  setChoosenElm(elm);
                  setOpenApprove(true);
                }}
                onReject={() => {
                  setChoosenElm(elm);
                  setOpenReject(true);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.home_park?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Park />
              <ApproveCard
                date={elm?.hour}
                status_bs={elm?.status_bs}
                status_pt={elm?.status_pt}
                transaction_id={
                  elm?.transaction_id ? elm.transaction_id : null
                }
                customerName={elm?.pt?.name}
                user_id={elm?.pt?.id}

                type="rejecteds"
                userType="user"
                onTransfer={() => {
                  setOpenTransfer(true);
                }}
                onApprove={() => {
                  setChoosenElm(elm);
                  setOpenApprove(true);
                }}
                onReject={() => {
                  setChoosenElm(elm);
                  setOpenReject(true);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.online?.map((elm, i) => (

            <ApproveCardContainer key={i}>

              <Svg.SessionType.Online />

              <ApproveCard
                date={elm?.hour}
                transaction_id={
                  elm?.transaction_id ? elm.transaction_id : null
                }
                status_bs={elm?.status_bs}
                status_pt={elm?.status_pt}
                status_dt={elm?.status_dt}

                customerName={elm?.pt?.name || elm?.dt?.name}
                user_id={elm?.pt?.id || elm?.dt?.id}

                type="rejecteds"
                userType="user"
                onTransfer={() => {
                  setOpenTransfer(true);
                  setTransactionId(elm?.transaction_id);
                }}
                onApprove={() => {
                  setChoosenElm(elm);
                  setOpenApprove(true);
                }}
                onReject={() => {
                  setChoosenElm(elm);
                  setOpenReject(true);
                }}
              />
            </ApproveCardContainer>
          )) || <></>}

          {items?.appointment?.[
            moment(date).format('DD.MM.YYYY')
          ]?.clinic?.map((elm, i) => (
            <ApproveCardContainer key={i}>
              <Svg.SessionType.Clinic />
              <ApproveCard
                date={elm?.hour}
                status_dt={elm?.status_dt}
                transaction_id={
                  elm?.transaction_id ? elm.transaction_id : null
                }
                customerName={elm?.dt?.name}
                type="rejecteds"
                userType="user"
                onTransfer={() => {
                  setOpenTransfer(true);
                }}
                onApprove={() => {
                  setChoosenElm(elm);
                  setOpenApprove(true);
                }}
                onReject={() => {
                  setChoosenElm(elm);
                  setOpenReject(true);
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
              minDate={new Date()}
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RejectModal
        elm={choosenElm}
        open={openReject}
        reject={() => {
          setOpenReject(false);
        }}
        cancel={() => {
          setOpenReject(false);
        }}
      />
      <ApproveModal
        elm={choosenElm}
        open={openApprove}
        approve={() => {
          setOpenApprove(false);
        }}
        cancel={() => {
          setOpenApprove(false);
        }}
      />
      <ReturnMoneyModal
        open={openTransfer}
        wallet={() => {
          handleRefund('wallet');
          setOpenTransfer(false);
          setOpenCongrats(true);
        }}
        card={() => {
          handleRefund('card');
          setOpenTransfer(false);
          setOpenCongrats(true);
        }}
        closeModal={() => {
          setOpenTransfer(false);
          setOpenCongrats(false);
        }}
      />
      <CongratsModal
        open={openCongrats}
        cancel={() => {
          setOpenCongrats(false);
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
export default Rejecteds;
