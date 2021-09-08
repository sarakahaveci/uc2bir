// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components/macro';
import { Spinner } from 'react-bootstrap';
import { theme } from 'utils';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SimpleSelect = ({
  name,
  label,
  items = [],
  required = false,
  icon = false,
  onChange = () => {},
  changeValue,
  defaultValue = '',
  defaultValueMultiple = [],
  settings = false,
  disabled = false,
  state = {},
  multiple = false,
  labelFontSize = '',
  action = () => {},
}) => {
  const { t } = useTranslation();

  const classes = useStyles();
  const [val, setVal] = useState(
    multiple ? defaultValueMultiple : defaultValue
  );

  const handleChange = (event) => {
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
    <Materials
      ref={material}
      settings={settings}
      className={`materials select-materials ${icon ? 'has-icon' : ''}`}
    >
      <FormControl className={classes.formControl}>
        {icon && icon({ className: 'material-inputs-icon' })}
        <InputLabel
          id={name}
          style={{ fontSize: labelFontSize && labelFontSize }}
        >
          {label}
          {required && <> *</>}
        </InputLabel>
        <Select
          labelId={name}
          id={name}
          name={name}
          multiple={multiple}
          value={val}
          onChange={(event) => handleChange(event)}
          required={required}
          disabled={disabled}
        >
          {items.map((val, key) => (
            <MenuItem
              key={`select-${name}-${key}`}
              value={val.id}
              selected={val.selected}
            >
              {val.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default SimpleSelect;
