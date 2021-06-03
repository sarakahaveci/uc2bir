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
import { getGymRejects } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const Rejecteds = () => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.gymReservation?.rejecteds
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [choosenElm, setChoosenElm] = useState(null);
 
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    setSelectedDate(new Date());
    dispatch(getGymRejects());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getGymRejects(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
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
                title="EĞİTMEN İLE"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.with_pt?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      type="rejecteds"
                      date={elm?.hour}
                      status_bs={elm?.status_bs}
                      status_pt={elm?.status_pt}
                      customerName={elm?.student}
                      optionalField_1={elm?.branch} //Sport Type || NULL
                      optionalField_2={{
                        label: 'EĞİTMEN',
                        value: elm?.pt?.name,
                      }}
                      optionalField_3={{
                        label: 'SINIF',
                        value: elm?.class,
                        value2: elm?.class_total_appointment + '/' + elm?.class_capacity,

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
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Gym />}
                title="EĞİTMENSİZ"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.without_pt?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      type="rejecteds"
                      date={elm?.hour}
                      status_bs={elm?.status_bs}
                      status_pt={elm?.status_pt}
                      customerName={elm?.student}
                      optionalField_1={elm?.branch} //Sport Type || NULL
                 
                      optionalField_3={{
                        label: 'SINIF',
                        value: elm?.class,
                        value2: elm?.class_total_appointment + '/' + elm?.class_capacity,

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
            <DatePicker minDate={new Date()} inline selected={null} />
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
