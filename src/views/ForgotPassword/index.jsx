// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { FormPages, AwesomeIcon, Button, Material } from '../../components';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { forgotPassword, resetPassword } from '../../actions';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const getForgotPassword = useSelector((state) => state.forgotPassword);
  const getResetPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if ( getForgotPassword.error ) {
      toast.error("Kod Gönderilirken Hata Oluştu", {
        position: 'bottom-right',
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [getForgotPassword]);

  useEffect(() => {
    if ( getResetPassword.error ) {
      toast.error(getResetPassword.message, {
        position: 'bottom-right',
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [getResetPassword]);

  const [code, setCode] = useState({
    code: '',
    password: '',
    password_retry: '',
  });
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'sm';

  const rSuccsess = () => {
    toast.success('Parolanız güncellendi...', {
      position: 'bottom-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => history.push('/'),
      });
    }, 1000);
  };

  const rErr = () =>
    toast.error(getResetPassword.error, {
      position: 'bottom-right',
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const succsess = () =>
    toast.success('Mesaj gönderildi', {
      position: 'bottom-right',
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: setOpen(true)
    });

  const err = () =>
    toast.error(getForgotPassword.error, {
      position: 'bottom-right',
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const actionForgotPasword = () => {
    dispatch(forgotPassword({ email }, succsess, err));
  };

  const actionResetPasword = () => {
    dispatch(resetPassword({ email: email, ...code }, rSuccsess, rErr));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    actionForgotPasword();
  };

  const onClick = async (event) => {
    event.preventDefault();
    actionResetPasword();
  };

  return (
    <>
      <FormPages>
        <section className="col-12 col-xl-6 page login-page-widget">
          <div className="row">
            <div className="page-content">
              <div className="contain">
                {!getForgotPassword.isSuccsess && !getResetPassword.isSuccsess && (
                  <form onSubmit={onSubmit}>
                    <Material.TextField
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      label="E mail veya Telefon (05XXXXXXXXX)"
                      type="text"
                      icon={AwesomeIcon.At}
                    />
                    {getForgotPassword.isLoading ? (
                      <Button text={`Yükleniyor...`} className="blue" />
                    ) : (
                      <Button
                        type="submit"
                        text={`Giriş Yap`}
                        className="blue"
                      />
                    )}
                  </form>
                )}
                {getForgotPassword.isSuccsess && !getResetPassword.isSuccsess && (
                  <React.Fragment>
                    <Button
                      className="blue"
                      style={{ marginBottom: 15 }}
                      onClick={handleClickOpen}
                      fontSize="11pt"
                      text="Kodu Gir!"
                    />
                    <Dialog
                      className="material-dialog"
                      fullWidth={fullWidth}
                      maxWidth={maxWidth}
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogTitle className="text-center">
                        Parolanızı Sıfırlayın!
                      </DialogTitle>
                      <DialogContent>
                        <div className="d-flex flex-wrap dialog-center">
                          <div
                            className="d-flex flex-wrap"
                            style={{ marginBottom: 35 }}
                          >
                            <form
                              className="d-flex flex-wrap"
                              onSubmit={onClick}
                            >
                              <Material.TextField
                                required
                                type="text"
                                name="code"
                                label="Kodu giriniz."
                                onChange={(e) =>
                                  setCode({
                                    ...code,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                              <Material.TextField
                                required
                                type="password"
                                name="password"
                                label="Yeni Password"
                                onChange={(e) =>
                                  setCode({
                                    ...code,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                              <Material.TextField
                                required
                                type="password"
                                name="password_retry"
                                label="Yeni Password Tekrar"
                                onChange={(e) =>
                                  setCode({
                                    ...code,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                              {getResetPassword.isLoading ? (
                                <Button
                                  text={`Yükleniyor...`}
                                  className="blue w-100"
                                  style={{marginTop: 30}}
                                />
                              ) : (
                                <Button
                                  type="submit"
                                  text={`Gönder`}
                                  className="blue w-100"
                                  style={{marginTop: 30}}
                                />
                              )}
                            </form>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </section>
      </FormPages>
    </>
  );
};

export default ForgotPassword;
