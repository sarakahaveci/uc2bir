import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { addHoursToTemplate, setSelectedDay } from 'actions';
import {
  DIETITIAN,
  HOURS,
  PERSONAL_TRAINER,
  WORK_PLACE,
} from '../../../../constants';
import { Box, Switch, Button, Modal, Text, Svg } from 'components';
import TemplateSummary from './TemplateSummary';
import TemplateSelections from './TemplateSelections';
import TemplateDate from './TemplateDate';
import TemplateSuccessModal from './TemplateSuccessModal';
import TemplateNamingModal from './TemplateNamingModal';
import ApplyTemplateModal from './ApplyTemplateModal';

export default function ReservationTemplate({
  setTab = () => { },
  setTabPage = () => { },
}) {
  const { selectedDay, appliedDays } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

  const { type_id: userTypeId } = useSelector((state) => state.auth.user);

  const [selectedDayHours, setSelectedDayHours] = useState([]);
  const [templateName, setTemplateName] = useState('');

  const [branchSelection, setBranchSelection] = useState([]);
  const [sessionSelection, setSessionSelection] = useState([]);
  const [workPlaceSelection, setWorkPlaceSelection] = useState([]);
  const [locationSelection, setLocationSelection] = useState([]);
  const [classSelection, setClassSelection] = useState([]);
  const [isGuestVisible, setIsGuestVisible] = useState(true);

  const [acceptGuest, setAcceptGuest] = useState(false);

  const templateNamingModalRef = useRef();
  const successTemplateModalRef = useRef();
  const applyTemplateModalRef = useRef();
  const successReservationModalRef = useRef();
  const weekDetailsInfoModalRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedDay(0));
  }, []);

  useEffect(() => {
    sessionSelection.map((session) => {
      if (session.type === 'online' && sessionSelection.length === 1) {
        setIsGuestVisible(false);
      } else {
        setIsGuestVisible(true);
      }
    });
  }, [sessionSelection]);

  const openSuccessTemplateModal = () =>
    successTemplateModalRef.current.openModal();

  const openApplyTemplateModal = () =>
    applyTemplateModalRef.current.openModal();

  const openSuccessReservationModal = useCallback(() => {
    successReservationModalRef.current.openModal();
  }, []);

  const openTemplateNamingModal = () =>
    templateNamingModalRef.current.openModal();

  const openWeekDetailsInfoModal = () =>
    weekDetailsInfoModalRef.current.openModal();

  const saveDayToTemplateHandler = () => {
    let startHourIndex = selectedDayHours[0];

    let endHourIndex = selectedDayHours[1];

    if (startHourIndex > endHourIndex) {
      const temp = endHourIndex;

      endHourIndex = startHourIndex;

      startHourIndex = temp;
    }

    const sessionTypeArr = sessionSelection.map((session) => ({
      session,
      ...(session.type !== 'online' && {
        location:
          session.type === 'gym' || session.type === 'clinic'
            ? workPlaceSelection
            : locationSelection,
      }),
    }));
    console.log('BUMM',sessionTypeArr)
    dispatch(
      addHoursToTemplate(selectedDay.day, {
        id: selectedDay.slice.length,
        hour: `${HOURS[startHourIndex]}-${HOURS[endHourIndex]}`,
        branch: branchSelection,
        accept_guest: acceptGuest,
        session_type: sessionTypeArr,
        ...(userTypeId === WORK_PLACE && { location: classSelection }),
      })
    );

    setSelectedDayHours([]);

    setBranchSelection([]);

    setSessionSelection([]);

    setWorkPlaceSelection([]);

    setLocationSelection([]);

    setClassSelection([]);

    setAcceptGuest(false);

    dispatch(setSelectedDay(selectedDay.day + 1));
  };

  const complateTemplateHandler = () => {
    if (appliedDays.length < 7) {
      openWeekDetailsInfoModal();
    } else {
      openTemplateNamingModal();
    }
  };

  const checkSessionSelection = (sessionType) =>
    sessionSelection.findIndex((session) => session.type === sessionType) !==
    -1;

  const closeSuccessReservationModal = useCallback(() => {
    successReservationModalRef.current.closeModal();
    setTabPage('');
    setTab('Calendar');
  }, []);

  const disableSaveButtonHandler = () => {
    if (selectedDayHours.length !== 2) {
      return true;
    }

    if (userTypeId === WORK_PLACE) {

      return !classSelection.length;
    }

    if (userTypeId === PERSONAL_TRAINER) {
      return (
        !sessionSelection.length ||
        // If gym or home_park selected, check their selections are fulfilled.
        (checkSessionSelection('gym') && !workPlaceSelection?.length) ||
        (checkSessionSelection('home_park') && !locationSelection.length)
      );
    }

    if (userTypeId === DIETITIAN) {
      var isExistClinicAddress;
      sessionSelection.forEach(element => {
        if (element.type == "clinic") {
          isExistClinicAddress = true;
        }
      });
      return !sessionSelection.length || (isExistClinicAddress ? !workPlaceSelection.length : false);
    }
  };

  return (
    <div>
      <BackLink onClick={() => setTabPage('')}>
        <Svg.ArrowLeftIcon />

        <span>Haftalık Şablon Oluştur</span>
      </BackLink>

      <Row>
        <Col lg={6}>
          <TemplateDate
            selectedDayHours={selectedDayHours}
            setSelectedDayHours={setSelectedDayHours}
          />

          <TemplateSelections
            branchSelection={branchSelection}
            setBranchSelection={setBranchSelection}
            sessionSelection={sessionSelection}
            setSessionSelection={setSessionSelection}
            workPlaceSelection={workPlaceSelection}
            setWorkPlaceSelection={setWorkPlaceSelection}
            locationSelection={locationSelection}
            setLocationSelection={setLocationSelection}
            classSelection={classSelection}
            setClassSelection={setClassSelection}
          />

          <Box row justifyContent="flex-end">
            <Button
              width="200px"
              m="10px 0 30px 0"
              className="blue"
              text="Kaydet"
              onClick={saveDayToTemplateHandler}
              disabled={disableSaveButtonHandler()}
            />
          </Box>
        </Col>

        <Col lg={6}>
          <RightWrapper>
            <InnerWrapper>
              <TemplateSummary />

              {userTypeId === PERSONAL_TRAINER && isGuestVisible && (
                <Box mt="40px" px="20px">
                  <Box row>
                    <Text color="dark" fontWeight="500">
                      Misafir Kabul Ediyorum
                    </Text>

                    <Box row alignItems="center">
                      <Svg.GuestIcon className="guest-icon" />

                      <Switch
                        checked={acceptGuest}
                        onChange={() => setAcceptGuest(!acceptGuest)}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </InnerWrapper>

            <NextButtonWrapper>
              <Button
                className="blue"
                text="Tamamla"
                fontWeight="700"
                width="100%"
                height="66px"
                onClick={complateTemplateHandler}
                disabled={!appliedDays.length}
              />
            </NextButtonWrapper>
          </RightWrapper>
        </Col>

        {/*                       MODAL AREA                           */}

        <TemplateNamingModal
          ref={templateNamingModalRef}
          openSuccessTemplateModal={openSuccessTemplateModal}
          templateName={templateName}
          setTemplateName={setTemplateName}
        />

        <TemplateSuccessModal
          ref={successTemplateModalRef}
          openApplyTemplateModal={openApplyTemplateModal}
        />

        <ApplyTemplateModal
          ref={applyTemplateModalRef}
          openSuccessReservationModal={openSuccessReservationModal}
        />

        <WeekDetailsInfoModal ref={weekDetailsInfoModalRef}>
          <Box row justifyContent="center">
            <Svg.WarningIcon />
          </Box>

          <Text
            fontWeight="500"
            color="dark"
            my="50px"
            textAlign="center"
            lineHeight="20px"
          >
            Seçilmeyen günler çalışmıyorum olarak değerlendirelecek.
          </Text>

          <Button
            text="Tamam"
            className="blue"
            onClick={() => {
              openTemplateNamingModal();
              weekDetailsInfoModalRef.current.closeModal();
            }}
          />

          <Text
            color="blue"
            textAlign="center"
            my="20px"
            cursor="pointer"
            onClick={() => weekDetailsInfoModalRef.current.closeModal()}
          >
            Vazgeç
          </Text>
        </WeekDetailsInfoModal>

        <SuccessReservationModal
          activateFooter
          ref={successReservationModalRef}
        >
          <div className="reservation__success-modal">
            <Box center mb="35px">
              <Svg.SuccessIcon />
            </Box>

            <Text textAlign="center" fontSize="1.1rem" fontWeight="600">
              Tebrikler
            </Text>

            <Text textAlign="center" fontSize="1.1rem" mb="15px">
              Rezervasyonlarınız oluşturuldu.
            </Text>
          </div>

          <Modal.Footer>
            <Text
              textAlign="center"
              p="0 0 20px 0"
              color="blue"
              cursor="pointer"
              onClick={closeSuccessReservationModal}
            >
              REZERVASYON TAKVİMİMİ GÖR
            </Text>

            <Link to="/" className="reservation__return-homepage">
              ANASAYFA
            </Link>
          </Modal.Footer>
        </SuccessReservationModal>
      </Row>
    </div>
  );
}

const WeekDetailsInfoModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }
`;

const SuccessReservationModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .reservation {
    &__success-modal {
      padding: 20px 0;
    }

    &__return-homepage {
      border-top: 1px solid rgba(144, 144, 144, 0.2);
      text-align: center;
      padding-top: 20px;
      cursor: pointer;
      color: ${(p) => p.theme.colors.dark};
      display: block;
    }
  }
`;

const RightWrapper = styled.div`
  border-radius: 20px;
  background: #f8f8f8;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.14);
  overflow: hidden;
`;

const NextButtonWrapper = styled.div`
  background-color: white;
  padding: 30px;
  margin-top: 10px;
`;

const InnerWrapper = styled(Col)`
  padding: 20px;

  .guest-icon {
    margin: 0 5px 2px 0;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 2px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.softDark};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
