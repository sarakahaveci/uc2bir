import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Otp, Text, Svg, Button } from 'components';
import { setStepTwo, verifyCode } from 'actions';

const StepTwo = ({
  formData,
  isOtpModalActive,
  setIsOtpModalActive,
  setStepNumber,
}) => {
  const { t } = useTranslation();

  const { isLoading: registerLoading } = useSelector((state) => state.auth);

  const [counter, setCounter] = useState(119);
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);

  const otpInputRef = useRef();
  const interval = useRef();

  const modalCloseHandler = useCallback(() => {
    setIsOtpModalActive(false);
    setStepNumber(1);
  }, [isOtpModalActive, setIsOtpModalActive]);

  useEffect(() => {
    interval.current = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (isOtpModalActive) {
      setCounter(119);
    }
  }, [isOtpModalActive]);

  useEffect(() => {
    if (counter === 1) {
      return () => {
        clearInterval(interval.current);

        toast.info(t('Phone Verification Failed'), {
          position: 'bottom-right',
          autoClose: 2000,
        });
      };
    }
  }, [counter]);

  const dispatch = useDispatch();

  const verifyErrorCallback = (error) =>
    toast.error(error, {
      position: 'bottom-right',
      autoClose: 2000,
    });

  const registerHandler = (code) => {
    dispatch(
      setStepTwo(
        { ...formData, code },
        () => {
          setStepNumber((val) => val + 1);

          toast.success(t('Registered'), {
            position: 'bottom-right',
            autoClose: 1500,
          });
        },
        verifyErrorCallback
      )
    );
  };

  useEffect(() => {
    const code = otpInputRef.current.getCode();

    setIsVerifyButtonDisabled(code.toString().length !== 6);
  }, [otpInputRef?.current?.getCode() || false]);

  return (
    <Modal show={isOtpModalActive} onHide={modalCloseHandler} backdrop="static">
      <div className="prof-register-modal">
        <Svg.CloseIcon className="close-icon" onClick={modalCloseHandler} />

        <Text variant="h2" fontSize="1.2rem" color="dark">
          {t('Verify Your Phone Number')}
        </Text>

        <Text textAlign="center" fontSize="1rem" color="dark">
          <span className="prof-register-modal__phone">{formData.phone}</span>
          &nbsp; {t('Enter the 6-digit code we sent to the phone number')}
        </Text>

        <div>
          <Otp ref={otpInputRef} />
        </div>

        {counter !== 0 ? (
          <Text fontSize="0.9rem" color="blue" textAlign="center">
            {t('remaining time')} {Math.floor(counter / 60)}:
            {`${Math.ceil(counter % 60) < 10 ? 0 : ''}${Math.ceil(
              counter % 60
            )}`}
          </Text>
        ) : (
          <Text
            fontSize="0.9rem"
            color="blue"
            textAlign="center"
            cursor="pointer"
            onClick={() =>
              dispatch(
                verifyCode(
                  { phone: formData.phone },
                  () => {
                    toast.success(t('Code Sent'), {
                      position: 'bottom-right',
                      autoClose: 2000,
                    });

                    setCounter(119);

                    interval.current = setInterval(() => {
                      setCounter((counter) => counter - 1);
                    }, 1000);
                  },
                  () =>
                    toast.error(
                      t('An error occurred while sending the message...'),
                      {
                        position: 'bottom-right',
                        autoClose: 2000,
                      }
                    )
                )
              )
            }
          >
            {t('Resend security code')}({Math.floor(counter / 60)}:
            {`${Math.ceil(counter % 60) < 10 ? 0 : ''}${Math.ceil(
              counter % 60
            )}`}
            )
          </Text>
        )}

        <Button
          text={t('Forward')}
          margin="15px 0 0 0"
          className="blue"
          disabled={isVerifyButtonDisabled}
          isLoading={registerLoading}
          onClick={() => {
            const code = otpInputRef.current.getCode();

            registerHandler(code);
          }}
        />
      </div>
    </Modal>
  );
};

export default StepTwo;
