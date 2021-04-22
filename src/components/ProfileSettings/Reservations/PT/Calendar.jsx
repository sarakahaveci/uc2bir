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
import { branchData, sessionData, salonData} from '../../../../constants';
import { device } from '../../../../utils';
import image from '../../../../assets/wave-background.png';
import Svg from '../../../statics/svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTemplateFromCalender,
  getDayOfCalendar,
  deleteHourOfCalendar,
} from '../../../../actions';
import moment from 'moment';
import 'moment/locale/tr';
import { toast } from 'react-toastify';

moment.locale('tr')

const Calendar = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [activePage, setActivePage] = useState('index');
  const [openApprove, setOpenApprove] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState();
  const dispatch = useDispatch();
  const {
    availableDates: { data: availableDates },
    availableHours: { data: availableHours },
  } = useSelector((state) => state.profileSettings2.reservationTemplate);

  useEffect(() => {
    dispatch(getTemplateFromCalender());
    setStartDate(new Date());
  }, []);

  useEffect(() => {
    dispatch(getDayOfCalendar(moment(startDate).format('DD.MM.YYYY')));
  }, [startDate]);


  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);

  const handleSelect = (date) => {
    setStartDate(date);
  };

  const startOfWeeksArr = availableDates?.map((date) =>
    new Date(moment(date, 'DD.MM.YYYY').toDate())
  );

  const deleteHourSuccess = () =>{
    dispatch(getDayOfCalendar(moment(startDate).format('DD.MM.YYYY')));
    setActivePage('index')
    toast.success('Saat Silme İşlemi Başarılı Bir Şekilde Tamamlanmıştır', {
      position: 'bottom-right',
      autoClose: 3000,
    });

  }

  const deleteHourFail = () =>{
    toast.error(
      'Seçilen Saat Silinirken Hata Oluştu Hata Oluştu',
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
  }

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
                  <ReservationAccordion title="Rezervasyon Tarihi" accordionBackground={'#FFFFFF'} accordionRadius={'20px'}>
                    <hr style={{marginTop:'0px'}}/>
                    <Row style={{padding:'10px'}}>
                      <Col lg={2}>
                        <Text color="dark" fontWeight="500" fontSize="0.9rem">
                          1 Ders
                        </Text>

                      </Col>
                      <Col lg={1}>
                        <Seperator/>
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
                  </ReservationAccordion>
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
                <AccordionContainer>
                  <ReservationAccordion
                    defaultOpen={true}
                    parent
                    title={moment(startDate).format('DD MMMM dddd')}>
                    <Box row flexWrap="wrap" center>
                      {availableHours?.map((item,index) => ( item.id &&
                        <ReservationHourButton
                          onClick={()=> {
                            setActivePage('showHourDetail');
                            setSelectedHour(item)
                          }}
                          text={item.hour}
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
                  title={moment(startDate).format('DD MMMM dddd')+' / BOŞ SAATLERİM'}>
                  <Box row flexWrap="wrap" center>
                    {availableHours?.map((item,index) => ( !item.id &&
                      <ReservationHourButton
                        text={item.hour}
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

          {activePage==='showHourDetail' && (
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
                  title={moment(startDate).format('DD MMMM dddd') +' / ' + selectedHour?.hour}>
                 <HourDetailContainer>
                   <Box>
                     <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                       Branşlar:
                     </Span>
                     <Span fontSize={'18px'}>
                        {selectedHour?.branch.toUpperCase()}
                      </Span>
                   </Box>

                   <Box>
                     <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                       Oturum Türleri:
                     </Span>
                     <Span fontSize={'18px'}>
                          {selectedHour?.session.toUpperCase()}
                     </Span>
                     <Seperator/>
                   </Box>

                   <Box>
                     <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                       Seçilmiş Yerler:
                     </Span>
                     <Span fontSize={'18px'}>
                          Fitness
                       </Span>
                     <Seperator/>
                   </Box>

                   <hr/>
                   <Row  style={{display:'flex', justifyContent:'flex-end'}}>
                     <Button disableborder text={'Sil'} width={'120px'} height={'35px'} onClick={()=>dispatch(
                       deleteHourOfCalendar(
                         selectedHour?.id,
                         deleteHourSuccess,
                         deleteHourFail
                       ))}/>
                   </Row>
                 </HourDetailContainer>
                </ReservationAccordion>
              </AccordionContainer>
            </Col>)}

          <Col style={{ display: 'flex', justifyContent: 'center'}}
                 xs={{ order: IsSmallScreen ? 1 : 2 }}
                 lg={4}>
              <DateContainer>
                <DatePicker
                   selected={startDate}
                   onSelect={handleSelect}
                   selectsRange
                   inline
                   highlightDates={[
                     {
                       'react-datepicker__day--highlighted': startOfWeeksArr,
                     },
                   ]}
                   minDate={new Date()} />
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


const HourDetailContainer = styled.div`
  background-color: #F8F8F8;
  border-radius: 10px;
  padding: 20px;
`;

const AppointmentDate = styled.div`
  background: #FFFFFF;
  border: 2px solid #C6C6C6;
  border-radius: 20px;
  margin: 17px;
  padding-left: 15px;
  padding-right: 15px;
  flex-direction: column;
  @media ${device.sm}  {
    height: 95px;
    width: 290px;
  }
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

const Seperator = styled.div`
  display: flex;
  width: 1px;
  height: 60%;
  margin-top: 6px;
  background-color: rgba(197, 196, 196, 0.5);
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
  margin-top: 5px;
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
