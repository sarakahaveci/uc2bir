// @ts-nocheck
import React, { useState, useEffect } from 'react';

import { default as MaterialTextField } from '@material-ui/core/TextField';

import { symbolsArr } from '../../../constants';

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
  iconCallback = () => {},
  onChange = () => {},
  value = null,
  onKeyUp = () => {},
  maxLength = '',
  icon2 = () => {},
  icon2Callback,
  changeValue,
  inputProps,
  ...restProps
}) => {
  const [val, setVal] = useState(defaultValue);

  const onChangeHandler = (event) => {
    setVal(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (changeValue) setVal(changeValue);
  }, [changeValue]);
  return (
    <div className="materials">
      {icon &&
        icon({
          className: 'material-inputs-icon',
          onClick: () => iconCallback(),
        })}
      <MaterialTextField
        className={`material-inputs ${className} ${icon ? 'has-icon' : ''}`}
        id={id}
        onChange={onChangeHandler}
        defaultValue={defaultValue}
        value={val}
        name={name}
        label={label}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onKeyUp={onKeyUp}
        variant="standard"
        required={required}
        inputProps={inputProps}
        onKeyDown={(e) =>
          type === 'number' && symbolsArr.includes(e.key) && e.preventDefault()
        }
        {...restProps}
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
