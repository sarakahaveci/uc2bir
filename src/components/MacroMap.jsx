import React from 'react';
import { Material } from '../components/inputs/material';

const MacroMap = ({ macro = [], data = {}, setData }) => {
  return (
    <>
      {macro.map((val, key) => {
        return (
          <div style={{ width: '100%' }} key={key}>
            {val.type === 'radio'
              ? Material[val.type]({
                  id: val.name,
                  name: val.name,
                  type: val.type,
                  label: val.text,
                  required: val.required,
                  onChange: (e) =>
                    setData({ ...data, [e.target.name]: e.target.value }),
                  autoComplete: 'off',
                  items: val.items ? val.items : [],
                })
              : val.type === 'select'
              ? Material[val.type]({
                  id: val.name,
                  name: val.name,
                  type: val.type,
                  label: val.text,
                  required: val.required,
                  onChange: (e) =>
                    setData({ ...data, [e.target.name]: e.target.value }),
                  autoComplete: 'off',
                  icon: val.icon,
                  items: val.items ? val.items : [],
                })
              : val.type === 'checkbox'
              ? Material[val.type]({
                  id: val.name,
                  name: val.name,
                  type: val.type,
                  label: val.text,
                  required: val.required,
                  onChange: (e) =>
                    setData({ ...data, [e.target.name]: e.target.value }),
                  autoComplete: 'off',
                  icon: val.icon,
                })
              : val.type === 'materialdate'
              ? Material[val.type]({
                  id: val.name,
                  name: val.name,
                  required: val.required,
                  type: val.type,
                  label: val.text,
                  minDate: val.minDate,
                  maxDate: val.maxDate,
                  onChange: (e) =>
                    setData({ ...data, [val.name]: e.target.checked ? 1 : 0 }),
                  checked: data[val.name] ? true : false,
                })
              : Material[val.type]({
                  id: val.name,
                  name: val.name,
                  required: val.required,
                  type: val.type,
                  label: val.text,
                  onChange: (e) =>
                    setData({ ...data, [val.name]: e.target.checked ? 1 : 0 }),
                  checked: data[val.name] ? true : false,
                })}
          </div>
        );
      })}
    </>
  );
};

export default MacroMap;
