// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import editIcon from '../../statics/svg/images/pencil.svg';
import closeIcon from '../../statics/svg/images/big-close.svg';
import styled from 'styled-components/macro';
import { Spinner } from 'react-bootstrap';

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
  settings = false,
  disabled = false,
  multiple,
  state = {},
  action = () => {},
}) => {
  const classes = useStyles();
  const [val, setVal] = useState(defaultValue);

  const handleChange = (event) => {
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
    <Materials
      ref={material}
      settings={settings}
      className={`materials select-materials ${icon ? 'has-icon' : ''}`}
    >
      <FormControl className={classes.formControl}>
        {icon && icon({ className: 'material-inputs-icon' })}
        <InputLabel id={name}>
          {label}
          {required && <> *</>}
        </InputLabel>
        <Select
          labelId={name}
          id={name}
          name={name}
          value={val}
          onChange={(event) => handleChange(event)}
          required={required}
          multiple={multiple}
          disabled={textDisbled()}
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

export default SimpleSelect;
