import React, { createContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { StepBar, Text } from 'components';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import StepSix from './StepSix';
import StepSeven from './StepSeven';
import StepEight from './StepEight';
import StepNine from './StepNine';

export const StepContext = createContext();

const RegisterSteps = () => {
  const [stepNumber, setStepNumber] = useState(10);
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
      page = <StepThree />;
      break;
    case 4:
      page = <StepFour />;
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
        <div className="prof-register-modal">
          <Text variant="h2" fontSize="1.2rem" color="dark">
            Tebrikler
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            Başlangıç yapmak için harika bir gün… Şimdinin gücüne inan! Paketini
            seçmek için buradan devam et
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            ANASAYFA
          </Text>
        </div>
      </Modal>
    </StepContext.Provider>
  );
};

export default RegisterSteps;
