import React, { useEffect, useState } from 'react';

import { FormPages, AwesomeIcon, Button, Material } from 'components';
import { RESET_FORGOT_PASSWORD_STORE } from 'constants/actionTypes';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components/macro';

import { forgotPassword, resetPassword } from '../../actions';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const getForgotPassword = useSelector((state) => state.forgotPassword);
  const getResetPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_FORGOT_PASSWORD_STORE });
    };
  }, []);

  const rSuccsess = () => {
    toast.success('Parolanız güncellendi...', {
      position: 'bottom-right',
      autoClose: 2500,
    });

    setTimeout(() => {
      toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
        position: 'bottom-right',
        autoClose: 2500,
        onClose: () => history.push('/'),
      });
    }, 1000);
  };

  const rErr = () =>
    toast.error(getResetPassword.error, {
      position: 'bottom-right',
      autoClose: 4500,
    });

  const succsess = () =>
    toast.success('Mesaj gönderildi', {
      position: 'bottom-right',
      autoClose: 4500,
      onClose: setOpen(true),
    });

  const err = () =>
    toast.error(getForgotPassword.error, {
      position: 'bottom-right',
      autoClose: 4500,
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
          <div  className="row">
            <div  className="page-content">
              <Contain>
                {!getForgotPassword.isSuccsess && !getResetPassword.isSuccsess && (
                  <form style={{display:'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}} onSubmit={onSubmit}>
                    <Material.TextField
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      label="E-mail'inizi giriniz."
                      type="text"
                      icon={AwesomeIcon.User}
                      style={{marginBottom:'15px'}}
                    />
                    {getForgotPassword.isLoading ? (
                      <Button text={`Yükleniyor...`} className="blue" />
                    ) : (
                      <Button
                        type="submit"
                        text={`Kod Gönder`}
                        className="blue"
                      />
                    )}
                  </form>
                )}
                {getForgotPassword.isSuccsess && !getResetPassword.isSuccsess && (
                  <React.Fragment>
                    <Button
                      className="blue"
                      mb="15px"
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
                      <DialogContent id="forgot-pass">
                        <div className="d-flex flex-wrap dialog-center">
                          <div
                            className="d-flex flex-wrap"
                            style={{ marginBottom: 35 }}
                          >
                            <form
                              key="customForm-1"
                              id={"forgot-pass"}
                              className="d-flex flex-wrap"
                              onSubmit={onClick}
                            >
                              <Material.TextField
                                required
                                type="text"
                                name="code"
                                key="customCode1"
                             
                                className="forgot-input-custom"
                                label="Kodu giriniz."
                                autoComplete="off"
                                onChange={(e) =>
                                  setCode({
                                    ...code,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                              <Material.TextField
                                required
                                key="customInput1"
                                type="password"
                                className="forgot-input-custom"
                                name="password"
                                label="Yeni Password"
                                autoComplete="new-password"
                         
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
                                key="customInput2"
                     
                                name="password_retry"
                                className="forgot-input-custom"
                                label="Yeni Password Tekrar"
                                autoComplete="new-password"
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
                                  mt="30px"
                                />
                              ) : (
                                <Button
                                  type="submit"
                                  text={`Şifremi Güncelle`}
                                  className="blue w-100"
                                  mt="30px"
                                />
                              )}
                            </form>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </React.Fragment>
                )}
              </Contain>
            </div>
          </div>
        </section>
      </FormPages>
    </>
  );
};
const Contain = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  width:100%;
`
export default ForgotPassword;
