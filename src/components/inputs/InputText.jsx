// @ts-nocheck
import React from 'react';
import { useTranslation } from 'react-i18next';

const InputText = ({
  className = '',
  labelText,
  labelName,
  inputName,
  inputVal = null,
  required = false,
  inputType = 'text',
  onKeyUp = () => {},
  onChange = () => {},
  maxLength = '',
}) => {
  const { t } = useTranslation();

  return (
    <div className={`component-inputs form-groups ${className}`}>
      <label className="label" htmlFor={labelName}>
        {labelText}
      </label>
      <input
        required={required}
        type={inputType}
        name={inputName}
        value={inputVal}
        onChange={onChange}
        className="form-control"
        maxLength={maxLength}
        onKeyUp={onKeyUp}
      />
      <small style={{ display: 'none' }} className="error hidden form-text">
        {t('please')} {labelText} {t('enter')}!
      </small>
    </div>
  );
};

export default InputText;
