import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomDatePicker(props) {
  return <StyledDatePicker {...props} locale={tr} />;
}

const StyledDatePicker = styled(DatePicker)``;
