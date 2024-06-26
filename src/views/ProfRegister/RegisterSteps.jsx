import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { StepBar, Text, Svg } from 'components';
import RegisterPage from './RegisterPage';
import { PERSONAL_TRAINER, WORK_PLACE } from '../../constants';
import { useTranslation } from 'react-i18next';

export const StepContext = createContext();

const RegisterSteps = ({ userTypeId, setUserTypeId }) => {
  const { t } = useTranslation();

  const [stepNumber, setStepNumber] = useState(1);
  const [open, setOpen] = useState(false);

  const setUserTypeIdHandler = useCallback(
    (value) => setUserTypeId(value),
    [userTypeId]
  );

  let stepCount;

  if (userTypeId === WORK_PLACE) {
    stepCount = 7;
  } else if (userTypeId === PERSONAL_TRAINER) {
    stepCount = 10;
  } else {
    stepCount = 9;
  }

  useEffect(() => {
    if (stepNumber > stepCount) {
      setStepNumber(stepCount);
      setOpen(true);
    }
  }, [stepNumber]);

  return (
    <StepContext.Provider
      value={{
        stepNumber,
        setStepNumber,
      }}
    >
      <StepBar step={stepNumber} stepCount={stepCount} />

      <RegisterPage
        setUserTypeId={setUserTypeIdHandler}
        userTypeId={userTypeId}
        stepNumber={stepNumber}
      />

      <Modal show={open} onHide={() => setOpen(false)} backdrop="static">
        <Container>
          <Svg.SuccessIcon />

          <Text
            variant="h2"
            fontSize="1.2rem"
            color="dark"
            fontWeight="500"
            textAlign="center"
          >
            {t('WELCOME TO THE CLUB!')}
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            {t(
              'Our related friends will contact you as soon as possible for your system approval'
            )}
          </Text>
        </Container>

        <Modal.Footer closeButton={false}>
          <StyledLink to="/myprofile/settings/profile">
            {t('PROFILE')}
          </StyledLink>
        </Modal.Footer>
      </Modal>
    </StepContext.Provider>
  );
};

export default RegisterSteps;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  color: var(--blue);
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: var(--blue);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 110px 30px;
  svg {
    margin-bottom: 15px;
  }
  @media ${device.sm} {
    padding: 20px 0;
  }
`;
