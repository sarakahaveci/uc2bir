// @ts-nocheck
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

const CheckBox = ({
  className = '',
  position = 'left',
  variant = 'primary',
  label,
  name,
  required = false,
  checked = false,
  onChange = () => {},
}) => {
  return (
    <>
      <FormControl className="materials" component="fieldset">
        <FormGroup aria-label="position" row>
          <label className={`materials-container ${className}`}>
            {label}
            <input
              name={name}
              type="checkbox"
              checked={checked}
              required={required}
              onChange={onChange}
            />
            <span className="checkmark"></span>
          </label>
        </FormGroup>
      </FormControl>
    </>
  );
};

export default CheckBox;
