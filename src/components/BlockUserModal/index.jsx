import React from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import BlockedIcon from 'assets/blocked.png';
import { useTranslation } from 'react-i18next';

const BlockUserModal = ({
  isBlocked,
  open,
  approve = () => {},
  cancel = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <Root style={{ display: open ? 'flex' : 'none' }}>
      <MainContainer>
        <Svg.CloseIcon
          className="close-icon"
          onClick={() => {
            cancel();
          }}
        />
        <ContextContainer>
          <Icon src={BlockedIcon} alt="Blocked Icon" />
          <Text
            variant="h2"
            fontSize="1.2rem"
            color="dark"
            fontWeight="500"
            textAlign="center"
          >
            {isBlocked
              ? t('Are you sure you want to unblock the user?')
              : t('Are you sure you want to block the user?')}
          </Text>
        </ContextContainer>

        <div className="modal-footer">
          <StyledButton
            approve
            onClick={() => {
              approve(open);
            }}
          >
            {t('Approve')}
          </StyledButton>
        </div>
        <div className="modal-footer">
          <StyledButton
            onClick={() => {
              cancel();
            }}
          >
            {t('Give Up')}
          </StyledButton>
        </div>
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
  border-radius: 30px;
  flex-direction: column;
  justify-content: center;
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

const StyledButton = styled(Link)`
  font-size: 1.2rem;
  color: ${(p) => (p.approve ? '#F01C62' : 'black')};
  text-align: center;
  display: block;
  width: 100%;
  text-transform: uppercase;

  &:hover {
    color: #f01c62;
  }
`;

const Icon = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
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

export default BlockUserModal;
