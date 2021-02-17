// @ts-nocheck
import React, { useState } from 'react';

import InputMask from 'react-input-mask';
import { Svg } from 'components';
import { TextField } from '@material-ui/core';

const PhoneField = ({
  required = false,
  setData = '',
  data = '',
  onChange = () => { },
  value = '',
}) => {
  const [shrink, setShrink] = useState(false);
  const [val, setVal] = useState(value);
  onChange = (event) => {
    setVal(event.target.value);
    setData({...data, phone: event.target.value})
  }
  return (
    <div className="materials">
      <InputMask
        mask="\0(999) 999 99 99"
        disabled={false}
        onChange={onChange}
        value={val}
        alwaysShowMask={false}
        maskChar=" "
        onFocus={() => setShrink(true)}
        onBlur={() =>
          // Had to do that for fixing shrink
          value !== '0(   )          ' ? setShrink(true) : setShrink(false)
        }
      >
        {() => (
          <TextField
            InputLabelProps={{ shrink }}
            label="Telefon"
            required={required}
            className="material-inputs has-icon"
            InputProps={{
              startAdornment: (
                <Svg.PhoneIcon
                  className="material-inputs-icon"
                  style={{ top: '6px' }}
                />
              ),
            }}
          />
        )}
      </InputMask>
    </div>
  );
};

export default PhoneField;