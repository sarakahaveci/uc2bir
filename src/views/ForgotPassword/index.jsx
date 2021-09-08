import React, { useEffect, useState } from 'react';

import { AwesomeIcon, Button, Material, Svg } from 'components';
import { RESET_FORGOT_PASSWORD_STORE } from 'constants/actionTypes';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components/macro';
import background from '../../components/statics/background/images/login.jpg';

import { forgotPassword, resetPassword } from '../../actions';

const ForgotPassword = () => {
  const { t } = useTranslation();

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
    toast.success(t('Your password has been updated...'), {
      position: 'bottom-right',
      autoClose: 2500,
    });

    setTimeout(() => {
      toast.info(t('Please wait! You are redirected...'), {
        position: 'bottom-right',
        autoClose: 2500,
        onClose: () => history.push('/'),
      });
    }, 1000);
  };

  const rErr = (e) => {
    if (e?.password?.length > 0) {
      toast.error(e?.password[0], {
        position: 'bottom-right',
        autoClose: 4500,
      });
    } else if (e) {
      toast.error(t('Check the code, make sure the passwords match'), {
        position: 'bottom-right',
        autoClose: 4500,
      });
    }
  };

  const succsess = () =>
    toast.success(t('Email has been sent'), {
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
      <div
        style={{
          width: '100%',
          minHeight: '110vh',
          backgroundSize: 'cover',
          backgroundImage: `url(${background})`,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <div className="row">
          <div className="page-content">
            <Contain>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '671px',
                  height: '601px',
                  background: 'white',
                  borderRadius: '30px',
                  padding: '80px',
                  alignItems: 'center',
                }}
              >
                <text
                  style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '40px',
                    fontWeight: 'bold',
                  }}
                >
                  {t('ENTER YOUR EMAIL ADDRESS TO FIND YOUR ACCOUNT')}
                </text>
                <text style={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                  {t(
                    'First, we need to find your account. Please write your e-mail address and continue'
                  )}
                </text>
                {!getForgotPassword.isSuccsess && !getResetPassword.isSuccsess && (
                  <form
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginTop: '50px',
                    }}
                    onSubmit={onSubmit}
                  >
                    <Material.TextField
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      label={t('Enter your e-mail')}
                      type="text"
                      icon={AwesomeIcon.User}
                      style={{ marginBottom: '15px', width: '500px' }}
                    />
                    {getForgotPassword.isLoading ? (
                      <Button
                        style={{ marginBottom: '15px', width: '500px' }}
                        text={t('Loading')}
                        className="blue"
                      />
                    ) : (
                      <Button
                        style={{ marginBottom: '15px', width: '500px' }}
                        type="submit"
                        text={t('Submit Code')}
                        className="blue"
                      />
                    )}
                  </form>
                )}

                {getForgotPassword.isSuccsess && !getResetPassword.isSuccsess && (
                  <React.Fragment>
                    <Button
                      style={{ marginTop: '30px', width: '500px' }}
                      className="blue"
                      mb="15px"
                      onClick={handleClickOpen}
                      fontSize="11pt"
                      text={t('Enter Code!')}
                    />
                    <Dialog
                      className="material-dialog"
                      fullWidth={fullWidth}
                      maxWidth={maxWidth}
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogTitle className="text-center">
                        {t('Reset Your Password!')}
                      </DialogTitle>
                      <DialogContent id="forgot-pass">
                        <div className="d-flex flex-wrap dialog-center">
                          <div
                            className="d-flex flex-wrap"
                            style={{ marginBottom: 35 }}
                          >
                            <form
                              key="customForm-1"
                              id={'forgot-pass'}
                              className="d-flex flex-wrap"
                              onSubmit={onClick}
                            >
                              <Material.TextField
                                required
                                type="text"
                                name="code"
                                key="customCode1"
                                className="forgot-input-custom"
                                label={t('Enter Code!')}
                                autocomplete="new-password"
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
                                className="forgot-input-custom"
                                name="password"
                                label={t('Your New Password')}
                                type="password"
                                icon={Svg.PasswordIcon}
                                password={Svg.EyeIcon}
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
                                label={t('New Password Again')}
                                autoComplete="new-password"
                                onChange={(e) =>
                                  setCode({
                                    ...code,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                icon={Svg.PasswordIcon}
                                password={Svg.EyeIcon}
                              />
                              <span style={{ fontWeight: 300, fontSize: 14 }}>
                                {t(
                                  'Your password must be at least 6 characters. It should contain uppercase, lowercase letters and numbers'
                                )}
                              </span>
                              {getResetPassword.isLoading ? (
                                <Button
                                  text={t('Loading')}
                                  className="blue w-100"
                                  mt="30px"
                                />
                              ) : (
                                <Button
                                  type="submit"
                                  text={t('Update My Password')}
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
              </div>
            </Contain>
          </div>
        </div>
      </div>
    </>
  );
};
const Contain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;
export default ForgotPassword;
