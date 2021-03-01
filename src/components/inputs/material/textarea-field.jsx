// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

import { default as MaterialTextField } from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';

import { symbolsArr } from '../../../constants';

import editIcon from '../../statics/svg/images/pencil.svg';
import closeIcon from '../../statics/svg/images/big-close.svg';
import styled from 'styled-components/macro';
import { Spinner } from 'react-bootstrap';

const TextField = ({
  id,
  name,
  label,
  type,
  required = false,
  disabled = false,
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
  mask = null,
  rows = 6,
  ...restProps
}) => {
  const [val, setVal] = useState(defaultValue);
  const [newType, setNewType] = useState(type);

  const onChangeHandler = (event) => {
    setVal(event.target.value);
    onChange(event);
  };

  const editRef = useRef(null);
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const editShow = () => {
    if (editRef.current) {
      editRef.current.style.display = 'block';
      setLoading(true);
    }
  };
  const editClose = () => {
    if (editRef.current) {
      editRef.current.style.display = 'none';
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const save = (name, val) => {
    action(name, val);
    setTimeout(() => {
      setEdit(true);
    }, 2000);
  };

  const spinnerRef = useRef(null);
  const material = useRef();
  const textDisbled = () => {
    if (disabled) {
      return disabled;
    } else if (settings === true) {
      return edit;
    } else {
      return disabled;
    }
  };

  useEffect(() => {
    if (state.data) {
      state.isSuccess ? editClose() : editShow();
    }
  }, [state]);

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      material.current?.contains(event.target) ? editShow() : editClose();
    });
  }, [material]);

  useEffect(() => {
    if (changeValue) setVal(changeValue);
  }, [changeValue]);
  return (
    <Materials ref={material} settings={settings} className="materials">
      {icon &&
        icon({
          className: 'material-inputs-icon',
          onClick: () => iconCallback(),
        })}
      <MaterialTextField
        className={`material-inputs ${className} ${icon ? 'has-icon' : ''}`}
        id={id}
        defaultValue={defaultValue}
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
        disabled={textDisbled()}
        onChange={onChangeHandler}
        value={val}
        name={name}
        multiline
        rows={rows}
        {...restProps}
      />
      {password &&
        password({
          className: 'material-inputs-icon2',
          onClick: () =>
            setNewType(newType === 'password' ? 'text' : 'password'),
        })}
      {settings && (
        <>
          <Edit
            type="button"
            ref={editRef}
            className={`${name} edit`}
            onClick={() => setEdit(!edit)}
            edit={edit}
          />
          <Save
            type="button"
            className={`${name} save`}
            onClick={() => save(name, val)}
            edit={edit}
          >
            Kaydet
          </Save>
          {loading && (
            <StyledSpinner
              className={`${name}`}
              animation="border"
              size="md"
              ref={spinnerRef}
              loading={state.isLoading}
            />
          )}
        </>
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
    `}
  ${(props) =>
    props.settings === 'current' &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-top: 30px;
      margin-bottom: 30px;

      .save, .edit {
        display: none!important;
      }
    `}
`;

const Save = styled.button`
  position: absolute;
  right: 50px;
  bottom: 15px;
  width: auto;
  height: 20px;
  display: ${(props) => (!props.edit ? 'inline-flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  color: var(--blue);
  font-size: 10pt;
`;

const Edit = styled.button`
  content: '';
  background: url('${(props) => (props.edit ? editIcon : closeIcon)}');
  position: absolute;
  right: 25px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  display: none;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  right: 25px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  display: ${(props) => (props.loading ? 'block' : 'none')};
`;

export default TextField;
