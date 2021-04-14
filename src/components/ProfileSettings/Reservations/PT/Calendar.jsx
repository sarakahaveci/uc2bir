import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import { Box, DatePicker, ReservationHourButton, Span } from '../../../index';
import styled from 'styled-components/macro';
import { AVAILABLE_HOURS } from '../../../../constants';
import { device } from '../../../../utils';

const Calendar = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [activePage, setActivePage] = useState('index');
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);
  let data = ['dsd', 'ds'];
  return(
    <Container>
      <Row>
        {activePage==='index' && (
          <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
            {data.map((elm, index) => (
              <AccordionContainer key={index}>
                <ReservationAccordion
                  defaultOpen={index === 0}
                  parent
                  title={24+index+' OCAK ÇARŞAMBA'}>
                  <Box row flexWrap="wrap" center>
                    {AVAILABLE_HOURS.map((item,index) => (
                      <ReservationHourButton
                        text={item}
                        className="blue"
                        width="342px"
                        height="52px"
                        mt="15px"
                        key={index}
                      />
                    ))}

                    <Button onClick={()=>setActivePage('showAvailableHour')}>Boş Saatlerimi Gör</Button>

                  </Box>
                </ReservationAccordion>
              </AccordionContainer>
            ))}
          </Col>)}

        {activePage==='showAvailableHour' && (
          <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
              <AccordionContainer >
                <Span
                  cursor="pointer"
                  fontSize="1.5rem"
                  onClick={() => setActivePage('index')}
                  marginRight="10px"
                  marginTop="10px">
                  {`<`}
                </Span>
                <ReservationAccordion
                  defaultOpen={true}
                  parent
                  title={'24 OCAK ÇARŞAMBA'}>
                  <Box row flexWrap="wrap" center>
                    {AVAILABLE_HOURS.map((item,index) => (
                      <ReservationHourButton
                        text={item}
                        className="blue"
                        width="342px"
                        height="52px"
                        mt="15px"
                        key={index}
                        isAvailableHour={true}
                      />
                    ))}

                  </Box>
                </ReservationAccordion>
              </AccordionContainer>

          </Col>)}

        <Col style={{ display: 'flex', justifyContent: 'center'}}
          xs={{ order: IsSmallScreen ? 1 : 2 }}
          lg={4}>
          <DateContainer>
            <DatePicker minDate={new Date()} inline selected={null} />
          </DateContainer>
        </Col>
      </Row>
    </Container>
  );;
};

const DateContainer = styled.div`
  width: 100%;
`;
const AccordionContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 210px;
  height: 32px;
  background: #f77e0b;
  color: white;
  border-radius: 20px;
  margin-right: 80px;
  margin-left: 80px;
  font-size: 14px;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;

export default Calendar;
