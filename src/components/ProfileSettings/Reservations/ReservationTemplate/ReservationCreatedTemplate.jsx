import React, { useState, useRef, useCallback } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';


import { Box, Button, Modal, Span, Svg, Text, Title } from 'components';
import image from '../../../../assets/wave-background.png';
import { device } from '../../../../utils';

import ReservationTemplate from './ReservationTemplate';
import ApplyTemplateModal from './ApplyTemplateModal';
import { deleteTemplate, getTemplates, updateDefaultTemplate } from '../../../../actions';
import { toast } from 'react-toastify';

export default function ReservationCreatedTemplate({ setTab = () => {}, setTabPage = () => {} }) {
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
    successReservationModalRef.current.closeModal()
    setTabPage('')
    setTab('Calendar')
  }, []);

  const updateTemplateDefaultFail = () => {
    toast.error(
      'Varsayılan Şablon Oluştururken Hata Oluştu',
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
  };

  const updateTemplateDefaultSuccess = () => {
    dispatch(getTemplates());
    toast.success('Varsayılan Şablonunuz Oluşuturuldu', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const deleteTemplateFail = () => {
    toast.error(
      'Şablonunuz Silinirken Hata Oluştu',
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
  };

  const deleteTemplateSuccess = () => {
    dispatch(getTemplates());
    toast.success('Şablon Silme İşleminiz Başarılı', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };


  return (
      subPage === 'create'?
        ( <ReservationTemplate setTab={setTab} setTabPage={setSubPage}/>)
      :
        ( <div>
        <BackLink onClick={()=>setTabPage('')}>
          <Svg.ArrowLeftIcon />

          <span>Şablonlar</span>
        </BackLink>
        <Row>
          <Col lg={6}>
            {myTemplates?.map((item, index) => (
              <div key={index}>
                <BoxContainer >
                  <Box row >
                    <Text color="dark" fontWeight="500">
                      {item.name}
                    </Text>
                    <Button redborder text={'Sil'} width={'120px'} height={'35px'} onClick={()=>dispatch(
                      deleteTemplate(
                        item.id,
                        deleteTemplateSuccess,
                        deleteTemplateFail
                      ))}/>
                  </Box>
                </BoxContainer>
                {!item.is_default&&
                <Text
                  style={{ marginLeft:'15px', display:'flex'}}
                  textAlign="left"
                  fontWeight="500"
                  fontSize='11px'
                  cursor={'pointer'}
                  onClick={()=> dispatch(
                    updateDefaultTemplate(
                      item.id,
                      updateTemplateDefaultSuccess,
                      updateTemplateDefaultFail
                    ))}
                  color={'blue'}>
                  <Span underline lineWidth={'100%'} > Varsayılan Şablon Olarak Seç </Span>
                  <Span
                    style={{marginBottom:'-10px'}}
                    cursor="pointer"
                    fontSize="1rem"
                    marginLeft="10px">
                    {`>`}
                  </Span>
                </Text> }

              </div>
            ))}

          </Col>
          <Col lg={6}>
            <DateContainer>
              <AppointmentDate>
                <Row>
                  <Title
                    style={{ marginLeft:'15px', display:'flex'}}
                    textAlign="left"
                    fontWeight="500">
                    <Span underline lineWidth={'100%'} > Şablon Hakkında </Span>
                  </Title>

                  <Text  style={{ margin:'15px', display:'flex'}} fontWeight="300" color={'grey'}>
                    Merhaba {name}, rezervasyon takvimini tamamlamak için oluşturduğun şablonalardan birini kullanabilirsin
                  </Text>
                </Row>
              </AppointmentDate>

              <AcceptButton src={image}>
                <Button
                  onClick={openApplyTemplateModal}
                  text="Haftalık Rezervasyon Takvimimi Oluştur"
                  className="blue"
                  width={'496px'}
                  height={'66px'}
                />

                <Button
                  blueborder = {true}
                  onClick={() => {
                    setSubPage('create');
                  }}
                  text="Yeni Şablon Oluşturmak İstiyorum"
                  width={'496px'}
                  height={'66px'}
                  style={{marginTop:'15px'}}
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
            ref={successReservationModalRef}>
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
                onClick={closeSuccessReservationModal}
                textAlign="center"
                p="0 0 20px 0"
                color="blue"
                cursor="pointer"
              >
                Rezervasyon takvimimi gör
              </Text>

              <Link to="/" className="reservation__return-homepage">
                ANASAYFA
              </Link>
            </Modal.Footer>
          </SuccessReservationModal>
        </Row>
      </div>)
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
  margin: 30px;
  flex-direction: column;
  @media ${device.sm}  {
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
  background-color: #FFFFFF;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  @media ${device.sm}  {
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
