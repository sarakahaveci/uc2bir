import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { useSelector } from 'react-redux';
import * as KEYS from '../../constants/userKeys';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

const CreateCalenderModal = ({
  open,
  closeModal,
  approve = () => {},
  cancel = () => {},
}) => {
  const { t } = useTranslation();

  const { name, type_id } = useSelector((state) => state.auth.user);
  const {
    userKeys: { data: userKeys, isSuccess },
  } = useSelector((state) => state.registerData);

  const [type, setType] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setType(userKeys?.filter((f) => f.id === type_id));
    }
  }, [isSuccess]);

  return (
    <Root style={{ display: open ? 'flex' : 'none' }}>
      <MainContainer>
        <CloseIcon
          style={{ alignSelf: 'flex-end', cursor: 'pointer' }}
          onClick={closeModal}
        />
        <ContextContainer>
          <Svg.SmileyFaceIcon />
          <Text
            variant="h2"
            fontSize="1.2rem"
            color="dark"
            fontWeight="500"
            textAlign="center"
          >
            {t('hello')} {name}
          </Text>
          {type[0]?.key == KEYS.GYM ? (
            <Text textAlign="center" fontSize="1rem" color="dark">
              {t('Please enter the domain information you want to make available')}
            </Text>
          ) : (
            <Text textAlign="center" fontSize="1rem" color="dark">
              {t('Please Select the Type of Course You Want to Teach')}
            </Text>
          )}
        </ContextContainer>
        <  div>
          <StyledButton approve onClick={approveAction}>
            {type[0]?.key === KEYS.DIETIAN && t('CREATE SESSION')}
            {type[0]?.key === KEYS.PT && t('CREATE PRIVATE LESSON')}
            {type[0]?.key === KEYS.GYM && t('HIRE SPORTS AREA')}
          </StyledButton>
        </div>
        {type[0]?.key !== KEYS.GYM && (
          <  div>
            <StyledButton approve onClick={cancelAction}>
              {type[0]?.key === KEYS.DIETIAN ? t('CREATE PACKAGE SESSION') : t('CREATE A GROUP LESSON')}
            </StyledButton>
          </div>
        )}
      </MainContainer>
    </Root>
  );

  function approveAction() {
    approve();
  }

  function cancelAction() {
    cancel();
  }
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
  background: white;
  border-radius: 20px;
  width: 35vw;

  @media ${device.sm} {
    width: 55vw;
    height: 55vh;
    overflow: scroll;
  }
`;

const StyledButton = styled(Link)`
  font-size: 1.2rem;
  color: ${(p) => (p.approve ? 'var(--blue)' : 'black')};
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: var(--blue);
  }
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  justify-content: center;
  align-items: center;
  padding: 60px 110px 30px;

  svg {
    margin-bottom: 15px;
  }

  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;

export default CreateCalenderModal;
