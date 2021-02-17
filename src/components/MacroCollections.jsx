import React from 'react';
import { Material } from '../components/inputs/material';

const MacroCollections = ({macro=[], data={}, setData}) => {
  return (
    <>
      {macro.map((val, key) => {
          return (
            <div style={{ width: '100%' }} key={key}>
              {(val.type === 'text' ||
                val.type === 'email' ||
                val.type === 'password' ||
                val.type === 'date' ||
                val.number === 'number' ||
                val.type === 'phone') &&
                Material[val.type]({
                  id: val.name,
                  name: val.name,
                  type: val.type,
                  label: val.text,
                  required: val.required,
                  onChange: (e) =>
                    setData({ ...data, [e.target.name]: e.target.value }),
                  autoComplete: 'off',
                  icon: val.icon,
                })}
            </div>
          );
        })}
        <div style={{ width: '100%' }}>
          {macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`radio-${key}`}>
                {val.type === 'radio' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    type: val.type,
                    label: val.text,
                    required: val.required,
                    onChange: (e) =>
                      setData({ ...data, [e.target.name]: e.target.value }),
                    autoComplete: 'off',
                    items: val.items ? val.items : [],
                  })}
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%' }}>
          {macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`select-${key}`}>
                {val.type === 'select' &&
                  Material[val.type]({
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
                  })}
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%', marginBottom: 25, marginTop: 40 }}>
          {macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`check-${key}`}>
                {val.type === 'checkbox' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    required: val.required,
                    type: val.type,
                    label: val.text || (val.component && val.component()),
                    onChange: (e) =>
                      setData({
                        ...data,
                        [val.name]: e.target.checked ? 1 : 0,
                      }),
                    checked: data[val.name] ? true : false,
                  })}
              </div>
            );
          })}
        </div>
    </>
  )
}

export default MacroCollections
