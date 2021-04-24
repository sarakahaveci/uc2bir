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
import { getPtAwaitings } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
const Awaitings = () => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.ptReservation
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [selectedDate, setSelectedDate] = useState('26.04.2021');

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    dispatch(getPtAwaitings(selectedDate));
  }, []);

  let data = ['dsd', 'ds'];
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          {data.map((elm, index) => (
            <AccordionContainer key={index}>
              <Number>{index + 1}.</Number>
              <ReservationAccordion
                defaultOpen={index == 0 ? true : false}
                parent
                title="24 OCAK ÇARŞAMBA"
              >
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Gym />}
                  title="SPOR ALANI"
                  defaultOpen
                >
                  <>
                    {items?.appointment?.[selectedDate]?.gym?.map((elm, i) => (
                      <ApproveCardContainer key={i}>
                        <ApproveCard
                          date="16:00 - 18:00"
                          customerName="Ali Veli"
                          optionalField_1="FİTNESS"
                          optionalField_2={{
                            label: 'SALON',
                            value: 'ŞAVKAR ARENA',
                          }}
                          optionalField_3={{
                            value: '1020 sokak no 56 Mardin Midyat',
                          }}
                          onApprove={() => {
                            setOpenApprove(true);
                          }}
                          onReject={() => {
                            setOpenReject(true);
                          }}
                        />
                      </ApproveCardContainer>
                    ))}
                  </>
                </ReservationAccordion>
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Park />}
                  title="EV / PARK"
                >
                  {items?.appointment?.[selectedDate]?.home_place?.map(
                    (elm, i) => (
                      <ApproveCardContainer key={i}>
                        <ApproveCard
                          date="16:00 - 18:00"
                          customerName="Ali Veli"
                          optionalField_1="FİTNESS"
                          optionalField_2={{
                            label: 'SALON',
                            value: 'ŞAVKAR ARENA',
                          }}
                          optionalField_3={{
                            value: '1020 sokak no 56 Mardin Midyat',
                          }}
                          onApprove={() => {
                            setOpenApprove(true);
                          }}
                          onReject={() => {
                            setOpenReject(true);
                          }}
                        />
                      </ApproveCardContainer>
                    )
                  )}
                </ReservationAccordion>
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Online />}
                  title="ONLİNE"
                >
                  {items?.appointment?.[selectedDate]?.online?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        date="16:00 - 18:00"
                        customerName="Ali Veli"
                        optionalField_1="FİTNESS"
                        optionalField_2={{
                          label: 'SALON',
                          value: 'ŞAVKAR ARENA',
                        }}
                        optionalField_3={{
                          value: '1020 sokak no 56 Mardin Midyat',
                        }}
                        onApprove={() => {
                          setOpenApprove(true);
                        }}
                        onReject={() => {
                          setOpenReject(true);
                        }}
                      />
                    </ApproveCardContainer>
                  ))}
                </ReservationAccordion>
              </ReservationAccordion>
            </AccordionContainer>
          ))}
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
        headerText="Rezervasyonu reddetmek istediğinize emin misiniz?"
        descText="24 Kasım Çarşamba, saat 16:00 - 17:00 için gelen rezervasyon talebiniz reddedilecektir."
        cancelLabel="VAZGEÇ"
        rejectLabel="REDDET"
        open={openReject}
        reject={() => {
          setOpenReject(false);
        }}
        cancel={() => {
          setOpenReject(false);
        }}
      />
      <ApproveModal
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
  margin: 20px 0;
  @media ${device.sm} {
    margin: 0;
  }
`;
const Number = styled.text`
  font-size: 16px;
  margin: 15px;
  @media ${device.sm} {
    display: none;
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
