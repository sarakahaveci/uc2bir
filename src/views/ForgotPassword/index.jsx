// @ts-nocheck
import React, { useState } from 'react';

import { FormPages, AwesomeIcon, Button, Material } from '../../components';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { forgot_password, reset_password } from '../../actions';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const getForgotPassword = useSelector((state) => state.forgotPassword);
  const getResetPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const history = useHistory();

  const [code, setCode] = useState({
    email: email,
    code: "",
    password: "",
    password_retry: ""
  });
  const handleClose = () => setOpen(false);
	const handleClickOpen = () => setOpen(true);

  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'sm';

  const rSuccsess = () => {
    toast.success("Parolanız güncellendi...", {
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

  const rErr = () => toast.error(getResetPassword.error, {
    position: 'bottom-right',
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const succsess = () => toast.success("Mesaj gönderildi", {
    position: 'bottom-right',
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const err = () => toast.error(getForgotPassword.error, {
    position: 'bottom-right',
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const actionForgotPasword = () => {
    dispatch(
      forgot_password({ email },
        succsess,
        err
      ));
  };

  const actionResetPasword = () => {
    dispatch(
      reset_password({ ...code },
        rSuccsess,
        rErr
      ));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await actionForgotPasword();
    setOpen(true);
    return response;
  }

  const onClick = async () => {
    const response = await actionResetPasword();
    return response;
  }

  return (
    <>
      <FormPages>
        <section className="col-12 col-xl-6 page login-page-widget">
          <div className="row">
            <div className="page-content">
              <div className="contain">
                {!getForgotPassword.isSuccsess && !getResetPassword.isSuccsess &&
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
                      <Button type="submit" text={`Giriş Yap`} className="blue" />
                    )}
                  </form>
                }
                {getForgotPassword.isSuccsess && !getResetPassword.isSuccsess &&
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
                      onClose={handleClose}>
                      <DialogTitle className="text-center">Parolanızı Sıfırlayın!</DialogTitle>
                      <DialogContent>
                        <div className="d-flex flex-wrap dialog-center">
                          <div className="d-flex flex-wrap" style={{marginBottom: 35}}>
                            <Material.TextField 
                              type="text" 
                              name="code" 
                              label="Kodu giriniz." 
                              onChange={e => setCode({ ...code, [e.target.name]: e.target.value })}
                            />
                            <Material.TextField 
                              type="password" 
                              name="password" 
                              label="Yeni Password" 
                              onChange={e => setCode({ ...code, [e.target.name]: e.target.value })} 
                            />
                            <Material.TextField 
                              type="password" 
                              name="password_retry" 
                              label="Yeni Password Tekrar" 
                              onChange={e => setCode({ ...code, [e.target.name]: e.target.value })} 
                            />
                          </div>
                          {getResetPassword.isLoading ? (
                            <Button 
                              text={`Yükleniyor...`} 
                              className="blue"
                            />
                          ) : (
                            <Button 
                              onClick={onClick} 
                              text={`Gönder`} 
                              className="blue"
                            />
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        </section>
      </FormPages>
    </>
  )
}

export default ForgotPassword
