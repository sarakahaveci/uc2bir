import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { login } from 'actions';
import {
  FormPages,
  AwesomeIcon,
  Title,
  Text,
  Button,
  Material,
} from 'components';

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const loginSuccessHandler = () => {
    toast.success('Giriş Başarılı!', {
      position: 'bottom-right',
      autoClose: 1000,
      onClose: () => history.push('/'),
    });
  };

  const loginErrorHandler = () => {
    toast.error('Hatalı Giriş', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    dispatch(
      login(
        { email: trimmedEmail, password },
        loginSuccessHandler,
        loginErrorHandler
      )
    );
  };

  return (
    <FormPages>
      <section className="col-12 col-xl-6 page login-page-widget">
        <div className="row">
          <div className="page-content-login">
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
                  label="E mail veya Telefon (05XXXXXXXXX)"
                  type="text"
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
                    <Link to="/forgot-password">Şifremi Unuttum</Link>
                  </div>
                </div>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  text="Giriş Yap"
                  className="blue"
                />
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
              <a className="login-footer" href="/profesyonel/register">
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
