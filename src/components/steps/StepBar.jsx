import React from 'react';

const StepBar = ({stepKey, stepNum, num}) => {
    return (
        <div className="step-bar">
            <div style={{ width: `${Math.ceil(100 / (num / stepKey))}%` }} className="bar"></div>
            <span>{stepNum}/{num}</span>
        </div>
    );
};

export default StepBar;