import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import {Box, DatePicker, Material, ReservationHourButton, Span, Title } from '../../../index';
import styled from 'styled-components/macro';
import { AVAILABLE_HOURS, branchData, sessionData, salonData} from '../../../../constants';
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
      {activePage ==='create' ?(
        <Row>
            <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={6}>
              <Title
                style={{ display: 'flex', flexWrap: 'nowrap' }}
                textAlign="left">
                <Span
                  cursor="pointer"
                  fontSize="1.5rem"
                  onClick={() => setActivePage('showAvailableHour')}
                  marginRight="10px"
                  marginBottom="-15px">
                  {`<`}
                </Span>
                <Span>Rezervasyon Oluştur</Span>
              </Title>

              <AppointmentContainer>
                <Material.TextField
                  name="appointmentDate"
                  forHtml="appointmentDate"
                  label="Tarih & Saat Seçiniz"
                  defaultValue="21 Kasım Çarşamba, 10:00 - 11:00"
                  disabled={true}
                />
                <Material.select
                  style={{marginTop:'14px'}}
                  multiple={true}
                  required
                  name="branch"
                  forHtml="branch"
                  label="Branşları Seçiniz"
                  defaultValueMultiple={sessionData}
                  items={branchData}
                />

                <Material.select
                  style={{marginTop:'14px'}}
                  multiple={true}
                  required
                  name="sessionType"
                  forHtml="sessionType"
                  label="Oturum Türlerini Seçiniz"
                  items={sessionData}
                />

                <Material.select
                  style={{marginTop:'14px'}}
                  multiple={true}
                  required
                  name="sessionType"
                  forHtml="sessionType"
                  label="Salon Ekleyin"
                  items={salonData}
                />

                <Material.select
                  style={{marginTop:'14px'}}
                  multiple={true}
                  required
                  name="sessionType"
                  forHtml="sessionType"
                  label="Ev/Park Ekleyin"
                  items={sessionData}
                />

              </AppointmentContainer>

            </Col>

          <Col style={{ display: 'flex', justifyContent: 'center'}}
               xs={{ order: IsSmallScreen ? 1 : 2 }}
               lg={6}>
            <DateContainer>
            </DateContainer>
          </Col>
        </Row>
      ):(
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
                        onClick={() => setActivePage('create')}
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
      )}

    </Container>
  );
};

const DateContainer = styled.div`
  width: 100%;
`;
const AccordionContainer = styled.div`
  display: flex;
`;

const AppointmentContainer = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-left: 25px;
  .materials {
    margin-bottom: 15px;
    
    label{
      font-size: 15px !important;
    }
  }
  .material-title {
    letter-spacing: 0;
  }
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
