import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { useTranslation } from 'react-i18next';
import { device } from 'utils';

const CancalletionModal = ({
  open,
  cancelStepOne,
  stepTwoData,
  cancelStepTwo,
  cancelProcess,
  headerText = '',
  descText = '',
  cancelProcessLabel = '',
  cancelLabel = '',
}) => {
  const { t } = useTranslation();

  const [selectedPage, setSelectedPage] = useState('start');

  useEffect(() => {
    setSelectedPage('start');
  }, [open]);

  function hourFormatter(hour) {
    if (hour) {
      if (hour > 24) {
        var day = Math.floor(hour / 24);
        var remaining = hour - day * 24;
        return day + t('day') + remaining + t('hour');
      } else {
        return hour + t('hour');
      }
    } else {
      return null;
    }
  }

  let content;
  switch (selectedPage) {
    case 'start':
      content = (
        <MainContainer>
          <Svg.CloseIcon
            className="close-icon"
            onClick={() => {
              cancelProcess();
            }}
          />
          <ContextContainer>
            <IconContainer>
              <Svg.Reject />
            </IconContainer>
            <Text variant="h2" fontSize="1.2rem" color="dark" fontWeight="500" textAlign="center">
              {headerText}
            </Text>
            <Text textAlign="center" fontSize="1rem" color="dark">
              {descText}
            </Text>
          </ContextContainer>
          <div className="modal-footer">
            <StyledButton
              cancel
              onClick={() => {
                cancelStepOne(open);
                setSelectedPage('second');
              }}
            >
              {cancelLabel}
            </StyledButton>
            <StyledButton
              onClick={() => {
                cancelProcess();
              }}
            >
              {cancelProcessLabel}
            </StyledButton>
          </div>
        </MainContainer>
      );
      break;
    case 'second':
      content = (
        <MainContainer>
          <ContextContainer>
            <IconContainer>
              <Svg.Reject />
            </IconContainer>
            <Text variant="h2" fontSize="1.2rem" color="dark" fontWeight="500" textAlign="center">
              {headerText}
            </Text>
            <Text textAlign="center" fontSize="1rem" color="dark">
              {hourFormatter(stepTwoData?.remaining_hour)} sonraki randevunuzu iptal etmek üzeresiniz.
            </Text>
            {stepTwoData?.penalty_fee && stepTwoData?.penalty_fee > 0 && (
              <Text textAlign="center" fontSize="1rem" color="dark">
                İşlemi onaylamanız halinde {stepTwoData?.penalty_fee} tl ceza ücreti hesabınıza yansıyacaktır.
              </Text>
            )}
          </ContextContainer>
          <div style={{ display: 'flex', width: '100%' }}>
            <StyledButton
              style={{ marginRight: '10px' }}
              onClick={() => {
                cancelProcess();
              }}
            >
              {t('cancel')}
            </StyledButton>
            <StyledButton
              onClick={() => {
                cancelStepTwo(open);
              }}
            >
              {t('yes')}
            </StyledButton>
          </div>
        </MainContainer>
      );
      break;
    default:
      break;
  }

  return <Root style={{ display: open ? 'flex' : 'none' }}>{content}</Root>;
};

const Root = styled.div`
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 30px;
  align-items: center;
  padding: 20px;
  background: white;

  .close-icon {
    align-self: flex-end;
    svg {
      cursor: pointer;
    }
  }

  @media ${device.sm} {
    width: 95vw;
    height: 95vh;
    overflow: scroll;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 200px;
  background: #f01c62;
  margin-bottom: 15px;
`;

const StyledButton = styled.button`
  font-size: 1.2rem;
  color: ${(p) => (p.cancel ? '#F01C62' : 'black')};
  text-align: center;
  display: block;
  width: 100%;
  text-transform: uppercase;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: var(--blue);
  }
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  justify-content: center;
  align-items: center;
  padding: 50px 70px 30px;

  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;

export default CancalletionModal;
