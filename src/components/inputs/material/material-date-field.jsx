// @ts-nocheck
import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import trLocale from 'date-fns/locale/tr';
import enLocale from 'date-fns/locale/en-US';

import svg from '../../statics/svg/images/pencil.svg';
import styled from 'styled-components/macro';

const localeMap = {
  /* set locale */
  en: enLocale,
  tr: trLocale,
};

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
  minDate,
  maxDate,
  settings = false,
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
    <Materials className="materials" settings={settings}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap.tr}>
        <>
          <KeyboardDatePicker
            minDate={minDate}
            maxDate={maxDate}
            className={`material-inputs ${className} ${
              icon ? 'has-icon' : 'date-has-icon'
            }`}
            variant="inline"
            format="dd.MM.yyyy"
            defaultValue={defaultValue}
            name={name}
            required={required}
            label={label}
            value={value || selectedDate}
            onChange={(date) => handleDateChange(date, onChange)}
            KeyboardButtonProps={{
              'aria-label': 'Tarih Gir',
            }}
          />
        </>
      </MuiPickersUtilsProvider>
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

export default DateField;
