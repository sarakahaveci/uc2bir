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
}) => {
  return (
    <div className="materials">
      {icon && icon({ className: 'material-inputs-icon' })}
      <MaterialTextField
        className={`material-inputs ${className} ${icon ? 'has-icon' : ''}`}
        id={id}
        onChange={onChange}
        required={required}
        defaultValue={defaultValue}
        name={name}
        label={label}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onKeyUp={onKeyUp}
        variant="standard"
      />
    </div>
  );
};

export default TextField;
