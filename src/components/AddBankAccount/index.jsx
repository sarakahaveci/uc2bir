import React from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Material, Button } from 'components';
import { useTranslation } from 'react-i18next';

export default function AddBankAccount({
  setCardName,
  setCardNo,
  setSaveName,
  handleSubmit,
}) {
  const { t } = useTranslation();

  return (
    <Container>
      <DataContainer>
        <BoldText>{t('Buyer Account Information')}</BoldText>
        <Material.TextField
          label={t("recipient's name and surname")}
          type="text"
          name="holder_name"
          onBlur={(e) => {
            setCardName(e.target.value);
          }}
        />
        <Material.TextField
          mask="TR 99 9999 9999 9999 9999 9999 99"
          label={t('Enter IBAN Number')}
          type="text"
          name="card_number"
          onBlur={(e) => {
            var temp = e.target.value.replace(/ /g, '');

            setCardNo(temp.replace('TR', ''));
          }}
        />
        <Material.TextField
          label={t('Registration Name')}
          type="text"
          name="bank_title"
          onBlur={(e) => {
            setSaveName(e.target.value);
          }}
        />
      </DataContainer>
      <Button
        style={{ width: '100%', padding: '20px', marginTop: '20px' }}
        className="blue"
        text={t('Save IBAN No')}
        onClick={() => {
          handleSubmit();
        }}
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
