import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Modal, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Otp, Text, Svg } from 'components';
import { setStepTwo } from 'actions';

const StepTwo = ({
  formData,
  isOtpModalActive,
  setIsOtpModalActive,
  setStepNumber,
}) => {
  const { isLoading: registerLoading } = useSelector((state) => state.stepOne);

  const [counter, setCounter] = useState(119);

  const interval = useRef();

  const modalCloseHandler = () => {
    setIsOtpModalActive(false);
    setStepNumber(1);
  };

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

        toast.info('Telefon Doğrulama Başarısız.', {
          position: 'bottom-right',
          autoClose: 2000,
          onClose: () => modalCloseHandler(),
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

  const otpCallback = (code) => {
    dispatch(
      setStepTwo(
        { ...formData, code },
        () => setStepNumber((val) => val + 1),
        verifyErrorCallback
      )
    );
  };

  return (
    <Modal show={isOtpModalActive} onHide={modalCloseHandler}>
      <div className="prof-register-modal">
        <Svg.CloseIcon className="close-icon" onClick={modalCloseHandler} />

        <Text variant="h2" fontSize="1.2rem" color="dark">
          Telefon Numaranızı Doğrulayın
        </Text>

        <Text textAlign="center" fontSize="1rem" color="dark">
          <span className="prof-register-modal__phone">{formData.phone}</span>
          &nbsp; numaralı telefona gönderdiğimiz 6 haneli kodu girin.
        </Text>

        <div>
          <Otp otpCallback={otpCallback} />
        </div>

        <Text
          fontSize="0.9rem"
          color="blue"
          textAlign="center"
          cursor="pointer"
        >
          Güvenlik kodunu tekrar gönder ({Math.floor(counter / 60)}:
          {`${Math.ceil(counter % 60) < 10 ? 0 : ''}${Math.ceil(counter % 60)}`}
          )
        </Text>

        {registerLoading && <Spinner animation="border" />}
      </div>
    </Modal>
  );
};

export default StepTwo;
