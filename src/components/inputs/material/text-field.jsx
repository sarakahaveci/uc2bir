// @ts-nocheck
import React, { useState, useEffect } from 'react';

import { default as MaterialTextField } from '@material-ui/core/TextField';

import { symbolsArr } from '../../../constants';

import svg from '../../statics/svg/images/pencil.svg';
import styled from 'styled-components/macro';

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
  password,
  changeValue,
  inputProps,
  settings = false,
  ...restProps
}) => {
  const [val, setVal] = useState(defaultValue);
  const [newType, setNewType] = useState(type);

  const onChangeHandler = (event) => {
    setVal(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (changeValue) setVal(changeValue);
  }, [changeValue]);
  return (
    <Materials className="materials" settings={settings}>
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
        type={newType}
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
      {password &&
        password({
          className: 'material-inputs-icon2',
          onClick: () => setNewType(newType === 'password' ? 'text' : 'password'),
        })}
    </Materials>
  );
};

const Materials = styled.div`
  ${(props) =>
    props.settings &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-top: 30px;
      margin-bottom: 30px;

      &:focus-within {
        &:after {
          content: "";
          background: url("${svg}");
          position: absolute;
          right: 25px;
          bottom: 15px;
          width: 20px;
          height: 20px;
          background-size: cover;
          background-repeat: no-repeat; 
        }
      }
    `}
`;

export default TextField;
