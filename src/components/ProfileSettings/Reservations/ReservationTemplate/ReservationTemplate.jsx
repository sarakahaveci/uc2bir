import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { addHoursToTemplate, getMyBranches } from 'actions';
import {
  Box,
  Switch,
  Button,
  Modal,
  Text,
  Svg,
  Title,
  Calendar,
} from 'components';
import TemplateSummary from './TemplateSummary';
import TemplateSelections from './TemplateSelections';
import TemplateDate from './TemplateDate';
import TemplateSuccessModal from './TemplateSuccessModal';
import TemplateNamingModal from './TemplateNamingModal';

export default function ReservationTemplate() {
  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

  const [selectionData, setSelectionData] = useState({
    branch: [],
    session: [],
    workPlaces: [],
    parks: [],
  });
  const [selectedDayHours, setSelectedDayHours] = useState([]);

  const templateNamingModalRef = useRef();
  const successTemplateModalRef = useRef();
  const applyTemplateModalRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBranches());
  }, []);

  const setSelectionDataHandler = (e) => {
    setSelectionData({
      ...selectionData,
      [e.target.name]: e.target.value,
    });
  };

  const openTemplateNamingModal = () =>
    templateNamingModalRef.current.openModal();

  const openSuccessTemplateModal = () =>
    successTemplateModalRef.current.openModal();

  const openApplyTemplateModal = () =>
    applyTemplateModalRef.current.openModal();

  const saveDayToTemplateHandler = () => {
    setSelectedDayHours([]);

    dispatch(
      addHoursToTemplate(selectedDay.day, {
        id: selectedDay.slice.length,
        hour: selectedDayHours,
        branch: ['5', '6', '7'],
        session_type: ['2', '3', '4'],
        place_type: [5, 6, 7],
      })
    );
  };

  return (
    <div>
      <BackLink to="/myprofile/settings/profile">
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
            selectionData={selectionData}
            setSelectionData={setSelectionDataHandler}
          />

          <Button
            className="blue"
            text="Kaydet"
            onClick={saveDayToTemplateHandler}
          />
        </Col>

        <Col lg={6}>
          <RightWrapper>
            <InnerWrapper>
              <TemplateSummary />

              <Box mt="40px" px="20px">
                <Box row>
                  <Text color="dark" fontWeight="500">
                    Misafir Kabul Ediyorum
                  </Text>

                  <Switch />
                </Box>

                <Box row>
                  <Text color="dark" fontWeight="500">
                    Bugün çalışmayacağım
                  </Text>

                  <Switch />
                </Box>
              </Box>
            </InnerWrapper>

            <NextButtonWrapper>
              <Button
                className="blue"
                text="Devam Et"
                fontWeight="700"
                width="100%"
                height="66px"
                onClick={openTemplateNamingModal}
              />
            </NextButtonWrapper>
          </RightWrapper>
        </Col>

        <TemplateNamingModal
          ref={templateNamingModalRef}
          openSuccessTemplateModal={openSuccessTemplateModal}
        />

        <TemplateSuccessModal
          ref={successTemplateModalRef}
          openApplyTemplateModal={openApplyTemplateModal}
        />

        <ApplyTemplateModal ref={applyTemplateModalRef}>
          <Title component="h5">Şablonu Takvimime Uygula</Title>

          <Calendar />

          <Button className="blue" text="Tamamla" mt="15px" />

          <Text color="blue"> Vazgeç</Text>
        </ApplyTemplateModal>
      </Row>
    </div>
  );
}

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

const ApplyTemplateModal = styled(Modal)``;
