import React from 'react';

const StepBar = ({ step, stepCount }) => {
  return (
    <div className="step-bar">
      <div
        style={{ width: `${Math.ceil(100 / (stepCount / step))}%` }}
        className="bar"
      ></div>
      <span>
        {step}/{stepCount}
      </span>
    </div>
  );
};

export default StepBar;
