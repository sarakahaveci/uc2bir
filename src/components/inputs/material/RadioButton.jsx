import React from 'react';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

const BlueRadio = withStyles({
  root: {
    color: '#909090',
    '&$checked': {
      color: '#00B2A9',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioButton(props) {
  return <BlueRadio {...props} />;
}
