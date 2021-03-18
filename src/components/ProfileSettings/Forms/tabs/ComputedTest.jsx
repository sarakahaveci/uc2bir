// @ts-nocheck
import React, { useEffect } from 'react';
import Section from '../Section';

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

  useEffect(() => {
    actionGetData();
  }, []);

  return (
    <Section>
      {test.isSuccsess && (
        <div className="text-field__Materials-sc-1sjbx6i-0 KPGYc materials">
          <div
            className="MuiFormControl-root MuiTextField-root material-inputs null  "
            maxLength=""
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
                    key={val?.name}
                    style={{
                      cursor: 'pointer',
                      color: 'var(--black2)',
                      fontWeight: '500',
                      marginBottom: 5,
                      paddingTop: 5,
                    }}
                    className="MuiInputBase-input MuiInput-input"
                  >
                    {val?.name}
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
