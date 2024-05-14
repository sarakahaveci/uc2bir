import React from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

const CongratsModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Root style={{ display: open ? 'flex' : 'none' }}>
      <MainContainer>
        <CloseIconStyled onClick={onClose} />
        <ContextContainer>
          <Svg.SuccessIcon />
          <Text variant="h2" fontSize="1.2rem" color="dark" fontWeight="500" textAlign="center">
            {t('Congratulations')}
          </Text>
          <Text textAlign="center" fontSize="1rem" color="dark">
            {t('Refund request created successfully. You will be notified when the transaction is completed')}
          </Text>
        </ContextContainer>
        <ModalFooter>
          <StyledButton to="/" onClick={onClose}>
            {t('ok')}
          </StyledButton>
        </ModalFooter>
      </MainContainer>
    </Root>
  );
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
  align-items: center;
  padding: 20px;
  border-radius: 30px;
  background: white;

  @media ${device.sm} {
    width: 95vw;
    height: 95vh;
    overflow: scroll;
  }
`;

const CloseIconStyled = styled(CloseIcon)`
  align-self: flex-end;
  cursor: pointer;
`;

const StyledButton = styled(Link)`
  font-size: 1.2rem;
  color: black;
  text-align: center;
  display: block;
  width: 100%;
  text-transform: capitalize;

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

  svg {
    margin-bottom: 15px;
  }

  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default CongratsModal;
