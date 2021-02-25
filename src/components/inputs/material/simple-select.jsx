// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import svg from '../../statics/svg/images/pencil.svg';
import styled from 'styled-components/macro';

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
}) => {
  const classes = useStyles();
  const [val, setVal] = useState(defaultValue);

  const handleChange = (event) => {
    setVal(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (changeValue) setVal(changeValue);
  }, [changeValue]);

  return (
    <Materials settings={settings} className={`materials select-materials ${icon ? 'has-icon' : ''}`}>
      <FormControl className={classes.formControl}>
        {icon && icon({ className: 'material-inputs-icon' })}
        <InputLabel id={name}>{label}{required && <> *</>}</InputLabel>
        <Select
          labelId={name}
          id={name}
          name={name}
          value={val}
          onChange={(event) => handleChange(event)}
          required={required}
        >
          {items.map((val, key) => (
            <MenuItem key={`select-${name}-${key}`} value={val.id}>
              {val.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default SimpleSelect;
