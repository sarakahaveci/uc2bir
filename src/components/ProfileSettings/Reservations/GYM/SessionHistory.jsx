import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import { ApproveCard, DatePicker, RateModal, Svg } from 'components';
import { device } from 'utils';
const SessionHistory = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          <AccordionContainer>
            <ReservationAccordion
              defaultOpen={true}
              parent
              title={'DENEME TARİHİ'}
            >
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Gym />}
                title="SPOR ALANI"
                defaultOpen
              >
                <ApproveCardContainer>
                  <ApproveCard
                    type="history"
                    onApprove={() => {
                      setOpenRateModal(true);
                    }}
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
                  />
                </ApproveCardContainer>
                <ApproveCard type="rejecteds" />
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
            <DatePicker inline selected={null} />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RateModal
        descText="Faruk Kale isimli öğrencinizi puanlamak ister misiniz?"
        rateLabel="PUANLA"
        cancelLabel="VAZGEÇ"
        open={openRateModal}
        rate={() => {
          setOpenRateModal(false);
        }}
        cancel={() => {
          setOpenRateModal(false);
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
export default SessionHistory;
