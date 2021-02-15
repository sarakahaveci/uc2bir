import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppleLogin from 'react-apple-login';
import { useDispatch } from 'react-redux';

import { Button, AwesomeIcon } from 'components';
import { socialLogin } from 'actions';

firebase.initializeApp({
  apiKey: 'AIzaSyCJwB8ZgCe22LNJLL36P6_IKBoIDOWPFQY',
  authDomain: 'infra-sublime-301407.firebaseapp.com',
  projectId: 'infra-sublime-301407',
  storageBucket: 'infra-sublime-301407.appspot.com',
  messagingSenderId: '714924963055',
  appId: '1:714924963055:web:3f889f03ddd5a55777d71a',
  measurementId: 'G-36WENGECTW',
});

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const SocialLogin = () => {
  const responseFacebook = (response) => console.log(response);

  const dispatch = useDispatch();

  const history = useHistory();

  const loginSuccessHandler = () =>
    toast.success('Giriş Başarılı!', {
      position: 'bottom-right',
      autoClose: 1500,
      onClose: () => history.push('/'),
    });

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { credential, user } = res || {};

        dispatch(
          socialLogin(
            {
              type: 'google',
              accessToken: credential.accessToken,
              name: user.displayName,
              email: user.email,
              uid: user.uid,
            },
            () => loginSuccessHandler()
          )
        );
      })
      .catch((error) => {});
  };

  return (
    <div className="d-flex login-footer-start">
      <div className="col">
        <Button
          onClick={signInWithGoogle}
          height="45px"
          fontSize="9pt"
          icon={AwesomeIcon.Google}
          text="Google"
          className="dark"
        />
      </div>

      <div className="col">
        <FacebookLogin
          appId="911942052953063"
          fields="name,email,picture"
          callback={responseFacebook}
          render={({ onClick }) => (
            <Button
              onClick={onClick}
              height="45px"
              fontSize="9pt"
              icon={AwesomeIcon.Facebook}
              text="Facebook"
              className="dark"
            />
          )}
        />
      </div>

      {/* <div className="col">
        <AppleLogin
          clientId={'uc.iki.bir'}
          redirectURI={'https://www.google.com/'}
          responseType={'code'}
          responseMode={'query'}
          usePopup
          designProp={{
            locale: 'en_US',
          }}
        />
      </div> */}
    </div>
  );
};

export default SocialLogin;
