import React from 'react';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButtonsGroup = ({
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
  const BlueRadio = withStyles({
    root: {
      color: '#909090',
      '&$checked': {
        color: '#00B2A9',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
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
          {items.map((val, key) => (
            <FormControlLabel
              key={`radio-${name}-${key}`}
              value={val.val}
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
