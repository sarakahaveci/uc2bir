import React, { createContext, useState } from 'react';

import { StepBar } from 'components';
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
  const [stepNumber, setStepNumber] = useState(1);

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
    </StepContext.Provider>
  );
};

export default RegisterSteps;
