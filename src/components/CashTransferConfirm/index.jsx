import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button } from 'components';
import { getWallet } from 'actions/userProfileActions/walletActions';
import { useDispatch, useSelector } from 'react-redux';

export default function CashTransferConfirm({}) {
  const wallet = useSelector((state) => state?.userProfile?.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, []);
  return (
    <Container>
      <InfoContainer>
        <DataContainer>
          <Info>
            <Text style={{ fontWeight: 800 }}>
              IBAN'a Transfer (Havale, EFT)
            </Text>
          </Info>
          <Info>
            <Text
              style={{
                borderStyle: 'solid',
                borderWidth: '0 1px 0 0',
                borderColor: 'rgba(144, 144, 144, 0.5)',
                padding: '0 10px 0 0',
              }}
            >
              İşlem
            </Text>
            <Text
              color="#909090"
              style={{ marginLeft: '10px', fontWeight: '500' }}
            >
              IBAN'a Transfer (Havale, EFT)
            </Text>
          </Info>
          <Info>
            <Text
              style={{
                borderStyle: 'solid',
                borderWidth: '0 1px 0 0',
                borderColor: 'rgba(144, 144, 144, 0.5)',
                padding: '0 10px 0 0',
              }}
            >
              Alıcı Adı Soyadı
            </Text>
            <Text
              color="#909090"
              style={{ marginLeft: '10px', fontWeight: '500' }}
            >
              ZEYNEP BOZOKLUOGLU
            </Text>
          </Info>
          <Info>
            <Text
              style={{
                borderStyle: 'solid',
                borderWidth: '0 1px 0 0',
                borderColor: 'rgba(144, 144, 144, 0.5)',
                padding: '0 10px 0 0',
              }}
            >
              Alıcı Hesap No
            </Text>
            <Text
              color="#909090"
              style={{ marginLeft: '10px', fontWeight: '500' }}
            >
              092-78900123 KARŞIYAKA
            </Text>
          </Info>
          <Info>
            <Text
              style={{
                borderStyle: 'solid',
                borderWidth: '0 1px 0 0',
                borderColor: 'rgba(144, 144, 144, 0.5)',
                padding: '0 10px 0 0',
              }}
            >
              Alıcı IBAN No
            </Text>
            <Text
              color="#909090"
              style={{ marginLeft: '10px', fontWeight: '500' }}
            >
              TR45 0000 0000 0003 0000 00
            </Text>
          </Info>
          <Info>
            <Text
              style={{
                borderStyle: 'solid',
                borderWidth: '0 1px 0 0',
                borderColor: 'rgba(144, 144, 144, 0.5)',
                padding: '0 10px 0 0',
              }}
            >
              Alıcı Banka
            </Text>
            <Text
              color="#909090"
              style={{ marginLeft: '10px', fontWeight: '500' }}
            >
              T.GARANTİ BANKASI
            </Text>
          </Info>
        </DataContainer>
      </InfoContainer>
      <ConfirmContainer>
        <BottomContainer>
          <Text style={{ fontWeight: 800 }}>Tutar</Text>
          <Text color="#00B2A9" style={{ fontWeight: 800, fontSize: 30 }}>
            {wallet?.data?.balance}
          </Text>
        </BottomContainer>
        <BottomContainer>
          <Button
            style={{ width: '100%', padding: '20px' }}
            className="blue"
            text="Onayla"
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
  padding: 50px 20px;
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
