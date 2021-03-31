/* eslint-disable react/display-name */

import React, { useState } from 'react';

import { StepOne, StepTwo, StepThree, StepFour, StepFinish } from './steps';
import { StepBar } from '../../components';

import { useSelector } from 'react-redux';

const RegisterSteps = () => {
  const { data: registerData } = useSelector((state) => state.registerData);

  const [steps, setSteps] = useState('step1');

  const step = (step) => {
    const step1 = {
      num: 1,
      page: () => <StepOne setSteps={setSteps} registerData={registerData} />,
    };
    const step2 = {
      num: 2,
      page: () => <StepTwo setSteps={setSteps} registerData={registerData} />,
    };
    const step3 = {
      num: 3,
      page: () => <StepThree setSteps={setSteps} registerData={registerData} />,
    };
    const step4 = {
      num: 4,
      page: () => <StepFour setSteps={setSteps} registerData={registerData} />,
    };
    const finish = {
      num: 4,
      page: () => (
        <StepFinish setSteps={setSteps} registerData={registerData} />
      ),
    };

    switch (step) {
      case 'finish':
        return finish;

      case 'step4':
        return step4;

      case 'step3':
        return step3;

      case 'step2':
        return step2;

      case 'step1':
        return step1;

      default:
        return step1;
    }
  };
  return (
    <>
      <StepBar step={step(steps).num} stepCount="4" />
      {step(steps).page()}
    </>
  );
};

export default RegisterSteps;
