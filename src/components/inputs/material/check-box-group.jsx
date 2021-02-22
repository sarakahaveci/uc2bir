// @ts-nocheck
import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckBoxGroup = ({
  id,
  name,
  label,
  type,
  items = [],
  required = false,
  defaultValue = '',
  autoComplete = 'on',
  className = '',
  icon = false,
  onChange = () => {},
  value = '',
  onKeyUp = () => {},
  maxLength = '',
}) => {
  const [val, setVal] = useState(value);

  const handleChange = () => {
    setVal(!val);
  };

  return (
    <FormGroup style={{marginBottom: 7}} className="materials">
      <FormControlLabel
        control={
          <GreenCheckbox
            required={required}
            onChange={onChange} 
            name={name} 
          />}
        label={label}
      />
    </FormGroup>
  );
}

export default CheckBoxGroup;