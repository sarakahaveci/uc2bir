import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  Text,
  PlusButton,
  MinusButton,
  Span,
  Svg,
  Material,
  Box,
  Button,
  Modal,
} from 'components';
import ReservationAccordion from '../ReservationAccordion';

export default function GroupRightSelections({ classSelection }) {
  const [minimumCount, setMinimumCount] = useState(0);
  const [maximumCount, setMaximumCount] = useState(0);

  const reservationSuccessModalRef = useRef();

  useEffect(() => {
    setMaximumCount(classSelection.capacity);
  }, [classSelection]);

  return (
    <RightWrapper>
      <RightBody>
        <ReservationAccordion title="Rezervasyon Tarihi & Saati">
          <CollapseItem>
            <Span pr="10px" mr="10px" fontWeight="500" color="dark">
              Ders
            </Span>

            <Box row alignItems="center">
              <Svg.CalendarIcon />

              <Span ml="10px" fontWeight="500" color="gray10">
                23 Kasım Çarşamba
              </Span>

              <Span color="blue" ml="5px" fontWeight="500">
                Saat: 08:00 - 09:00
              </Span>
            </Box>
          </CollapseItem>
        </ReservationAccordion>

        <ReservationAccordion title="Seçili Spor Alanı Grup Ders Kontenjanları">
          <CollapseItem>
            <WorkPlaceInfoRow>
              <Svg.GuestIcon className="guest-icon" />

              <Span fontWeight="500" color="gray10">
                {classSelection.name}
              </Span>

              <Span color="blue" fontWeight="500" ml="8px">
                {classSelection.capacity} Kişilik
              </Span>
            </WorkPlaceInfoRow>
            <Span ml="auto" color="blue" fontWeight="500">
              {classSelection.price} TL
            </Span>
          </CollapseItem>

          <Box row justifyContent="flex-end" color="red" fontWeight="500">
            *Salon kiralama bedeli
          </Box>
        </ReservationAccordion>

        <DarkTitle className="mt-4">Kontenjan Belirleyiniz</DarkTitle>

        <Row>
          <Col lg={6}>
            <Text fontWeight="300" color="black3" my="5px">
              Minumum
            </Text>

            <ButtonWrapper>
              <MinusButton
                width="35px"
                height="35px"
                mr="20px"
                style={{ cursor: 'not-allowed' }}
                onClick={() => {
                  if (minimumCount === 0) {
                    return;
                  } else setMinimumCount(minimumCount - 1);
                }}
              />

              <Span minWidth="15px" color="red">
                {' '}
                {minimumCount}
              </Span>

              <PlusButton
                width="35px"
                height="35px"
                ml="20px"
                onClick={() => setMinimumCount(minimumCount + 1)}
              />
            </ButtonWrapper>
          </Col>
          <Col lg={6}>
            <Text fontWeight="300" color="black3" my="5px">
              Maksimum
            </Text>

            <ButtonWrapper>
              <MinusButton
                width="35px"
                height="35px"
                mr="20px"
                onClick={() => {
                  if (maximumCount === 0) {
                    return;
                  } else setMaximumCount(maximumCount - 1);
                }}
              />

              <Span minWidth="15px" color="blue">
                {maximumCount}
              </Span>

              <PlusButton
                width="35px"
                height="35px"
                ml="20px"
                onClick={() => setMaximumCount(maximumCount + 1)}
              />
            </ButtonWrapper>
          </Col>
        </Row>
      </RightBody>

      <RightFooter>
        <DarkTitle>
          Fiyat Belirleyiniz
          <Span color="red" fontSize="0.9rem" fontWeight="400" ml="5px">
            *Kişi başı
          </Span>
        </DarkTitle>

        <Material.TextField label="Giriniz" />

        <Text color="red" fontSize="0.9rem">
          *Max 50 TL fiyat giriniz
        </Text>

        <Button
          onClick={() => reservationSuccessModalRef.current.openModal()}
          text="Tamamla"
          className="blue"
          width="100%"
          height="65px"
          mt="15px"
        />
      </RightFooter>

      <SuccessModal activateFooter ref={reservationSuccessModalRef}>
        <Box center my="30px">
          <Svg.SuccessIcon />
        </Box>

        <Text fontWeight="600" fontSize="1.1rem" textAlign="center">
          Tebrikler
        </Text>

        <Text textAlign="center" mb="30px">
          Grup Dersi etkinliğiniz oluşturuldu.
        </Text>

        <Modal.Footer>
          <Text textAlign="center" color="blue" p="0">
            REZERVASYON TAKVİMİMİ GÖR
          </Text>

          <Link to="/" className="group-right-selections__homepage">
            ANASAYFA
          </Link>
        </Modal.Footer>
      </SuccessModal>
    </RightWrapper>
  );
}

const WorkPlaceInfoRow = styled.div`
  display: flex;
  align-items: center;

  .guest-icon {
    margin: 0px 8px 2px 0px;
  }
`;

const SuccessModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .group-right-selections {
    &__homepage {
      border-top: 1px solid rgba(144, 144, 144, 0.2);
      text-align: center;
      padding-top: 20px;
      cursor: pointer;
      color: ${(p) => p.theme.colors.dark};
      display: block;
      margin-top: 20px;
    }
  }
`;

const CollapseItem = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
`;

const RightBody = styled.div`
  padding: 20px 30px 30px;
`;

const RightWrapper = styled.div`
  border-radius: 20px;
  background: #f8f8f8;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.14);
  overflow: hidden;
`;

const RightFooter = styled.div`
  background-color: white;
  padding: 30px;
`;

const DarkTitle = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.dark};
`;

const ButtonWrapper = styled.div`
  height: 50px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #c6c6c6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
