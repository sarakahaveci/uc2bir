// @ts-nocheck
import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Button, Otp, Box, Svg } from '../../../components';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { stepTwo as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepTwo, verifyCode } from '../../../actions';

const StepTwo = (props) => {
  const { t } = useTranslation();

  const getStepOne = useSelector((state) => state.stepOne);
  const getStepTwo = useSelector((state) => state.stepTwo);
  const {
    setSteps,
    count,
    modal,
    setModal,
    phone,
    newAction = false,
    formData = false,
  } = props;

  const fullWidth = true;
  const maxWidth = 'sm';

  const [code, setCode] = useState({ ...macro.inputs });
  const [counter, setCounter] = useState(count);
  const time = 120;

  const isResponseSuccess = () => {
    setCode({ ...macro.inputs });

    return setCounter(time);
  };
  const isResponseError = () => {
    toast.error('Mesaj gönderilirken hata oluştu...', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const isResultSuccess = () => {
    toast.success('İşlem Başarılı!', {
      position: 'bottom-right',
      autoClose: 2000,
      onClose: setSteps('step3'),
    });
  };
  const isResultError = () => {
    toast.error('Kod doğrulanamadı...', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const dispatch = useDispatch();
  const vrf_response = () => {
    dispatch(verifyCode({ phone }, isResponseSuccess, isResponseError));
  };

  const action_result = () => {
    dispatch(
      verifyCode(
        { phone, code },
        () => newAction(formData, code),
        isResponseError
      )
    );
  };

  const vrf_result = () => {
    let new_data = {};
    if (formData) {
      new_data = formData;
    } else {
      new_data = getStepOne.data;
    }
    dispatch(
      setStepTwo({ ...new_data, code: code }, isResultSuccess, isResultError)
    );
  };

  useEffect(() => {
    if (getStepOne.isSuccess) {
      setCounter(time);
    }
  }, [getStepOne.isSuccess]);

  useEffect(() => {
    if (counter > 0) {
      const interval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [counter]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAction) {
      return action_result();
    } else {
      return vrf_result();
    }
  };
  return (
    <>
      <React.Fragment>
        <Dialog
          className="material-dialog"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={modal}
        >
          <DialogTitle className="text-center" style={{ color: 'black' }}>
            {t('Verify Your Phone Number')}

            <span
              style={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: '5px 15px',
              }}
              onClick={() => setModal(false)}
            >
              <Svg.CloseIcon />
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ padding: '15px 30px', color: 'black' }}
              className="text-center"
            >
              <b>{phone}</b>{' '}
              {t('Enter the 6-digit code we sent to the phone number')}
            </DialogContentText>
            <div className="d-flex flex-wrap dialog-center">
              <form
                className="d-flex flex-wrap dialog-center"
                onSubmit={onSubmit}
              >
                <div className="d-flex group-text">
                  <Otp otpCallback={setCode} />
                </div>
                {counter > 0 ? (
                  <Button
                    variant="link"
                    color="#00b2a9"
                    text={
                      t('Your remaining time to enter the security code') +
                      `${Math.floor(counter / 60)}:${
                        Math.ceil(counter % 60) < 10 ? 0 : ''
                      }${Math.ceil(counter % 60)}`
                    }
                  />
                ) : (
                  <Button
                    color="#00b2a9"
                    onClick={vrf_response}
                    variant="link"
                    text={t('Resend security code')}
                  />
                )}
                <Box center width="100%" my="15px">
                  {!getStepTwo.isLoading ? (
                    <Button
                      type="submit"
                      text={t('Forward')}
                      className="blue"
                      disabled={!(typeof code === 'number')}
                    />
                  ) : (
                    <Button className="blue" text={t('Please wait...')} />
                  )}
                </Box>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default StepTwo;
