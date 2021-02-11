import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import { Button, AwesomeIcon } from 'components';

const SocialLogin = () => {
  const responseFacebook = (response) => console.log(response);

  const responseGoogle = (response) => console.log(response);

  return (
    <div className="d-flex login-footer-start">
      <div className="col">
        <GoogleLogin
          clientId="714924963055-gbido715qc9pcsqspfi1cktte5naca4b.apps.googleusercontent.com"
          buttonText="Login"
          render={({ onClick }) => (
            <Button
              onClick={onClick}
              height="45px"
              fontSize="9pt"
              icon={AwesomeIcon.Google}
              text="Google"
              className="dark"
            />
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
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
    </div>
  );
};

export default SocialLogin;
