import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { verifyCode } from 'actions';
import { Text } from 'components';
import { useHistory } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const OtpInput = styled.input`
  border: none !important;
  border-bottom: 1px solid var(--blue) !important;
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

  const [counter, setCounter] = useState(119);

  const interval = useRef();

  const history = useHistory();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (counter === 1) {
      return () => {
        clearInterval(interval.current);

        toast.info(
          'Telefon Doğrulama Başarısız Anasayfaya Yönlendiriliyorsunuz.',
          {
            position: 'bottom-right',
            autoClose: 2000,
            onClose: () => history.push('/'),
          }
        );
      };
    }
  }, [counter]);

  const verifyErrorCallback = (errorMessage) =>
    toast.error(errorMessage, {
      position: 'bottom-right',
      autoClose: 2000,
    });

  const dispatch = useDispatch();

  useEffect(() => {
    if (otp1 && otp2 && otp3 && otp4 && otp5 && otp6) {
      dispatch(
        verifyCode(
          +`${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`,
          verifySuccessCallback,
          verifyErrorCallback
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

      <Text
        fontSize="0.9rem"
        color="blue"
        textAlign="center"
        cursor="pointer"
        onClick={() =>
          dispatch(verifyCode(null, verifySuccessCallback, verifyErrorCallback))
        }
      >
        Güvenlik kodunu tekrar gönder ({Math.floor(counter / 60)}:
        {`${Math.ceil(counter % 60) < 10 ? 0 : ''}${Math.ceil(counter % 60)}`})
      </Text>
    </div>
  );
};

export default Otp;
