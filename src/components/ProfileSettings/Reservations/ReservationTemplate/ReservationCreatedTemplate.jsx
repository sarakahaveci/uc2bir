import React, { useState, useRef, useCallback } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, Button, Modal, Span, Svg, Text, Title } from 'components';
import image from '../../../../assets/wave-background.png';
import { device } from '../../../../utils';

import ReservationTemplate from './ReservationTemplate';
import ApplyTemplateModal from './ApplyTemplateModal';
import {
  deleteTemplate,
  getTemplates,
  updateDefaultTemplate,
} from '../../../../actions';
import { toast } from 'react-toastify';

export default function ReservationCreatedTemplate({
  setTab = () => {},
  setTabPage = () => {},
}) {
  const { t } = useTranslation();

  const [subPage, setSubPage] = useState();
  const applyTemplateModalRef = useRef();
  const successReservationModalRef = useRef();
  const { name: name } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const openApplyTemplateModal = () =>
    applyTemplateModalRef.current.openModal();
  const {
    myTemplates: { data: myTemplates },
  } = useSelector((state) => state.profileSettings2.reservationTemplate);

  const openSuccessReservationModal = useCallback(() => {
    successReservationModalRef.current.openModal();
  }, []);

  const closeSuccessReservationModal = useCallback(() => {
    successReservationModalRef.current.closeModal();
    setTabPage('');
    setTab('Calendar');
  }, []);

  const updateTemplateDefaultFail = () => {
    toast.error(t('Error While Creating Default Template'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const updateTemplateDefaultSuccess = () => {
    dispatch(getTemplates());
    toast.success(t('Your Default Template Has Been Created'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const deleteTemplateFail = () => {
    toast.error(t('An Error Occurred While Deleting Your Template'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const deleteTemplateSuccess = () => {
    dispatch(getTemplates());
    toast.success(t('Your Template Deletion Successful'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  return subPage === 'create' ? (
    <ReservationTemplate setTab={setTab} setTabPage={setTabPage} />
  ) : (
    <div>
      <BackLink onClick={() => setTabPage('')}>
        <Svg.ArrowLeftIcon />

        <span>{t('Templates')}</span>
      </BackLink>
      <Row>
        <Col lg={6}>
          {myTemplates?.map((item, index) => (
            <div key={index}>
              <BoxContainer>
                <Box row>
                  <Text color="dark" fontWeight="500">
                    {item.name}
                  </Text>
                  <Button
                    redborder={'true'}
                    text={t('delete')}
                    width={'120px'}
                    height={'35px'}
                    onClick={() =>
                      dispatch(
                        deleteTemplate(
                          item.id,
                          deleteTemplateSuccess,
                          deleteTemplateFail
                        )
                      )
                    }
                  />
                </Box>
              </BoxContainer>
              {!item.is_default && (
                <Text
                  style={{ marginLeft: '15px', display: 'flex' }}
                  textAlign="left"
                  fontWeight="500"
                  fontSize="11px"
                  cursor={'pointer'}
                  onClick={() =>
                    dispatch(
                      updateDefaultTemplate(
                        item.id,
                        updateTemplateDefaultSuccess,
                        updateTemplateDefaultFail
                      )
                    )
                  }
                  color={'blue'}
                >
                  <Span underline lineWidth={'100%'}>
                    {t('Select as Default Template')}
                  </Span>
                  <Span
                    style={{ marginBottom: '-10px' }}
                    cursor="pointer"
                    fontSize="1rem"
                    marginLeft="10px"
                  >
                    {`>`}
                  </Span>
                </Text>
              )}
            </div>
          ))}
        </Col>
        <Col lg={6}>
          <DateContainer>
            <AppointmentDate>
              <Row>
                <Title
                  style={{ marginLeft: '15px', display: 'flex' }}
                  textAlign="left"
                  fontWeight="500"
                >
                  <Span underline lineWidth={'100%'}>
                    {t('Şablon Hakkında')}
                  </Span>
                </Title>

                <Text
                  style={{ margin: '15px', display: 'flex' }}
                  fontWeight="300"
                  color={'grey'}
                >
                  {t('hello')} {name},{' '}
                  {t(
                    'you can use one of the templates you created to complete your booking calendar'
                  )}
                </Text>
              </Row>
            </AppointmentDate>

            <AcceptButton src={image}>
              <Button
                onClick={openApplyTemplateModal}
                text={t('Create My Weekly Reservation Calendar')}
                className="blue"
                width={'496px'}
                height={'66px'}
              />

              <Button
                blueborder={'true'}
                onClick={() => {
                  setSubPage('create');
                }}
                text={t('I Want to Create a New Template')}
                width={'496px'}
                height={'66px'}
                style={{ marginTop: '15px' }}
              />
            </AcceptButton>
          </DateContainer>
        </Col>

        <ApplyTemplateModal
          ref={applyTemplateModalRef}
          openSuccessReservationModal={openSuccessReservationModal}
        />

        <SuccessReservationModal
          activateFooter
          ref={successReservationModalRef}
        >
          <div className="reservation__success-modal">
            <Box center mb="35px">
              <Svg.SuccessIcon />
            </Box>

            <Text textAlign="center" fontSize="1.1rem" fontWeight="600">
              {t('Congratulations')}
            </Text>

            <Text textAlign="center" fontSize="1.1rem" mb="15px">
              {t('Your reservations have been created')}
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
              {t('SEE MY BOOKING CALENDAR')}
            </Text>

            <Link to="/" className="reservation__return-homepage">
              {t('HOME PAGE')}
            </Link>
          </Modal.Footer>
        </SuccessReservationModal>
      </Row>
    </div>
  );
}

const BoxContainer = styled(Container)`
  background-color: var(--white) !important;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  margin-top: 30px;
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

const DateContainer = styled.div`
  width: 586px;
  height: 326px;
  margin-left: 25px;
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

const AppointmentDate = styled.div`
  margin: 30px;
  flex-direction: column;
  @media ${device.sm} {
    height: 95px;
    width: 290px;
  }
`;

const AcceptButton = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  @media ${device.sm} {
    height: 95px;
    width: 310px;
  }
`;

const BackLink = styled(Text)`
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
