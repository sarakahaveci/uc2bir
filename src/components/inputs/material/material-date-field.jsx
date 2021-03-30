// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import trLocale from 'date-fns/locale/tr';
import enLocale from 'date-fns/locale/en-US';

import styled from 'styled-components/macro';
import { Spinner } from 'react-bootstrap';
import { theme } from 'utils';

import moment from 'moment';

const localeMap = {
  /* set locale */
  en: enLocale,
  tr: trLocale,
};

const DateField = ({
  name,
  label,
  required = false,
  defaultValue = '',
  className = '',
  icon = false,
  onChange = () => {},
  value = null,
  minDate,
  maxDate,
  disabled = false,
  settings = false,
  state = {},
  action = () => {},
  onError = () => {},
}) => {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(moment(value).toDate()) : null
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

  const editRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const editShow = () => {
    if (editRef.current) {
      editRef.current.style.color = theme.colors.blue;
      setLoading(true);
    }
  };
  const editClose = () => {
    if (editRef.current) {
      editRef.current.style.color = theme.colors.gray11;
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const save = (name, val) => {
    action(name, val);
  };

  const spinnerRef = useRef(null);
  const material = useRef();

  useEffect(() => {
    if (state.data) {
      state.isSuccess ? editClose() : editShow();
    }
  }, [state]);

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      material.current?.contains(event.target) ? editShow() : editClose();
    });
  }, [material]);
  return (
    <Materials ref={material} settings={settings} className="materials">
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap.tr}>
        <>
          <KeyboardDatePicker
            minDate={minDate}
            maxDate={maxDate}
            className={`material-inputs ${className} ${
              icon ? 'has-icon' : 'date-has-icon'
            }`}
            variant="dialog"
            okLabel="Tamam"
            cancelLabel="Çıkış"
            format="dd.MM.yyyy"
            defaultValue={defaultValue}
            name={name}
            required={required}
            onError={onError}
            label={label}
            value={selectedDate}
            onChange={(date) => handleDateChange(date, onChange)}
            disabled={disabled}
            KeyboardButtonProps={{
              'aria-label': 'Tarih Gir',
            }}
          />
        </>
      </MuiPickersUtilsProvider>
      {settings && (
        <>
          <Save
            type="button"
            ref={editRef}
            className={`${name} save`}
            onClick={() => save(name, selectedDate)}
          >
            Kaydet
          </Save>
          {loading && (
            <StyledSpinner
              className={`${name}`}
              animation="border"
              size="md"
              ref={spinnerRef}
              loading={state.isLoading}
            />
          )}
        </>
      )}
    </Materials>
  );
};

const Materials = styled.div`
  ${(props) =>
    props.settings &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-bottom: 30px;
    `}
  ${(props) =>
    props.settings === 'current' &&
    `
      border-bottom: 1px solid #AFAFAF;
      position: relative;
      margin-bottom: 30px;

      .save, .edit {
        display: none!important;
      }
    `}
`;

const Save = styled.button`
  position: absolute;
  right: 25px;
  bottom: 15px;
  width: auto;
  height: 20px;
  display: ${(props) => (!props.edit ? 'inline-flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  color: var(--gray4);
  font-size: 10pt;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  right: 25px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  display: ${(props) => (props.loading ? 'block' : 'none')};
`;

export default DateField;
