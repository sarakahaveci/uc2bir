import React from 'react';

import BlueRadio from './RadioButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButtonsGroup = ({
  name,
  label,

  items = [],
  required = false,
  defaultValue = '',

  icon = false,
  onChange = () => {},
}) => {
  const [val, setVal] = React.useState(defaultValue);

  const handleChange = (event, callBack) => {
    setVal(event.target.value);
    return callBack(event);
  };

  return (
    <div className={`materials radio-materials ${icon ? 'has-icon' : ''}`}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label={name}
          name={name}
          value={val}
          onChange={(e) => handleChange(e, onChange)}
        >
          {items?.map((val, key) => (
            <FormControlLabel
              key={`radio-${name}-${key}`}
              value={val.val ? val.val : val.name}
              control={<BlueRadio required={required} />}
              label={val.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioButtonsGroup;
