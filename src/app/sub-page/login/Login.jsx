// @ts-nocheck
import React, { useState } from 'react';
import { navigate, Link } from 'gatsby';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { login } from 'actions';
import { Material } from '../../../components/inputs/material';
import AwesomeIcon from '../../../statics/icon';
import Title from '../../../components/typography/title';
import Text from '../../../components/typography/Text';
import Button from '../../../components/buttons/button';
import FormPages from '../../../components/FormPages';

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const loginSuccessHandler = () => {
    toast.success('Giriş Başarılı!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => navigate('/'),
      });
    }, 1000);
  };

  const loginErrorHandler = () => {
    toast.error('Hatalı Giriş', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      login({ email, password }, loginSuccessHandler, loginErrorHandler)
    );
  };

  return (
    <FormPages>
      <section className="col-12 col-xl-6 page login-page-widget">
        <div className="row">
          <div className="page-content">
            <div className="contain">
              <Text
                style={{ letterSpacing: 5, marginBottom: 25 }}
                fontFamily="'Montserrat', sans-serif"
                children="BAŞARMAK İÇİN BAŞLA!"
                fontSize="1.2rem"
                color="orange2"
              />
              <Text
                style={{ marginBottom: 10 }}
                fontFamily="'Bebas Neue', cursive"
                fontSize="2rem"
                children="HER AN HER YERDE İSTEDİĞİN GİBİ ANTRENMAN YAP"
                fontWeight="500"
                color="dark"
              />
              <Text
                style={{ marginBottom: 40 }}
                fontFamily="'Montserrat', sans-serif"
                fontSize="0.8rem"
                fontWeight="500"
                children="Hedeflerine uygun antrenman planları ile İçindeki atleti özgür bırak"
                color="dark"
              />
              <Title
                fontWeight="normal"
                style={{ marginBottom: 15 }}
                className="material-title"
                variant="h6"
                component="h6"
                children="Giriş Yap"
                dark
                lineDisable
                textLeft
              />

              <form onSubmit={onSubmit}>
                <Material.TextField
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  id="login-email"
                  name="login-email"
                  label="E mail veya Telefon"
                  type="email"
                  icon={AwesomeIcon.At}
                />
                <Material.TextField
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  id="login-password"
                  name="login-password"
                  label="Şifre"
                  type="password"
                  icon={AwesomeIcon.Lock}
                />
                <div
                  style={{
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    flexWrap: 'nowrap',
                  }}
                  className="row justify-content-between"
                >
                  <div className="col-auto">
                    <Material.CheckBox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      label="Beni Hatırla"
                    />
                  </div>
                  <div className="col-auto remember-password">
                    <a href="#">Şifremi Unuttum</a>
                  </div>
                </div>
                {isLoading ? (
                  <Button text={`Yükleniyor...`} className="blue" />
                ) : (
                  <Button type="submit" text={`Giriş Yap`} className="blue" />
                )}
              </form>
              <Text
                style={{ marginTop: 30, marginBottom: 10 }}
                fontSize="12pt"
                gray
                textAlign="center"
              >
                Hesabınız yok mu? <Link to="/register">Üye ol</Link>
              </Text>
              <div className="identfy">
                <span>Veya</span>
              </div>
              <div className="d-flex login-footer-start">
                <div className="col">
                  <Button
                    height="45px"
                    fontSize="9pt"
                    icon={AwesomeIcon.Google}
                    text="Google ile giriş yap"
                    className="dark"
                  />
                </div>
                <div className="col">
                  <Button
                    height="45px"
                    fontSize="9pt"
                    icon={AwesomeIcon.Facebook}
                    text="Facebook ile giriş yap"
                    className="dark"
                  />
                </div>
              </div>
              <a className="login-footer" href="#">
                Sistemimizde hizmet vermek için tıklayın
              </a>
            </div>
          </div>
        </div>
      </section>
    </FormPages>
  );
};

export default Login;
