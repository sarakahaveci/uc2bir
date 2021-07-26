import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Material } from '../components/inputs/material';

const MacroCollections = ({
  macro = [],
  data = {},
  setData,
  macroSpace = true,
  social = false,
}) => {
  return (
    <>
      {macro.map((val, key) => {
        return (
          <div style={{ width: '100%' }} key={key}>
            {(val.type === 'text' ||
              val.number === 'number' ||
              val.type === 'date' ||
              val.type === 'email' ||
              val.type === 'password' ||
              val.type === 'phone') &&
              (social && (val.name == 'name' || val.name == 'email') &&
                <div style={{ display: 'flex', borderColor: 'var(--blue)', opacity: '0.7', borderBottomStyle: 'solid', borderWidth: '1px', padding: '4px 0', height: '45px', marginBottom: '10px' }}>
                  {
                    val.icon && val.icon({
                      style: { marginRight: '5px' },
                      className: 'material-inputs-icon',
                      // onClick: () => iconCallback(),
                    })
                  }
                  <text style={{ color: '#909090' }}>{data[val.name]}</text>
                </div>
              ) || (Material[val.type]({
                id: val.name,
                name: val.name,
                type: val.type,
                label: val.text,
                required: val.required,
                onChange: (e) =>
                  setData({ ...data, [e.target.name]: e.target.value }),
                autoComplete: 'off',
                icon: val.icon,
                setData: setData,
                data: data,
                defaultValue: data[val.name],
                password: val.password,
              }))

            }
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
      <MacroWrapper macroSpace={macroSpace}>
        {
        macro.map((val, key) => {
          return (
            <div style={{ width: '100%' }} key={`check-${key}`}>
              {
              val.type === 'checkbox' &&
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
                })
              }
            </div>
          );
        })
        }
      </MacroWrapper>
    </>
  );
};

export default MacroCollections;

const MacroWrapper = styled.div`
  ${(p) =>
    p.macroSpace &&
    css`
      width: 100%;
      margin-bottom: 25px;
      margin-top: 40px;
    `}
`;
