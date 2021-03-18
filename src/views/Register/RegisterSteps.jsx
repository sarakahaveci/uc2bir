/* eslint-disable react/display-name */
// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { StepOne, StepTwo, StepThree, StepFour, StepFinish } from './steps';
import { StepBar } from '../../components';

import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { getRegisterData } from '../../actions';

const RegisterSteps = () => {
  const { data: registerData, isSuccess } = useSelector(
    (state) => state.registerData
  );
  const dispatch = useDispatch();

  const err = () => {
    toast.error('Bir sorun oluştu lütfen daha sonra tekrar deneyiniz.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const actionRegisterData = () => {
    dispatch(getRegisterData(err));
  };

  useEffect(() => {
    if (!isSuccess) {
      actionRegisterData();
    }
  }, [isSuccess]);

  const [steps, setSteps] = useState('step1');
  /**
   * @param {string} step
   */
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
