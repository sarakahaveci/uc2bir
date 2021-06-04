import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { login, socialLogin } from 'actions';
//import Svg from 'components/statics/svg';

import {
  FormPages,
  AwesomeIcon,
  Text,
  Button,
  Material,
  Box,
} from 'components';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
//import InstagramLogin from 'instagram-login-react';
import GoogleIcon from 'assets/google-login.png';
import FacebookIcon from 'assets/facebook-login.png';
//import InstagramIcon from 'assets/instagram-login.png'
import AppleIcon from 'assets/apple-login.png'
import AppleLogin from 'react-apple-login'

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const loginSuccessHandler = () =>
    history.push('/myprofile/settings/reservation');

  const onSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    dispatch(login({ email: trimmedEmail, password }, loginSuccessHandler));
  };
  const responseSocial = async (type, res) => {
    // eslint-disable-next-line
    console.log('responseApple', res);
    var user = {
      type: type,
      accessToken: res?.accessToken || res?.authorization?.id_token,
      email: res?.profileObj?.email || res?.email,
      uid: res?.googleId || res?.userID || res?.code,
    };
    dispatch(socialLogin(user, loginSuccessHandler));
  };
  return (
    <FormPages>
      <section className="col-12 col-xl-6 page login-page-widget">
        <div className="row">
          <div className="page-content-login">
            <div className="contain">
              <Text
                mb="25px"
                letterSpacing="5px"
                fontFamily="'Montserrat', sans-serif"
                fontSize="1.2rem"
                color="orange2"
              ></Text>

              <Text
                mb="10px"
                fontFamily="'Bebas Neue', cursive"
                fontSize="3rem"
                fontWeight="500"
                color="dark"
              >
                HER AN HER YERDE İSTEDİĞİN GİBİ ANTRENMAN YAP
              </Text>

              <Text
                mb="40px"
                fontFamily="'Montserrat', sans-serif"
                fontSize="1.2rem"
                fontWeight="500"
                color="dark"
              >
                Hedeflerine uygun antrenman planları ile İçindeki atleti özgür
                bırak
              </Text>

              {/* <Title
                fontWeight="normal"
                mb="15px"
                className="material-title"
                variant="h6"
                component="h6"
                color="dark"
                lineDisable
                textLeft
              >
                Giriş Yap
              </Title> */}

              <form onSubmit={onSubmit}>
                <Material.TextField
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  id="login-email"
                  name="login-email"
                  label="E-mail"
                  type="text"
                  icon={AwesomeIcon.User}
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

                <Box
                  row
                  justifyContent="space-between"
                  flexWrap="nowrap"
                  py="15px"
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
                </Box>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  text="Giriş Yap"
                  className="blue"
                />
              </form>

              <NoAccountText>
                Hesabınız yok mu? <Link to="/register">Üye ol</Link>
              </NoAccountText>

              <div className="identfy">
                <span>Veya</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '10px 20px',
                }}
              >
                <GoogleLogin
                  clientId="197190928694-blqpc6dnsr5lsefk7aptk3iq9tjjna8f.apps.googleusercontent.com"
                  onSuccess={(res) => {
                    responseSocial('google', res);
                  }}
                  //onFailure={() => { alert('Hata ile karşılaşıldı') }}
                  //cookiePolicy={'single_host_origin'}
                  render={(renderProps) => (
                    <img
                      onClick={renderProps.onClick}
                      style={{ height: '40px', cursor: 'pointer' }}
                      src={GoogleIcon}
                    ></img>
                  )}
                />
                <FacebookLogin
                  appId="911942052953063"
                  //autoLoad={true}
                  fields="name,email,picture"
                  render={(renderProps) => (
                    <img
                      onClick={renderProps.onClick}
                      style={{ height: '40px', cursor: 'pointer' }}
                      src={FacebookIcon}
                    ></img>
                  )}
                  //onClick={componentClicked}
                  callback={(res) => {
                    responseSocial('facebook', res);
                  }}
                />
                {/*<InstagramLogin
                  clientId="5fd2f11482844c5eba963747a5f34556"
                  buttonText="Login"
                  //onSuccess={responseInstagram}
                  //onFailure={responseInstagram}
                  render={(renderProps) => (
                    <img
                      onClick={renderProps.onClick}
                      style={{
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                      }}
                      src={InstagramIcon}
                    ></img>
                  )}
                  />*/}
                <AppleLogin
                  clientId='com.ucikibir.web'
                  scope='email'
                  redirectURI='https://321.4alabs.com'
                  state='state'
                  nonce='nonce'
                  usePopup={true}

                  responseType={"code"} 
                  responseMode={"query"}  
                  callback={(response) => responseSocial('apple', response)} // default = undefined
                  //onError={(error) => console.error(error)} // default = undefined
                  render={renderProps => (
                    <img onClick={renderProps.onClick} style={{ height: '40px', cursor: 'pointer' }} src={AppleIcon}></img>
                  )}
                />
              </div>
              <Link className="login-footer" to="/profesyonel/register">
                Sistemimizde hizmet vermek için tıklayın
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FormPages>
  );
};

export default Login;

const NoAccountText = styled.div`
  margin: 30px 0 10px 0;
  font-size: 1.1rem;
  color: ${(p) => p.theme.colors.gray1};
  text-align: center;
  width: 100%;

  a {
    color: ${(p) => p.theme.colors.blue};
  }
`;
