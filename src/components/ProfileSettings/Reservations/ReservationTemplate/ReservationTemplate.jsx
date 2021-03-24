import React, { useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import {
  Box,
  Switch,
  Button,
  Modal,
  Text,
  Svg,
  Title,
  Material,
  Calendar,
} from 'components';
import TemplateSummary from './TemplateSummary';
import TemplateSelections from './TemplateSelections';
import TemplateDate from './TemplateDate';

export default function ReservationTemplate() {
  const [selectionData, setSelectionData] = useState([]);

  const templateNamingModalRef = useRef();
  const successTemplateModalRef = useRef();
  const applyTemplateModalRef = useRef();

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

  return (
    <div>
      <BackLink to="/myprofile/settings/profile">
        <Svg.ArrowLeftIcon />

        <span>Haftalık Şablon Oluştur</span>
      </BackLink>

      <Row>
        <Col lg={6}>
          <TemplateDate />

          <TemplateSelections
            selectionData={selectionData}
            setSelectionData={setSelectionDataHandler}
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

        <TemplateNamingModal activateFooter ref={templateNamingModalRef}>
          <div className="reservation-template__naming-modal">
            <Title textAlign="left" color="blue">
              Şablonunuza İsim Verin
            </Title>

            <Box my="30px">
              <Material.TextField label="Yazınız" />
            </Box>
          </div>

          <Modal.Footer>
            <Text
              color="blue"
              textAlign="center"
              cursor="pointer"
              onClick={openSuccessTemplateModal}
            >
              {/* <Spinner type="static" /> */}
              KAYDET
            </Text>
          </Modal.Footer>
        </TemplateNamingModal>

        <TemplateSuccessModal activateFooter ref={successTemplateModalRef}>
          <div className="reservation-template__success-modal">
            <Box center mb="35px">
              <Svg.SuccessIcon />
            </Box>

            <Text textAlign="center" fontSize="1.1rem" fontWeight="600">
              Tebrikler
            </Text>

            <Text textAlign="center" fontSize="1.1rem" mb="15px">
              Şablonunuz başarıyla kaydedildi.
            </Text>
          </div>

          <Modal.Footer>
            <Text
              textAlign="center"
              p="0 0 20px 0"
              color="blue"
              cursor="pointer"
              onClick={openApplyTemplateModal}
            >
              ŞABLONUMU TAKVIMIME UYGULA
            </Text>

            <Link to="/" className="reservation-template__return-homepage">
              ANASAYFA
            </Link>
          </Modal.Footer>
        </TemplateSuccessModal>

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
  margin-top: 50px;
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

const TemplateNamingModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .reservation-template__naming-modal {
    padding: 40px;
  }
`;

const TemplateSuccessModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .reservation-template {
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

const ApplyTemplateModal = styled(Modal)``;
