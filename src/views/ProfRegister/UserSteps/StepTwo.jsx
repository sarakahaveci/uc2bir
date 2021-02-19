import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Modal, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Otp, Text, Svg, Button } from 'components';
import { setStepTwo, verifyCode } from 'actions';

const StepTwo = ({
  formData,
  isOtpModalActive,
  setIsOtpModalActive,
  setStepNumber,
}) => {
  const { isLoading: registerLoading } = useSelector((state) => state.auth);

  const [counter, setCounter] = useState(119);
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);

  const otpInputRef = useRef();
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

  const registerHandler = (code) => {
    dispatch(
      setStepTwo(
        { ...formData, code },
        () => {
          toast.success('Kayıt Alındı.', {
            position: 'bottom-right',
            autoClose: 2000,
            onClose: () => setStepNumber((val) => val + 1),
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
        <div onClick={modalCloseHandler}>
          <Svg.CloseIcon className="close-icon" />
        </div>

        <Text variant="h2" fontSize="1.2rem" color="dark">
          Telefon Numaranızı Doğrulayın
        </Text>

        <Text textAlign="center" fontSize="1rem" color="dark">
          <span className="prof-register-modal__phone">{formData.phone}</span>
          &nbsp; numaralı telefona gönderdiğimiz 6 haneli kodu girin.
        </Text>

        <div>
          <Otp ref={otpInputRef} />
        </div>

        <Text
          fontSize="0.9rem"
          color="blue"
          textAlign="center"
          cursor="pointer"
          onClick={() =>
            dispatch(
              verifyCode(
                { phone: formData.phone },
                () =>
                  toast.success('Kod Gönderildi.', {
                    position: 'bottom-right',
                    autoClose: 2000,
                  }),
                () =>
                  toast.error('Mesaj gönderilirken hata oluştu...', {
                    position: 'bottom-right',
                    autoClose: 2000,
                  })
              )
            )
          }
        >
          Güvenlik kodunu tekrar gönder ({Math.floor(counter / 60)}:
          {`${Math.ceil(counter % 60) < 10 ? 0 : ''}${Math.ceil(counter % 60)}`}
          )
        </Text>

        <Button
          text="İleri"
          margin="15px 0 0 0"
          className="blue"
          disabled={isVerifyButtonDisabled}
          onClick={() => {
            const code = otpInputRef.current.getCode();

            registerHandler(code);
          }}
        />

        {registerLoading && <Spinner animation="border" />}
      </div>
    </Modal>
  );
};

export default StepTwo;
