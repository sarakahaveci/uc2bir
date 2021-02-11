// @ts-nocheck
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  defaultValue = '',
  icon = false,
  onChange = () => {},
}) => {
  const classes = useStyles();
  const [val, setVal] = useState(defaultValue);

  const handleChange = (event) => {
    setVal(event.target.value);
    onChange(event);
  };
  return (
    <div className={`materials select-materials ${icon ? 'has-icon' : ''}`}>
      <FormControl className={classes.formControl}>
        {icon && icon({ className: 'material-inputs-icon' })}
        <InputLabel id={name}>{label}</InputLabel>
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
    </div>
  );
};

export default SimpleSelect;
