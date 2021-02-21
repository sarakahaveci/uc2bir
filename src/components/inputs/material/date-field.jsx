// @ts-nocheck
import React from 'react';
import TextField from '@material-ui/core/TextField';

const DateField = ({
  id,
  name,
  label,
  required = false,
  defaultValue = '',
  autoComplete = 'on',
  className = '',
  icon = false,
  onChange = () => {},
  onKeyUp = () => {},
  maxLength = '',
}) => {
  return (
    <div className="materials">
      <TextField
        className={`material-inputs ${className} ${icon ? 'has-icon' : ''}`}
        id={id}
        onChange={onChange}
        defaultValue={defaultValue}
        name={name}
        label={label}
        type="date"
        autoComplete={autoComplete}
        maxLength={maxLength}
        inputProps={{
          min: '1950-01-24',
          max: new Date().toISOString().split('T')[0],
        }}
        onKeyUp={onKeyUp}
        variant="standard"
        required={required}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default DateField;
