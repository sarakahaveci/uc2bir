import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { verifyCode } from 'actions';

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const OtpInput = styled.input`
  border: none !important;
  border-bottom: 1px solid var(--light-blue) !important;
  width: 35px !important;
  margin-right: 15px !important;
  text-align: center;
`;

const Otp = ({ verifySuccessCallback }) => {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (otp1 && otp2 && otp3 && otp4 && otp5 && otp6) {
      dispatch(
        verifyCode(
          +`${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`,
          verifySuccessCallback
        )
      );
    }
  }, [otp1, otp2, otp3, otp4, otp5, otp6]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (!isNaN(value)) {
      if (name === 'otp1') {
        setOtp1(value);
      } else if (name === 'otp2') {
        setOtp2(value);
      } else if (name === 'otp3') {
        setOtp3(value);
      } else if (name === 'otp4') {
        setOtp4(value);
      } else if (name === 'otp5') {
        setOtp5(value);
      } else if (name === 'otp6') {
        setOtp6(value);
      }
    }
  };

  const inputFocus = (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const next = event.target.tabIndex - 2;

      if (next > -1) {
        event.target.form.elements[next].focus();
      }
    } else {
      const next = event.target.tabIndex;

      if (next < 6) {
        event.target.form.elements[next].focus();
      }
    }
  };

  return (
    <div>
      <Form>
        <OtpInput
          name="otp1"
          type="text"
          autoComplete="off"
          value={otp1}
          onChange={handleChange}
          tabIndex="1"
          maxLength="1"
          autoFocus
          onKeyUp={inputFocus}
        />

        <OtpInput
          name="otp2"
          type="text"
          autoComplete="off"
          value={otp2}
          onChange={handleChange}
          tabIndex="2"
          maxLength="1"
          onKeyUp={inputFocus}
        />

        <OtpInput
          name="otp3"
          type="text"
          autoComplete="off"
          value={otp3}
          onChange={handleChange}
          tabIndex="3"
          maxLength="1"
          onKeyUp={inputFocus}
        />

        <OtpInput
          name="otp4"
          type="text"
          autoComplete="off"
          value={otp4}
          onChange={handleChange}
          tabIndex="4"
          maxLength="1"
          onKeyUp={inputFocus}
        />

        <OtpInput
          name="otp5"
          type="text"
          autoComplete="off"
          value={otp5}
          onChange={handleChange}
          tabIndex="5"
          maxLength="1"
          onKeyUp={inputFocus}
        />

        <OtpInput
          name="otp6"
          type="text"
          autoComplete="off"
          value={otp6}
          onChange={handleChange}
          tabIndex="6"
          maxLength="1"
          onKeyUp={inputFocus}
        />
      </Form>
    </div>
  );
};

export default Otp;
