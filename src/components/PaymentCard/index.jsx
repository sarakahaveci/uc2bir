import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button, Accordion, Material } from 'components';
import Svg from 'components/statics/svg';
import { space } from 'styled-system';
import { useDispatch, useSelector } from 'react-redux';
import { setReservation } from 'actions';

export default function PaymentCard({ dateOption }) {
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservation);

  const [toggleState, setToggleState] = useState(false);
  const hours = [
    '07:00-08:00',
    '08:00-09:00',
    '09:00-10:00',
    '11:00-12:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '17:00-18:00',
  ];
  return (
    <Container>
      {dateOption && (
        <ReservationContainer>
          <AddHeader>Tarih Seçiniz</AddHeader>
          <Material.MaterialDateField
            label="Rezervasyon Tarihi"
            type="text"
            name="date"
            defaultValue={'21.01.1995'}
            settings
          />
          <AddHeader>Saat Seçiniz</AddHeader>
          <Hours>
            {hours.map((item, indx) => (
              <Hour key={indx}>{item}</Hour>
            ))}
          </Hours>
        </ReservationContainer>
      )}
      <AddTextContainer>
        {!reservation?.data?.payment_type && (
          <>
            <AddHeader>Misafir Ekle</AddHeader>
            <AddDesc>
              Dilersen istediğin bir arkadaşınla beraber derse gelebilirsin.
            </AddDesc>
          </>
        )}
      </AddTextContainer>
      <InfoContainer>
        <DataContainer>
          <Info>
            <Text style={{ fontWeight: 800 }}>Eğitmen Ücreti</Text>
            <Text style={{ fontWeight: 800 }}>300</Text>
          </Info>
          <Info>
            <Text style={{ fontWeight: 800 }}>Salon Ücreti</Text>
            <Text style={{ fontWeight: 800 }}>50</Text>
          </Info>
        </DataContainer>
      </InfoContainer>
      <InfoContainer>
        <DataContainer>
          <Info borderDisable>
            <Accordion>
              <AccordionItemWrapper>
                <Accordion.Item defaultOpen={false}>
                  <Accordion.Toggle
                    onToggle={(state) => setToggleState(state)}
                    className="accordion-toggler"
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/*miniIcon*/}
                      <DarkTitle>{'Rezervasyonlarınız'}</DarkTitle>
                    </div>
                    {toggleState ? <Svg.ArrowDownIcon /> : <Svg.ArrowUpIcon />}
                  </Accordion.Toggle>
                  <Accordion.Collapse>
                    {['22', '22'].map((elm, key) => (
                      <Info key={key}>
                        <div style={{ display: 'flex' }}>
                          <Text
                            style={{
                              fontWeight: 800,
                              padding: '0 7px',
                              borderRightStyle: 'solid',
                              borderWidth: '1px',
                              borderColor: 'gray',
                            }}
                          >
                            1.Ders
                          </Text>
                          <Svg.Date style={{ marginLeft: '5px' }} />
                          <Text
                            color="#00B2A9"
                            style={{
                              fontWeight: 800,
                              padding: '0 7px',
                            }}
                          >
                            Tarih:
                          </Text>
                          <Text
                            color="gray"
                            style={{
                              fontWeight: 800,
                              padding: '0 7px',
                            }}
                          >
                            26 Kasım
                          </Text>
                          <Text
                            color="#00B2A9"
                            style={{
                              fontWeight: 800,
                              padding: '0 7px',
                            }}
                          >
                            Saat:
                          </Text>
                          <Text
                            color="gray"
                            style={{
                              fontWeight: 800,
                              padding: '0 7px',
                            }}
                          >
                            11:00
                          </Text>
                        </div>
                        <Svg.TrashIcon />
                      </Info>
                    ))}
                  </Accordion.Collapse>
                </Accordion.Item>
              </AccordionItemWrapper>
            </Accordion>
          </Info>
        </DataContainer>
        <AddTextContainer>
          <AddHeader>Ders Ekle</AddHeader>
          <AddDesc>Aynı eğitmen ve salondan daha fazla ders alın</AddDesc>
        </AddTextContainer>
      </InfoContainer>
      <ConfirmContainer>
        <BottomContainer>
          <Text style={{ fontWeight: 800 }}>Toplam Ücret</Text>
          <Text color="#00B2A9" style={{ fontWeight: 800, fontSize: 30 }}>
            900
          </Text>
        </BottomContainer>
        {reservation?.data?.payment_type ? (
          <BottomContainer>
            <Button
              style={{ width: '100%', padding: '20px' }}
              className="blue"
              text="Ödeme Yap"
            />
          </BottomContainer>
        ) : (
          <>
            <BottomContainer>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Cüzdanımdan Öde"
                onClick={() => {
                  dispatch(setReservation({ payment_type: 'wallet' }));
                }}
              />
            </BottomContainer>
            <BottomContainer style={{ margin: '5px' }}>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Kredi Kartından Öde"
                onClick={() => {
                  dispatch(setReservation({ payment_type: 'creditCard' }));
                }}
              />
            </BottomContainer>
          </>
        )}
      </ConfirmContainer>
    </Container>
  );
}
const AddTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 20px;
`;
const AddHeader = styled.text`
  font-weight: 600;
`;
const AddDesc = styled.text``;
const Container = styled.div``;
const InfoContainer = styled.div`
  width: 586px;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const DataContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  padding: 5px 20px;
`;

const Text = styled.text`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  border-style: ${(p) => (p.borderDisable ? 'none' : 'solid')};
  border-color: rgba(144, 144, 144, 0.5);
  border-width: 0 0 1px 0;
  padding: 10px 5px;
`;
const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const AccordionItemWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  margin-bottom: 20px;
  width: 100%;
  ${space}

  .accordion-toggler {
    display: flex;
    background: ${(p) =>
      p.parent
        ? '#EFEFEF'
        : p.accordionBackground
        ? p.accordionBackground
        : '#F8F8F8'};
    justify-content: space-between;
    border-radius: ${(p) => (p.accordionRadius ? p.accordionRadius : '10px')};
    padding: 15px;
    margin-bottom: 10px;
  }
`;
const DarkTitle = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  margin-left: 5px;
  color: ${(p) => p.theme.colors.dark};
`;
const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Hours = styled.div`
  display: flex;
  width: 586px;
  flex-wrap: wrap;
`;
const Hour = styled.div`
  display: flex;
  flex-shrink: 0;
  width: auto;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  cursor: pointer;
`;
