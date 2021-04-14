import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import { ApproveCard, DatePicker } from 'components';

const Awaitings = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);
  let data = ['dsd', 'ds'];
  return (
    <Container>
      <Row>
        <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          {data.map((elm, index) => (
            <AccordionContainer key={index}>
              <Number>{index + 1}.</Number>
              <ReservationAccordion
                defaultOpen={index == 0 ? true : false}
                parent
                title="24 OCAK ÇARŞAMBA"
              >
                <ReservationAccordion title="SPOR ALANI">
                  <ApproveCardContainer>
                    <ApproveCard />
                  </ApproveCardContainer>
                  <ApproveCard />
                </ReservationAccordion>
                <ReservationAccordion title="EV / PARK"></ReservationAccordion>
                <ReservationAccordion title="ONLİNE"></ReservationAccordion>
              </ReservationAccordion>
            </AccordionContainer>
          ))}
        </Col>
        <Col
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
        </Col>
      </Row>
    </Container>
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
`;
const Number = styled.text`
  font-size: 16px;
  margin: 15px;
`;
export default Awaitings;
