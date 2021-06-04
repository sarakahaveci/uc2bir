import { Material } from '../components';
import React from 'react'
const macroConverter = (data, setData, val,socialMode) => {
  return val.type === 'radio'
    ? Material[val.type]({
        id: val.name,
        name: val.name,
        type: val.type,
        label: val.text,
        required: val.required,
        onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }),
        autoComplete: 'off',
        items: val.items ? val.items : [],
        inputProps: val.inputProps,
      })
    : val.type === 'select'
    ? Material[val.type]({
        id: val.name,
        name: val.name,
        type: val.type,
        label: val.text,
        required: val.required,
        onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }),
        autoComplete: 'off',
        icon: val.icon,
        items: val.items ? val.items : [],
        inputProps: val.inputProps,
      })
    : val.type !== 'checkbox'
    ? (
      socialMode && (val.name == 'name' || val.name == 'email')&&(
        <text>
          {data[val.name]}
        </text>
      )||(
        Material[val.type]({
          id: val.name,
          name: val.name,
          type: val.type,
          label: val.text,
          required: val.required,
          onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }),
          autoComplete: 'off',
          icon: val.icon,
          inputProps: val.inputProps,
        })
      )

    )
    : Material[val.type]({
        id: val.name,
        name: val.name,
        required: val.required,
        type: val.type,
        label: val.text,
        onChange: (e) =>
          setData({ ...data, [val.name]: e.target.checked ? 1 : 0 }),
        checked: data[val.name] ? true : false,
        inputProps: val.inputProps,
      });
};

export default macroConverter;
