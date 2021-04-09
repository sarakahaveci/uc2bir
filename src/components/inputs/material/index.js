/* eslint-disable react/display-name */
import React from 'react';
import TextField from './text-field';
import TexAreaField from './textarea-field';
import DateField from './date-field';
import { default as MaterialDateField } from './material-date-field';
import CheckBox from './check-box';
import SimpleSelect from './simple-select';
import RadioButtonsGroup from './radio-button-groups';
import RadioButton from './RadioButton';
import { default as MCheckBox } from './m-check-box';
import PhoneField from './phone-field';
import CheckBoxGroup from './check-box-group';
import IOSSwitch from './m-switch';
export const Material = {
  TextField,
  CheckBox,
  SimpleSelect,
  MCheckBox,
  RadioButtonsGroup,
  PhoneField,
  MaterialDateField,
  CheckBoxGroup,
  TexAreaField,
  RadioButton,
  IOSSwitch,
  email: (props) => <TextField {...props} />,
  number: (props) => <TextField {...props} />,
  date: (props) => <DateField {...props} />,
  materialdate: (props) => <MaterialDateField {...props} />,
  password: (props) => <TextField {...props} />,
  text: (props) => <TextField {...props} />,
  hidden: (props) => <TextField {...props} />,
  select: (props) => <SimpleSelect {...props} />,
  phone: (props) => <PhoneField {...props} />,
  radio: (props) => <RadioButtonsGroup {...props} />,
  textarea: (props) => <TexAreaField {...props} />,
  checkbox: (props) => <CheckBox {...props} />,
  mcheckbox: (props) => <MCheckBox {...props} />,
};
