// @ts-nocheck
import React from 'react';

import { default as MaterialTextField } from '@material-ui/core/TextField';

const TextField = ({
  id,
  name,
  label,
  type,
  required = false,
  defaultValue = '',
  autoComplete = 'on',
  className = '',
  icon = false,
  onChange = () => {},
  value = '',
  onKeyUp = () => {},
  maxLength = '',
  icon2,
  icon2Callback,
}) => {
  return (
    <div className="materials">
      {icon && icon({ className: 'material-inputs-icon' })}
      <MaterialTextField
        className={`material-inputs ${className} ${icon ? 'has-icon' : ''}`}
        id={id}
        onChange={onChange}
        defaultValue={defaultValue}
        name={name}
        label={label}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onKeyUp={onKeyUp}
        variant="standard"
      />
      {icon2 &&
        icon2({
          className: 'material-inputs-icon2',
          onClick: () => icon2Callback(),
        })}
    </div>
  );
};

export default TextField;
