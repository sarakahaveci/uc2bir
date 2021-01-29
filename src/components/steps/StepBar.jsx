import React from 'react';

const StepBar = ({stepKey, stepNum}) => {
    return (
        <div className="step-bar">
            <div style={{ width: `${Math.ceil(100 / (4 / stepKey))}%` }} className="bar"></div>
            <span>{stepNum}/4</span>
        </div>
    );
};

export default StepBar;