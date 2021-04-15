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
const Awaitings = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
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
                  <ApproveCardContainer>
                    <ApproveCard
                      date="18:00 - 19:00"
                      customerName="Ahmet Mehmet"
                      optionalField_1="FITNESS" //Sport Type || NULL
                      optionalField_2={{
                        label: 'EĞİTMEN',
                        value: 'NAZLI GÜMÜŞ',
                      }}
                      optionalField_3={{
                        label: 'SINIF',
                        value: 'B SINIFI',
                        value2: '3/7 KONTENJAN',
                      }}
                      onApprove={() => {
                        setOpenApprove(true);
                      }}
                      onReject={() => {
                        setOpenReject(true);
                      }}
                    />
                  </ApproveCardContainer>
                </ReservationAccordion>
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Park />}
                  title="EV / PARK"
                ></ReservationAccordion>
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Online />}
                  title="ONLİNE"
                ></ReservationAccordion>
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
