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
import { device } from '../../../../utils';
import image from '../../../../assets/wave-background.png';
import Svg from '../../../statics/svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTemplateFromCalender,
  getDayOfCalendar,
  deleteHourOfCalendar,
  getMyBranches,
  getGymList,
  getPtWorkingHomePlace,
  getSessionTypes,
  applyHourOfCalendar,
  getDayDetailOfCalendar,
  getMyClassifications,
  getDietitianClinics,
} from '../../../../actions';
import moment from 'moment';
import 'moment/locale/tr';
import { toast } from 'react-toastify';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { DIETITIAN, PERSONAL_TRAINER, SESSION_KEYS, WORK_PLACE } from 'constants/index';

moment.locale('tr')

const Calendar = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [activePage, setActivePage] = useState('index');
  const [openApprove, setOpenApprove] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState();
  const [branchSelection, setBranchSelection] = useState([]);
  const [classSelection, setClassSelection] = useState([]);
  const [sessionSelection, setSessionSelection] = useState([]);
  const [workPlaceSelection, setWorkPlaceSelection] = useState([]);
  const [locationSelection, setLocationSelection] = useState([]);

  const dispatch = useDispatch();
  const {
    availableDates: { data: availableDates },
    availableHours: { data: availableHours },
    detailHour: { data: detailHour },
  } = useSelector((state) => state.profileSettings2.reservationTemplate);
  const { type_id: userTypeId } = useSelector((state) => state.auth.user);

  const { data: myBranches } = useSelector(
    (state) => state.profileSettings2.profileBranches.myBranches
  );

  const { clinics } = useSelector((state) => state.userProfile.dietitianClinic);

  const {
    ptHomePlace: { data: ptHomePlace },
    classifications: { data: classifications },
  } = useSelector((state) => state.userProfile.workPlace);

  const {
    get: sessionTypes,
    gymList: { data: gymList },
  } = useSelector((state) => state.profileSettings2.sessionType);



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

  useEffect(() => {
    if (userTypeId !== WORK_PLACE) {
      dispatch(getSessionTypes());
    }
    if (userTypeId === DIETITIAN) {
      dispatch(getDietitianClinics());
    }
    if (userTypeId === PERSONAL_TRAINER) {
      dispatch(getMyBranches());
      dispatch(getGymList());
      dispatch(getPtWorkingHomePlace());
    }
    if (userTypeId === WORK_PLACE) {
      dispatch(getMyClassifications());
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

  const addHourSuccess = () =>{
    dispatch(getDayOfCalendar(moment(startDate).format('DD.MM.YYYY')));
    setActivePage('index')
    toast.success('Saat Ekleme İşlemi Başarılı Bir Şekilde Tamamlanmıştır', {
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

  const showSessionDependentInputs = (sessionType) =>
    sessionSelection.findIndex((session) => session.type === sessionType) !==
    -1;

  const sessionTypeArr = userTypeId ===WORK_PLACE ?({location:classSelection}) : sessionSelection.map((session) => ({ session,
    ...(session.type !== 'online' && {
      location:
        session.type === 'gym' ? classSelection : session.type === 'clinic'
          ? workPlaceSelection
          : locationSelection,
    }),
  }));


  const addHourToCalender = ()=>{
    dispatch(applyHourOfCalendar(startDate,sessionTypeArr,branchSelection,selectedHour.hour,addHourSuccess))
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
                  label="Tarih & Saat"
                  defaultValue={moment(startDate).format('DD MMMM dddd')+","+selectedHour?.hour}
                  disabled={true}
                />

                {userTypeId === PERSONAL_TRAINER && (
                <FormControl>
                  <InputLabel>Branşları Seçiniz</InputLabel>

                  <Select
                    multiple
                    value={branchSelection}
                    input={<Input />}
                    onChange={(e) => setBranchSelection(e.target.value)}
                  >
                    {myBranches.map((branch) => (
                      <MenuItem key={branch.id} value={branch}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                )}
                {userTypeId === WORK_PLACE && (
                  <FormControl>
                    <InputLabel>Sınıfları Seçiniz</InputLabel>
                    <Select
                      multiple
                      value={classSelection}
                      input={<Input />}
                      onChange={(e) => setClassSelection(e.target.value)}>
                      {classifications?.map((classification) => (
                        <MenuItem key={classification.id} value={classification}>
                          {classification.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {userTypeId !== WORK_PLACE && (
                  <FormControl>
                    <InputLabel>Oturum Türlerini Seçiniz</InputLabel>

                    <Select
                      multiple
                      value={sessionSelection}
                      input={<Input />}
                      onChange={(e) => setSessionSelection(e.target.value)}>
                      {sessionTypes?.data?.data?.map((sessionType) => (
                        <MenuItem key={sessionType.id} value={sessionType}>
                          {sessionType.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {showSessionDependentInputs('gym') && (
                  <FormControl>
                    <InputLabel>Spor Alanı Seçiniz</InputLabel>

                    <Select
                      multiple
                      value={workPlaceSelection}
                      input={<Input />}
                      onChange={(e) => setWorkPlaceSelection(e.target.value)}
                    >
                      {gymList?.gym?.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {showSessionDependentInputs('clinic') && (
                  <FormControl>
                    <InputLabel>Klinik Seçiniz</InputLabel>

                    <Select
                      multiple
                      value={workPlaceSelection}
                      input={<Input />}
                      onChange={(e) => setWorkPlaceSelection(e.target.value)}
                    >
                      {clinics?.clinic?.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {showSessionDependentInputs('home_park') && (
                  <FormControl>
                    <InputLabel>Ev / Park Seçiniz</InputLabel>

                    <Select
                      multiple
                      value={locationSelection}
                      input={<Input />}
                      onChange={(e) => setLocationSelection(e.target.value)}
                    >
                      {ptHomePlace?.home_park?.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

              </AppointmentContainer>
            </Col>

          <Col style={{ display: 'flex', justifyContent: 'center'}}
               xs={{ order: IsSmallScreen ? 1 : 2 }}
               lg={6}>
            <DateContainer>
              <AppointmentDate>
                <Row>
                  <ReservationAccordion
                    defaultOpen={true}
                    title="Rezervasyon Tarihi"
                    accordionBackground={'#ffffff'}
                    accordionRadius={'20px'}>
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
                            {moment(startDate).format('DD MMMM dddd') + ' Saat '+ selectedHour?.hour}
                          </Text>
                        </ReservationText>
                      </Col>
                      <Col lg={1}/>

                    </Row>
                  </ReservationAccordion>
                </Row>
              </AppointmentDate>
              <AcceptButton src={image}>
                <Button
                  onClick={()=>addHourToCalender()}
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
                            setSelectedHour(item);
                            setActivePage(item.type!=='group' ? 'showHourDetail':'showHourGroup');
                            dispatch(getDayDetailOfCalendar(item.id))
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
                        onClick={() => {
                          setSelectedHour(item);
                          setActivePage('create');
                        }}
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
                   {userTypeId=== PERSONAL_TRAINER &&
                   <Box>
                     <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                       Branşlar:
                     </Span>
                     <Span fontSize={'18px'}>
                        {selectedHour?.branch}
                      </Span>
                   </Box>}


                   <Box>
                     <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                       Oturum Türleri:
                     </Span>
                     {detailHour?.slice?.[0]?.session?.split(',').map((item, index)=>(
                       <Span fontSize={'18px'} key={index}>
                         {SESSION_KEYS[item.replace(/\s+/g, '')] }
                         {(selectedHour?.session?.split(',').length !== index+1) ? ', ' : ''}
                       </Span>))}
                     <Seperator/>
                   </Box>


                   <Box>
                     <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                       Seçilmiş Yerler:
                     </Span>
                     <Span fontSize={'18px'}>
                       {detailHour?.slice?.[0]?.location?.gym?.map((item, index)=>(
                         <Span fontSize={'18px'} key={index}>
                           {item + ' '}
                         </Span>))}
                       {detailHour?.slice?.[0]?.location?.home_park?.map((item, index)=>(
                         <Span fontSize={'18px'} key={index}>
                           {item}
                         </Span>))}
                       {detailHour?.slice?.[0]?.location?.clinic?.map((item, index)=>(
                         <Span fontSize={'18px'} key={index}>
                           {item }
                           {detailHour?.slice?.[0]?.location?.clinic?.length !== index+1 ? ', ': ''}
                         </Span>))}
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

          {activePage==='showHourGroup' && (
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
                    {userTypeId=== PERSONAL_TRAINER &&
                    <Box>
                      <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                        Branş:
                      </Span>
                      <Span fontSize={'18px'}>
                        {selectedHour?.branch}
                      </Span>
                    </Box>}



                    <Box row style={{justifyContent:'space-between'}}>
                      <Span>
                        <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                          Salon:
                        </Span>
                        <Span fontSize={'18px'}>
                          {detailHour?.slice?.[0]?.location?.gym?.map((item, index)=>(
                            <Span fontSize={'18px'} key={index} color={'blue'} underline lineWidth={'100%'}>
                              {item + ' '}
                            </Span>))}
                          {detailHour?.slice?.[0]?.location?.home_park?.map((item, index)=>(
                            <Span fontSize={'18px'} key={index}>
                              {item}
                            </Span>))}
                          {detailHour?.slice?.[0]?.location?.clinic?.map((item, index)=>(
                            <Span fontSize={'18px'} key={index}>
                              {item }
                              {detailHour?.slice?.[0]?.location?.clinic?.length !== index+1 ? ', ': ''}
                            </Span>))}
                        </Span>
                      </Span>

                      <Span>
                        <Span fontWeight="600" mr="15px" fontSize={'20px'} color={'blue'}>
                          Grup Ders:
                        </Span>
                        <Span fontSize={'18px'} color={'blue'}>
                          {detailHour?.min_capacity} / {detailHour?.max_capacity} Kontenjan
                        </Span>
                      </Span>
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
  display: flex;
  flex-direction: column;

  .MuiFormControl-root {
    margin-bottom: 20px;
  }

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

export default Calendar;
