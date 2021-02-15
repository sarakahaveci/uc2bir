import React, { createContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

import { StepBar, Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepFive from './StepFive';
import StepSix from './StepSix';
import StepSeven from './StepSeven';
import StepEight from './StepEight';
import StepNine from './StepNine';

export const StepContext = createContext();

const RegisterSteps = () => {
  const [stepNumber, setStepNumber] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (stepNumber === 10) {
      setOpen(true);
    }
  }, [stepNumber]);

  let page;

  switch (stepNumber) {
    case 1:
    case 2:
      page = <StepOne />;
      break;
    case 3:
    case 4:
      page = <StepThree />;
      break;
    case 5:
      page = <StepFive />;
      break;

    case 6:
      page = <StepSix />;
      break;

    case 7:
      page = <StepSeven />;
      break;

    case 8:
      page = <StepEight />;
      break;

    case 9:
    case 10:
      page = <StepNine />;
      break;

    default:
      break;
  }

  return (
    <StepContext.Provider
      value={{
        stepNumber,
        setStepNumber,
      }}
    >
      <StepBar step={stepNumber} stepCount={9} />
      {page}

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
            ARAMIZA HOŞGELDİN!
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            Sistem onayın için ilgili arkadaşlarımız en kısa zamanda seninle
            iletişime geçecek.
          </Text>
        </Container>

        <div className="modal-footer">
          <StyledLink to="/">ANASAYFA</StyledLink>
        </div>
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
`;
