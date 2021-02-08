import React, { useState } from 'react';

import {StepOne, StepTwo, StepThree, StepFour, StepFinish} from './steps';
import { StepBar } from '../../components';

const RegisterSteps = (props) => {
	const [steps, setSteps] = useState("step1");
	/**
		* @param {string} step
	*/
	const step = step => {
		const step1 = { key: 0, num: 1, page: () => <StepOne setSteps={setSteps} />}
		const step2 = { key: 1, num: 2, page: () => <StepTwo setSteps={setSteps} />}
		const step3 = { key: 2, num: 3, page: () => <StepThree setSteps={setSteps} />}
		const step4 = { key: 3, num: 4, page: () => <StepFour setSteps={setSteps} />}
		const finish = { key: 4, num: 4, page: () => <StepFinish setSteps={setSteps} />}

		switch (step) {
			case "finish":
				return finish;

			case "step4":
				return step4;

			case "step3":
				return step3;

			case "step2":
				return step2;

			case "step1":
				return step1;

			default:
				return step1;
		}
	}
	return (
		<>
			<StepBar stepKey={step(steps).key} stepNum={step(steps).num} num="4" />
			{step(steps).page()}
		</>
	);
};

export default RegisterSteps;