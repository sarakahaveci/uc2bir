// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

import { default as MaterialTextField } from '@material-ui/core/TextField';

import { symbolsArr } from '../../../constants';

import svg from '../../statics/svg/images/pencil.svg';
import styled from 'styled-components/macro';
import { Spinner } from 'react-bootstrap';

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
  state = {},
  action = () => {},
  ...restProps
}) => {
  const [val, setVal] = useState(defaultValue);
  const [newType, setNewType] = useState(type);

  const onChangeHandler = (event) => {
    setVal(event.target.value);
    onChange(event);
  };

  const saveRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const saveShow = () => {
    if (saveRef.current) {
      saveRef.current.style.display = 'block';
      setLoading(true);
    }
  };
  const saveClose = () => {
    if (saveRef.current) {
      saveRef.current.style.display = 'none';
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const spinnerRef = useRef(null);
  const material = useRef();

  useEffect(() => {
    state.isSuccess ? saveClose() : saveShow();
  }, [state]);

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      material.current?.contains(event.target) ? saveShow() : saveClose();
    });
  }, [material]);

  useEffect(() => {
    if (changeValue) setVal(changeValue);
  }, [changeValue]);
  return (
    <Materials ref={material} className="materials" settings={settings}>
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
          onClick: () =>
            setNewType(newType === 'password' ? 'text' : 'password'),
        })}
      <Save
        type="button"
        ref={saveRef}
        className={`${name} save`}
        onClick={() => action(name, val)}
      />
      {loading && (
        <StyledSpinner
          className={`${name}`}
          animation="border"
          size="md"
          ref={spinnerRef}
          loading={state.isLoading}
        />
      )}
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

      .save {
        content: "";
        background: url("${svg}");
        position: absolute;
        right: 25px;
        bottom: 15px;
        width: 20px;
        height: 20px;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    `}
`;

const Save = styled.button`
  display: none;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  right: 0px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  display: ${(props) => (props.loading ? 'block' : 'none')};
`;

export default TextField;
