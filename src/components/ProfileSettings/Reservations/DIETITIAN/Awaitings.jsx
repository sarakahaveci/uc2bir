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
import { useSelector, useDispatch } from 'react-redux';
import { getDtAwaitings, DtAwaitingApprove, DtAwaitingReject } from 'actions';
import moment from 'moment';

const Awaitings = ({ setAwaitingCount }) => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.dtReservation?.awaitings
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
        setAwaitingCount(items?.date[i]);
      } else {
        setAwaitingCount(0);
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    setSelectedDate(new Date());
    dispatch(getDtAwaitings());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getDtAwaitings(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getDtAwaitings(moment(selectedDate).format('DD.MM.YYYY')));
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
                miniIcon={<Svg.SessionType.Clinic />}
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
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
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
                      date={elm?.hour}
                      customerName={elm?.student}
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
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>
            </ReservationAccordion>
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
          dispatch(DtAwaitingReject(id, status, getSelectedDate));
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
          dispatch(DtAwaitingApprove(id, getSelectedDate));
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
