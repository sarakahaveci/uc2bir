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
import { device } from 'utils';
import { getPtRejects } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Rejecteds = () => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.ptReservation?.rejecteds
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [choosenElm, setChoosenElm] = useState(null);
  const [selectedDate, setSelectedDate] = useState(undefined);
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
    if (selectedDate) {
      dispatch(getPtRejects(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getPtRejects());
  }, []);
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
                status_bs={elm?.status_bs}
                status_st={elm?.status_st}
                date={elm?.hour}
                customerName={elm?.student}
                type="rejecteds"
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
              <Svg.SessionType.Park style={{ marginRight: '10px' }} />
              <ApproveCard
                date={elm?.hour}
                customerName={elm?.student}
                status_bs={elm?.status_bs}
                status_st={elm?.status_st}
                type="rejecteds"
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
              <Svg.SessionType.Online style={{ marginRight: '10px' }} />
              <ApproveCard
                date={elm?.hour}
                status_bs={elm?.status_bs}
                status_st={elm?.status_st}
                customerName={elm?.student}
                type="rejecteds"
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
export default Rejecteds;
