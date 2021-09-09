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
import { useTranslation } from 'react-i18next';
import {
  DIETITIAN,
  PERSONAL_TRAINER,
  SESSION_KEYS,
  WORK_PLACE,
} from 'constants/index';

moment.locale('tr');

const Calendar = () => {
  const { t } = useTranslation();

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
    setActivePage('index');
    setStartDate(date);
  };

  const startOfWeeksArr = availableDates?.map(
    (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
  );

  const deleteHourSuccess = () => {
    dispatch(getDayOfCalendar(moment(startDate).format('DD.MM.YYYY')));
    setActivePage('index');
    toast.success(t('Hours Deletion Successfully Completed'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const addHourSuccess = () => {
    dispatch(getDayOfCalendar(moment(startDate).format('DD.MM.YYYY')));
    setActivePage('index');
    toast.success(t('Adding Hour Operation Successfully Completed'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const deleteHourFail = () => {
    toast.error(
      t('Error Occurred While Deleting Selected Time Error Occurred'),
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
  };

  const showSessionDependentInputs = (sessionType) =>
    sessionSelection.findIndex((session) => session.type === sessionType) !==
    -1;

  const sessionTypeArr =
    userTypeId === WORK_PLACE
      ? { location: classSelection }
      : sessionSelection.map((session) => ({
          session,
          ...(session.type !== 'online' && {
            location:
              session.type === 'gym'
                ? workPlaceSelection || classSelection
                : session.type === 'clinic'
                ? workPlaceSelection
                : locationSelection,
          }),
        }));

  const addHourToCalender = () => {
    dispatch(
      applyHourOfCalendar(
        startDate,
        sessionTypeArr,
        branchSelection,
        selectedHour.hour,
        addHourSuccess
      )
    );
  };
  return (
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
      {activePage === 'create' ? (
        <Row>
          <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={6}>
            <Title
              style={{ display: 'flex', flexWrap: 'nowrap' }}
              textAlign="left"
            >
              <Span
                cursor="pointer"
                fontSize="1.5rem"
                onClick={() => setActivePage('showAvailableHour')}
                marginRight="10px"
                marginBottom="-15px"
              >
                {`<`}
              </Span>
              <Span>{t('Make a Reservation')}</Span>
            </Title>

            <AppointmentContainer>
              <Material.TextField
                name="appointmentDate"
                forHtml="appointmentDate"
                label={t('Date & Time')}
                defaultValue={
                  moment(startDate).format('DD MMMM dddd') +
                  ',' +
                  selectedHour?.hour
                }
                disabled={true}
              />

              {userTypeId === PERSONAL_TRAINER && (
                <FormControl>
                  <InputLabel>{t('Select Branches')}</InputLabel>

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
                  <InputLabel>{t('Select Classes')}</InputLabel>
                  <Select
                    multiple
                    value={classSelection}
                    input={<Input />}
                    onChange={(e) => setClassSelection(e.target.value)}
                  >
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
                  <InputLabel>{t('Select Session Types')}</InputLabel>

                  <Select
                    multiple
                    value={sessionSelection}
                    input={<Input />}
                    onChange={(e) => setSessionSelection(e.target.value)}
                  >
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
                  <InputLabel>{t('Choose Sports Field')}</InputLabel>

                  <Select
                    multiple
                    value={workPlaceSelection}
                    input={<Input />}
                    onChange={(e) => {
                      setWorkPlaceSelection(e.target.value);
                    }}
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
                  <InputLabel>{t('Select Clinic')}</InputLabel>

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
                  <InputLabel>{t('Select Home/Park')}</InputLabel>

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

          <Col
            style={{ display: 'flex', justifyContent: 'center' }}
            xs={{ order: IsSmallScreen ? 1 : 2 }}
            lg={6}
          >
            <DateContainer>
              <AppointmentDate>
                <Row>
                  <ReservationAccordion
                    defaultOpen={true}
                    title={t('Reservation Date')}
                    accordionBackground={'#ffffff'}
                    accordionRadius={'20px'}
                  >
                    <hr style={{ marginTop: '0px' }} />
                    <Row style={{ padding: '10px' }}>
                      <Col lg={2}>
                        <Text color="dark" fontWeight="500" fontSize="0.9rem">
                          1 {t('lesson')}
                        </Text>
                      </Col>
                      <Col lg={1}>
                        <Seperator />
                      </Col>
                      <Col lg={8}>
                        <ReservationText>
                          <Calender />
                          <Text color="#707070" fontWeight="200">
                            {moment(startDate).format('DD MMMM dddd') +
                              t('hour') +
                              selectedHour?.hour}
                          </Text>
                        </ReservationText>
                      </Col>
                      <Col lg={1} />
                    </Row>
                  </ReservationAccordion>
                </Row>
              </AppointmentDate>
              <AcceptButton src={image}>
                <Button
                  onClick={() => addHourToCalender()}
                  text={t('complete')}
                  className="blue"
                  width={'496px'}
                  height={'66px'}
                />
              </AcceptButton>
            </DateContainer>
          </Col>
        </Row>
      ) : (
        <Row>
          {activePage === 'index' && (
            <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
              <AccordionContainer>
                <ReservationAccordion
                  defaultOpen={true}
                  parent
                  title={moment(startDate).format('DD MMMM dddd')}
                >
                  <Box row flexWrap="wrap" center>
                    {availableHours?.map(
                      (item, index) =>
                        item.id && (
                          <ReservationHourButton
                            onClick={() => {
                              setSelectedHour(item);
                              setActivePage(
                                item.type !== 'group'
                                  ? 'showHourDetail'
                                  : 'showHourGroup'
                              );
                              dispatch(getDayDetailOfCalendar(item.id));
                            }}
                            text={item.hour}
                            className="blue"
                            width="342px"
                            height="52px"
                            mt="15px"
                            key={index}
                          />
                        )
                    )}
                    <AvailableButton
                      onClick={() => setActivePage('showAvailableHour')}
                    >
                      {t('See My Free Hours')}
                    </AvailableButton>
                  </Box>
                </ReservationAccordion>
              </AccordionContainer>
            </Col>
          )}

          {activePage === 'showAvailableHour' && (
            <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
              <AccordionContainer>
                <Span
                  cursor="pointer"
                  fontSize="1.5rem"
                  onClick={() => setActivePage('index')}
                  marginRight="10px"
                  marginTop="10px"
                >
                  {`<`}
                </Span>
                <ReservationAccordion
                  defaultOpen={true}
                  parent
                  title={
                    moment(startDate).format('DD MMMM dddd') +
                    t('/ MY FREE HOURS')
                  }
                >
                  <Box row flexWrap="wrap" center>
                    {availableHours?.map(
                      (item, index) =>
                        !item.id && (
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
                        )
                    )}
                  </Box>
                </ReservationAccordion>
              </AccordionContainer>
            </Col>
          )}

          {activePage === 'showHourDetail' && (
            <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
              <AccordionContainer>
                <Span
                  cursor="pointer"
                  fontSize="1.5rem"
                  onClick={() => setActivePage('index')}
                  marginRight="10px"
                  marginTop="10px"
                >
                  {`<`}
                </Span>
                <ReservationAccordion
                  defaultOpen={true}
                  parent
                  title={
                    moment(startDate).format('DD MMMM dddd') +
                    ' / ' +
                    selectedHour?.hour
                  }
                >
                  <HourDetailContainer>
                    {userTypeId === PERSONAL_TRAINER && (
                      <Box>
                        <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                          {t('Branches')}:
                        </Span>
                        <Span fontSize={'18px'}>{selectedHour?.branch}</Span>
                      </Box>
                    )}

                    {userTypeId !== WORK_PLACE && (
                      <Box>
                        <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                          {t('Session Types')}:
                        </Span>
                        {detailHour?.slice?.[0]?.session
                          ?.split(',')
                          .map((item, index) => (
                            <Span fontSize={'18px'} key={index}>
                              {SESSION_KEYS[item.replace(/\s+/g, '')]}
                              {selectedHour?.session?.split(',').length !==
                              index + 1
                                ? ', '
                                : ''}
                            </Span>
                          ))}
                        <Seperator />
                      </Box>
                    )}

                    <Box>
                      <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                        {userTypeId !== WORK_PLACE
                          ? t('Selected Places')
                          : t('Selected Classes')}
                      </Span>
                      <Span fontSize={'18px'}>
                        {detailHour?.slice?.[0]?.location?.gym?.map(
                          (item, index) => (
                            <Span fontSize={'18px'} key={index}>
                              {item + ' '}
                            </Span>
                          )
                        )}
                        {detailHour?.slice?.[0]?.location?.class?.map(
                          (item, index) => (
                            <Span fontSize={'18px'} key={index}>
                              {item + ' '}
                              {detailHour?.slice?.[0]?.location?.class
                                ?.length !==
                              index + 1
                                ? ', '
                                : ''}
                            </Span>
                          )
                        )}
                        {detailHour?.slice?.[0]?.location?.home_park?.map(
                          (item, index) => (
                            <Span fontSize={'18px'} key={index}>
                              {item}
                            </Span>
                          )
                        )}
                        {detailHour?.slice?.[0]?.location?.clinic?.map(
                          (item, index) => (
                            <Span fontSize={'18px'} key={index}>
                              {item}
                              {detailHour?.slice?.[0]?.location?.clinic
                                ?.length !==
                              index + 1
                                ? ', '
                                : ''}
                            </Span>
                          )
                        )}
                      </Span>
                      <Seperator />
                    </Box>

                    <hr />
                    <Row
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Button
                        disableborder
                        text={t('delete')}
                        width={'120px'}
                        height={'35px'}
                        onClick={() =>
                          dispatch(
                            deleteHourOfCalendar(
                              selectedHour?.id,
                              deleteHourSuccess,
                              deleteHourFail
                            )
                          )
                        }
                      />
                    </Row>
                  </HourDetailContainer>
                </ReservationAccordion>
              </AccordionContainer>
            </Col>
          )}

          {activePage === 'showHourGroup' && (
            <Col xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
              <AccordionContainer>
                <Span
                  cursor="pointer"
                  fontSize="1.5rem"
                  onClick={() => setActivePage('index')}
                  marginRight="10px"
                  marginTop="10px"
                >
                  {`<`}
                </Span>
                <ReservationAccordion
                  defaultOpen={true}
                  parent
                  title={
                    moment(startDate).format('DD MMMM dddd') +
                    ' / ' +
                    selectedHour?.hour
                  }
                >
                  <HourDetailContainer>
                    {userTypeId === PERSONAL_TRAINER && (
                      <Box>
                        <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                          {t('branch')}:
                        </Span>
                        <Span fontSize={'18px'}>{selectedHour?.branch}</Span>
                      </Box>
                    )}

                    <Box row style={{ justifyContent: 'space-between' }}>
                      <Span>
                        <Span fontWeight="600" mr="15px" fontSize={'20px'}>
                          {t('Gyms')}:
                        </Span>
                        <Span fontSize={'18px'}>
                          {detailHour?.slice?.[0]?.location?.gym?.map(
                            (item, index) => (
                              <Span
                                fontSize={'18px'}
                                key={index}
                                color={'blue'}
                                underline
                                lineWidth={'100%'}
                              >
                                {item + ' '}
                              </Span>
                            )
                          )}
                          {detailHour?.slice?.[0]?.location?.home_park?.map(
                            (item, index) => (
                              <Span fontSize={'18px'} key={index}>
                                {item}
                              </Span>
                            )
                          )}
                          {detailHour?.slice?.[0]?.location?.clinic?.map(
                            (item, index) => (
                              <Span fontSize={'18px'} key={index}>
                                {item}
                                {detailHour?.slice?.[0]?.location?.clinic
                                  ?.length !==
                                index + 1
                                  ? ', '
                                  : ''}
                              </Span>
                            )
                          )}
                        </Span>
                      </Span>

                      <Span>
                        <Span
                          fontWeight="600"
                          mr="15px"
                          fontSize={'20px'}
                          color={'blue'}
                        >
                          {t('Group Lesson')}:
                        </Span>
                        <Span fontSize={'18px'} color={'blue'}>
                          {detailHour?.min_capacity} /{' '}
                          {detailHour?.max_capacity} {t('Quota')}
                        </Span>
                      </Span>
                    </Box>

                    <hr />
                    <Row
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Button
                        disableborder
                        text={t('delete')}
                        width={'120px'}
                        height={'35px'}
                        onClick={() =>
                          dispatch(
                            deleteHourOfCalendar(
                              selectedHour?.id,
                              deleteHourSuccess,
                              deleteHourFail
                            )
                          )
                        }
                      />
                    </Row>
                  </HourDetailContainer>
                </ReservationAccordion>
              </AccordionContainer>
            </Col>
          )}

          <Col
            style={{ display: 'flex', justifyContent: 'center' }}
            xs={{ order: IsSmallScreen ? 1 : 2 }}
            lg={4}
          >
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
                minDate={new Date()}
              />
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
  background: #f8f8f8;
  border-radius: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  @media ${device.sm} {
    height: 190px;
    width: 310px;
  }
`;

const HourDetailContainer = styled.div`
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
`;

const AppointmentDate = styled.div`
  background: #ffffff;
  border: 2px solid #c6c6c6;
  border-radius: 20px;
  margin: 17px;
  padding-left: 15px;
  padding-right: 15px;
  flex-direction: column;
  @media ${device.sm} {
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
  background-color: #ffffff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  @media ${device.sm} {
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
  flex-direction: column;
`;

const AppointmentContainer = styled.div`
  display: flex;
  flex-direction: column;

  .MuiFormControl-root {
    margin-bottom: 20px;
  }

  .materials {
    margin-bottom: 15px;

    label {
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
  margin-top: 20px;
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
