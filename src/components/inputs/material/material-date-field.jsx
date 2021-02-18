// @ts-nocheck
import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DateField = ({
  id,
  name,
  label,
  type,
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
  const [selectedDate, setSelectedDate] = useState(
    new Date('2002-01-01T21:00:00')
  );

  const handleDateChange = (date, callBack) => {
    const event = {
      target: {
        name: name,
        value: date,
      },
    };
    setSelectedDate(date);
    return callBack(event);
  };
  return (
    <div className="materials">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <>
          <KeyboardDatePicker
            className={`material-inputs ${className} ${
              icon ? 'has-icon' : 'date-has-icon'
            }`}
            disableToolbar
            variant="inline"
            format="dd.MM.yyyy"
            name={name}
            required={required}
            label={label}
            value={selectedDate}
            onChange={(date) => handleDateChange(date, onChange)}
            KeyboardButtonProps={{
              'aria-label': 'Tarih Gir',
            }}
          />
        </>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DateField;
