// @ts-nocheck
import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { navigate, Link } from 'gatsby';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { Material } from '../../../components/inputs/material';
import AwesomeIcon from '../../../statics/icon';
import Title from '../../../components/typography/title';
import Text from '../../../components/typography/Text';
import Button from '../../../components/buttons/button';
import { login } from '../../../redux/reducers/login';
import { initialState } from '../../../redux/reducers/login/initial';
import FormPages from '../../../components/FormPages';
import env from '../../../env';

const Login = (props) => {
  const { login, loginReducers } = props;
  const [lg, setLg] = useState({ ...initialState });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await login(data);
    setLg({
      ...initialState,
      loading: false,
      isSuccess: true,
      entity: result.payload,
    });
  };

  const data = new FormData();

  data.append('email', email);
  data.append('password', password);

  useEffect(() => {
    const session = new Promise((resolve, reject) => {
      const sessionAdd = () => {
        sessionStorage.setItem('token', lg.entity.token);
        sessionStorage.setItem('refresh_token', lg.entity.refresh_token);
        sessionStorage.setItem('user_id', lg.entity.user.id);
      };
      const localAdd = () => {
        localStorage.setItem('token', lg.entity.token);
        localStorage.setItem('refresh_token', lg.entity.refresh_token);
        localStorage.setItem('user_id', lg.entity.user.id);
      };
      if (lg.isSuccess) {
        if (lg.entity.token) {
          if (!rememberMe) sessionAdd();
          else localAdd();

          resolve('Giriş Başarılı!');
        } else {
          reject('Hatalı Giriş!');
        }
      }
    });

    session
      .then((data) =>
        toast.success(data, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      //set header axios
      .then(
        () => (axios.defaults.headers.common['Authorization'] = lg.entity.token)
      )
      //set config
      .then(() => {
        env.token = lg.entity.token;
        env.refresh_token = lg.entity.refresh_token;
        env.user = lg.entity.user.id;
      })
      .then(() =>
        setTimeout(() => {
          toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000)
      )
      .then(() => setTimeout(() => navigate('/'), 3050))
      .catch((err) =>
        toast.error(err, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  }, [lg]);

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
                fontSize="2.4rem"
                fontWeight="500"
                color="orange2"
              />
              <Text
                style={{ marginBottom: 10 }}
                fontFamily="'Bebas Neue', cursive"
                fontSize="3.2rem"
                children="HER AN HER YERDE İSTEDİĞİN GİBİ ANTRENMAN YAP"
                fontWeight="bold"
                color="dark"
              />
              <Text
                style={{ marginBottom: 40 }}
                fontFamily="'Montserrat', sans-serif"
                fontSize="1.6rem"
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
                {!loginReducers.loading ? (
                  <Button type="submit" text={`Giriş Yap`} className="blue" />
                ) : (
                  <Button
                    onClick={async () => {
                      console.log('Lütfen Bekleyiniz...');
                    }}
                    text={`Yükleniyor...`}
                    className="blue"
                  />
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ login }, dispatch),
  };
};

const mapStateToProps = ({ loginReducers }) => ({ loginReducers });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
