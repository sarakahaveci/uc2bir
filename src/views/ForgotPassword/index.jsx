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
  const handleClickOpen = () => {
    setCode({
      code: '',
      password: '',
      password_retry: '',
    })
    setOpen(true)
  };

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
    setCode({
      code: '',
      password: '',
      password_retry: '',
    })
    actionForgotPasword();
  };

  const onClick = async () => {
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
                      label="E-mail'inizi giriniz."
                      type="text"
                      autoComplete="off"

                      icon={AwesomeIcon.User}
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
                      <DialogContent>
                        <div className="d-flex flex-wrap dialog-center">
                          <div
                            className="d-flex flex-wrap"
                            style={{ marginBottom: 35 }}
                          >
                           
                              <Input
                                required
                                type="text"
                                name="code"
                                value={code?.code}
                                placeholder="Kodu giriniz."
                                autoComplete="off"
                                onChange={(e) =>
                                  setCode({
                                    ...code,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                              <Input
                                required
                                type="password"
                                name="password"
                                placeholder="Yeni Password"
                                value={code?.password}
                                autoComplete="off"
                                onChange={(e) =>
                                  setCode({
                                    ...code,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                              <Input
                                required
                                type="password"
                                value={code?.password_retry}
                                name="password_retry"
                                placeholder="Yeni Password Tekrar"
                                autoComplete="off"
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
                                  onClick={onClick}
                                  text={`Şifremi Güncelle`}
                                  className="blue w-100"
                                  mt="30px"
                                />
                              )}
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

const Input = styled.input`
  border: none !important;
  
  border-bottom: 1px solid ${(p) => p.theme.colors.blue} !important;
  margin: 15px !important;
  background-color: transparent !important;
`;

export default ForgotPassword;
