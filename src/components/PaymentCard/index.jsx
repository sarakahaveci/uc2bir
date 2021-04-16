import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button } from 'components';
import Svg from 'components/statics/svg';
export default function PaymentCard({}) {
  return (
    <Container>
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
          <Info>
            <Text style={{ fontWeight: 900 }}>Rezervasyonlarınız</Text>
          </Info>
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
        </DataContainer>
      </InfoContainer>
      <ConfirmContainer>
        <BottomContainer>
          <Text style={{ fontWeight: 800 }}>Toplam Ücret</Text>
          <Text color="#00B2A9" style={{ fontWeight: 800, fontSize: 30 }}>
            900
          </Text>
        </BottomContainer>
        <BottomContainer>
          <Button
            style={{ width: '100%', padding: '20px' }}
            className="blue"
            text="Cüzdanımdan Öde"
          />
        </BottomContainer>
        <BottomContainer style={{ margin: '5px' }}>
          <Button
            style={{ width: '100%', padding: '20px' }}
            className="blue"
            text="Kredi Kartından Öde"
          />
        </BottomContainer>
      </ConfirmContainer>
    </Container>
  );
}
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
  border-style: solid;
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
