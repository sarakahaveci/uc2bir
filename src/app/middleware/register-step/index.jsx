import React, { useState } from 'react';

import StepOne from './step-one';
import StepTwo from './step-two';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const RegisterStep = (props) => {
    const { registerStepOne, registerStepTwo } = props;
    const [steps, setSteps] = useState("step1");
    /**
     * @param {string} step
     */
    const step = step => {
        const step1 = {key: 0, num: 1, page: () => <StepOne setSteps={setSteps}/>, action: registerStepOne.isSuccess}
        const step2 = {key: 1, num: 2, page: () => <StepTwo setSteps={setSteps}/>, action: registerStepTwo.isSuccess}
        const step3 = {key: 2, num: 3, page: () => <StepTwo setSteps={setSteps}/>, action: registerStepTwo.isSuccess}
        const step4 = {key: 3, num: 4, page: () => <StepTwo setSteps={setSteps}/>, action: registerStepTwo.isSuccess}
        const finish = {key: 4, num: 5, page: () => <StepTwo setSteps={setSteps}/>, action: registerStepTwo.isSuccess}

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
            <div className="step-bar">
                <div style={{ width: `${Math.ceil(100 / (4 / step(steps).key))}%` }} className="bar"></div>
                <span>{step(steps).num}/4</span>
            </div>
            {step(steps).page()}
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({  }, dispatch),
    }
}

const mapStateToProps = ({ registerStepOne, registerStepTwo }) => ({ registerStepOne, registerStepTwo });

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStep);