// @ts-nocheck
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    color: teal[300],
    '&$checked': {
      color: teal[400],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckBoxGroup = ({
  name,
  label,
  required = false,
  onChange = () => {},
}) => {
  return (
    <FormGroup style={{ marginBottom: 7 }} className="materials">
      <FormControlLabel
        control={
          <GreenCheckbox required={required} onChange={onChange} name={name} />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default CheckBoxGroup;
