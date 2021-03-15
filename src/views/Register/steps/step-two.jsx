// @ts-nocheck
import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { AwesomeIcon, Button, Otp, Svg } from '../../../components';

import { toast } from 'react-toastify';

import { stepTwo as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepTwo, verifyCode } from '../../../actions';

const StepTwo = (props) => {
  const getStepOne = useSelector((state) => state.stepOne);
  const getStepTwo = useSelector((state) => state.stepTwo);
  const { setSteps, count, modal, setModal, phone, newAction = false, formData = false } = props;

  const [open, setOpen] = useState(modal);
  const fullWidth = true;
  const maxWidth = 'sm';

  const [code, setCode] = useState({ ...macro.inputs });
  const [counter, setCounter] = useState(count);
  const time = 120;

  const isResponseSuccess = () => {
    setOpen(true);
    return setCounter(time);
  };
  const isResponseError = () => {
    toast.error('Mesaj gönderilirken hata oluştu...', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return setCounter(0);
  };

  const isResultSuccess = () => {
    toast.success('Kayıt alındı.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: setSteps('step3'),
    });
  };
  const isResultError = () => {
    toast.error('Kod doğrulanamadı...', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const dispatch = useDispatch();
  const vrf_response = () => {
    dispatch(
      verifyCode(
        { phone },
        isResponseSuccess,
        isResponseError
      )
    );
  };

  const action_result = () => {
    dispatch(
      verifyCode(
        { phone, code },
        () => newAction(formData, code),
        isResponseError
      )
    );
  }

  const vrf_result = () => {
    let new_data = {};
    if ( formData ) {
      new_data = formData;
    } else {
      new_data = getStepOne.data;
    }
    dispatch(
      setStepTwo(
        { ...new_data, code: code },
        isResultSuccess,
        isResultError
      )
    );
  };

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

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
    if ( newAction ) {
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
          <DialogTitle className="text-center">
            Telefon Numaranızı Doğrulayın
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
              x
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ padding: '15px 30px' }}
              className="text-center"
            >
              <b>{phone}</b> numaralı telefona gönderdiğimiz 6 haneli kodu
              girin.
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
                    onClick={() => console.log('close')}
                    variant="link"
                    text={`Güvenlik kodunu girmek için kalan süreniz ${Math.floor(
                      counter / 60
                    )}:${Math.ceil(counter % 60) < 10 ? 0 : ''}${Math.ceil(
                      counter % 60
                    )}`}
                  />
                ) : (
                  <Button
                    onClick={vrf_response}
                    variant="link"
                    text={`Güvenlik kodunu tekrar gönder.`}
                  />
                )}

                {!getStepTwo.isLoading ? (
                  <Button
                    type="submit"
                    text={`İleri`}
                    className="blue"
                    disabled={!(typeof code === 'number')}
                  />
                ) : (
                  <Button
                    className="blue"
                    onClick={() => console.log('Lütfen Bekleyiniz...')}
                    text={`Lütfen Bekleyiniz...`}
                  />
                )}
                <div className={{margin: 30}}></div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default StepTwo;
