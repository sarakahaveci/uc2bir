import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import {
  Box,
  DatePicker,
  Material,
  ReservationHourButton,
  Span,
  Title,
  Button,
  Text,
  ApproveModal,
} from '../../../index';
import styled from 'styled-components/macro';
import { AVAILABLE_HOURS, branchData, sessionData, salonData} from '../../../../constants';
import { device } from '../../../../utils';
import image from '../../../../assets/wave-background.png';
import Svg from '../../../statics/svg';

const Calendar = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [activePage, setActivePage] = useState('index');
  const [openApprove, setOpenApprove] = useState(false);
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
      <ApproveModal
        open={openApprove}
        approve={() => {
          setOpenApprove(false);
        }}
        cancel={() => {
          setOpenApprove(false);
        }}
      />
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
              <AppointmentDate>
                <Row>
                  <Col lg={11}>
                    <Title textAlign={'left'} >Rezervasyon Tarihi</Title>
                  </Col>

                  <Col lg={1}>
                    <ArrowDown/>
                  </Col>

                </Row>
                  <hr/>
                <Row >
                  <Col lg={2}>
                      <Text color="dark" fontWeight="500" fontSize="0.9rem">
                       1 Ders
                      </Text>

                  </Col>
                  <Col lg={1}>
                    <Text color="#707070" fontWeight="200" >
                      |
                    </Text>
                  </Col>
                  <Col lg={8}>
                    <ReservationText>
                      <Calender/>
                      <Text color="#707070" fontWeight="200" >
                        21 Kasım Çarşamba Saat 10:00 - 11:00
                      </Text>
                    </ReservationText>
                  </Col>
                  <Col lg={1}>
                    <Trash/>
                  </Col>

                </Row>

              </AppointmentDate>

              <AcceptButton src={image}>
                <Button
                  onClick={()=>setOpenApprove(true)}
                  text="Tamamla"
                  className="blue"
                  width={'496px'}
                  height={'66px'}
                />

              </AcceptButton>

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

                      <AvailableButton onClick={()=>setActivePage('showAvailableHour')}>Boş Saatlerimi Gör</AvailableButton>

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
  width: 586px;
  height: 326px;
  background: #F8F8F8;
  border-radius: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  @media ${device.sm}  {
    height: 190px;
    width: 310px;
  }
`;

const AppointmentDate = styled.div`
  width: 552px;
  height: 138px;
  background: #FFFFFF;
  border: 2px solid #C6C6C6;
  border-radius: 20px;
  margin: 17px;
  padding: 25px;
  flex-direction: column;
  @media ${device.sm}  {
    height: 95px;
    width: 290px;
  }
`;

const ArrowDown = styled(Svg.ArrowDownIcon)`
  fill: #00B2A9;
`;

const ReservationText = styled.div`
  display: flex;
  flex-direction: row;
`;

const AcceptButton = styled.div`
  width: 586px;
  height: 135px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #FFFFFF;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  @media ${device.sm}  {
    height: 95px;
    width: 310px;
  }
`;


const AccordionContainer = styled.div`
  display: flex;
`;

const AppointmentContainer = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-left: 25px;
  min-height: 400px;


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

const AvailableButton = styled.button`
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

const Calender = styled(Svg.CalendarIcon)`
  margin-top: 3px;
  margin-right: 5px;
`;

const Trash = styled(Svg.TrashIcon)`
  margin-top: 3px;
`;


export default Calendar;
