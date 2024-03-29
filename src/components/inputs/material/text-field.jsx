import React, { useState, useEffect, useRef } from 'react';

import { default as MaterialTextField } from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';

import { symbolsArr } from '../../../constants';

import styled from 'styled-components/macro';
import { Spinner } from 'react-bootstrap';
import { theme } from 'utils';

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
  onKeyUp = () => {},
  onBlur = () => {},
  maxLength = '',
  password,
  changeValue,
  inputProps,
  settings = false,
  state = {},
  action = () => {},
  mask = null,
  rightTextNode = null,
  error = false,
  helperText,
  ...restProps
}) => {
  const { t } = useTranslation();

  const [val, setVal] = useState(defaultValue);
  const [newType, setNewType] = useState(type);

  const onChangeHandler = (event) => {
    setVal(event.target.value);
    onChange(event);
  };

  const editRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const editShow = () => {
    if (editRef.current) {
      editRef.current.style.color = theme.colors.blue;
      setLoading(true);
    }
  };
  const editClose = () => {
    if (editRef.current) {
      editRef.current.style.color = theme.colors.gray11;
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const save = (name, val) => {
    action(name, val);
  };

  const spinnerRef = useRef(null);
  const material = useRef();

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
    if (changeValue !== undefined) setVal(changeValue);
  }, [changeValue]);

  return (
    <Materials ref={material} settings={settings} className="materials">
      {icon &&
        icon({
          className: 'material-inputs-icon',
          onClick: () => iconCallback(),
        })}
      <InputMask
        mask={mask}
        maskChar=" "
        onChange={onChangeHandler}
        value={val}
        name={name}
        disabled={disabled}
        onBlur={onBlur}
      >
        {() => (
          <MaterialTextField
            className={`material-inputs ${
              rightTextNode ? 'right-node' : null
            } ${className} ${icon ? 'has-icon' : ''}`}
            id={id}
            defaultValue={defaultValue}
            label={label}
            type={newType}
            autoComplete={autoComplete}
            maxLength={maxLength}
            onKeyUp={onKeyUp}
            error={error}
            helperText={!!error ? helperText : ''}
            variant="standard"
            required={required}
            inputProps={inputProps}
            onKeyDown={(e) =>
              type === 'number' &&
              symbolsArr.includes(e.key) &&
              e.preventDefault()
            }
            disabled={disabled}
            onChange={onChangeHandler}
            value={val}
            name={name}
            {...restProps}
          />
        )}
      </InputMask>

      {password &&
        password({
          className: 'material-inputs-icon2',
          onClick: () =>
            setNewType(newType === 'password' ? 'text' : 'password'),
        })}
      {settings && (
        <>
          <Save
            type="button"
            ref={editRef}
            className={`${name} save`}
            onClick={() => save(name, val)}
          >
            {t('save')}
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

      <div className="input-right-node">{rightTextNode && rightTextNode}</div>
    </Materials>
  );
};

const Materials = styled.div`
  ${(props) =>
    props.settings &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-bottom: 30px;
    `}
  ${(props) =>
    props.settings === 'current' &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-bottom: 30px;

      .save, .edit {
        display: none!important;
      }
    `}
`;

const Save = styled.button`
  position: absolute;
  right: 25px;
  bottom: 15px;
  width: auto;
  height: 20px;
  display: ${(props) => (!props.edit ? 'inline-flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  color: var(--gray4);
  font-size: 10pt;
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
