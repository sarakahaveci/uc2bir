// @ts-nocheck
import React, { useState } from 'react';

import InputMask from 'react-input-mask';
import { Svg } from 'components';
import { TextField } from '@material-ui/core';

const PhoneField = ({
  id,
  name,
  label,
  type,
  required = false,
  defaultValue = '',
  autoComplete = 'on',
  className = '',
  icon = false,
  onChange = () => { },
  value = '',
  onKeyUp = () => { },
  maxLength = '',
  icon2,
  icon2Callback,
}) => {
  const [shrink, setShrink] = useState(false);
  return (
    <div className="materials">
      <InputMask
        mask="\0(999) 999 99 99"
        value={value}
        disabled={false}
        onChange={onChange}
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
            label="Telefon *"
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