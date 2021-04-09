import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Material } from 'components';
export default function CashTransfer({}) {
  return (
    <Container>
      <DataContainer>
        <BoldText>IBAN</BoldText>
        <Material.TextField
          mask="TR99 9999 9999 9999 9999 9999 99"
          label="IBAN Numarası Giriniz"
          type="text"
          name="iban"
        />
        <Material.TextField
          label="Yüklenecek Tutarı giriniz"
          mask="999999TL"
          type="text"
          name="value"
          style={{ marginTop: '10px' }}
        />
      </DataContainer>
      <OptionsContainer>
        <Option>
          <BoldText>Cüzdanımdaki tüm bakiyeyi aktar</BoldText>
          <Material.IOSSwitch checked={true} name="checkedB" />
        </Option>
        <Option>
          <BoldText>IBAN’ı kaydet</BoldText>
          <Material.IOSSwitch checked={true} name="checkedB" />
        </Option>
      </OptionsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const Option = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
