import React, { useState } from 'react';

import { StepBar } from 'components';
import StepOne from './StepOne';

const RegisterSteps = (props) => {
  const [stepName, setStepName] = useState('step1');

  let page;

  switch (stepName) {
    case 'step1':
      page = <StepOne />;
      break;
    case 'step2':
      page = <StepTwo />;
      break;
    case 'step3':
      page = <StepThree />;
      break;

    default:
      break;
  }

  return (
    <>
      <StepBar />
      {page}
    </>
  );
};

export default RegisterSteps;
