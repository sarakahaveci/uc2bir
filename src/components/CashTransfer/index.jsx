import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Material, Button } from 'components';
export default function CashTransfer({}) {
  return (
    <Container>
      <DataContainer>
        <BoldText>Alıcı Hesap Bilgileri</BoldText>
        <Material.TextField
          label="Alıcı Adı Soyadı"
          type="text"
          name="holder_name"
          // defaultValue={defaultCardName}
          onBlur={() => {
            // setCardName(e.target.value);
          }}
        />
        <Material.TextField
          mask="9999 9999 9999 9999"
          label="IBAN Numarası Giriniz"
          type="text"
          name="card_number"
          // defaultValue={defaultCardNo}
          onBlur={() => {
            // setCardNo(e.target.value.replace(/ /g, ''));
          }}
        />
        <Material.TextField
          label="Kayıt Adı"
          type="text"
          name="bank_title"
          // defaultValue={defaultCardName}
          onBlur={() => {
            // setCardName(e.target.value);
          }}
        />
      </DataContainer>
      <Button
        style={{ width: '100%', padding: '20px', marginTop: '20px' }}
        className="blue"
        text="IBAN No Kaydet"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
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

const BoldText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 20px;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
