import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button } from 'components';
import { getWallet } from 'actions/userProfileActions/walletActions';
import { useDispatch, useSelector } from 'react-redux';

export default function CashTransferConfirmUser({ amount }) {
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
            <Text style={{ fontWeight: 600 }}>Cüzdanınız</Text>
            <br />
            <Text style={{ fontWeight: 300 }}>
              Cüzdanınızda {wallet?.data?.balance} ₺ bulunmaktadır.
            </Text>
          </Info>

          <ConfirmContainer>
            <BottomContainer>
              <Text style={{ fontWeight: 800 }}>Toplam Ücret</Text>
              <Text color="#00B2A9" style={{ fontWeight: 800, fontSize: 20 }}>
                {amount ? amount : 0}₺
              </Text>
            </BottomContainer>
            <br />
            <BottomContainer>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Ödeme Yap"
              />
            </BottomContainer>
          </ConfirmContainer>
        </DataContainer>
      </InfoContainer>
    </Container>
  );
}
const Container = styled.div`
  margin-top: 40px;
`;
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
  margin-top: 30px;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
