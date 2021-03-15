// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Section from '../Section';

import { Material, Button } from 'components';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTest } from 'actions';

const ComputedTest = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.profileSettings);

  const actionGetData = async () => {
    await dispatch(
      getTest(
        () => {},
        () => {
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    actionGetData();
  }, []);

  return (
    <Section>
      {test.isSuccsess && (
        <div className="text-field__Materials-sc-1sjbx6i-0 KPGYc materials">
          <div
            className="MuiFormControl-root MuiTextField-root material-inputs null  "
            maxlength=""
          >
            <label
              className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled"
              data-shrink="true"
            >
              Başlık
            </label>
            <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
              {test.data.length > 0 &&
                test.data.map((val) => (
                  <div
                    style={{
                      cursor: 'pointer',
                      color: 'var(--black2)',
                      fontWeight: '500',
                      marginBottom: 5,
                      paddingTop: 5,
                    }}
                    className="MuiInputBase-input MuiInput-input"
                  >
                    {val.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="input-right-node"></div>
        </div>
      )}
    </Section>
  );
};

export default ComputedTest;
