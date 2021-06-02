import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
//import AppleLogin from 'react-apple-login';
import { useDispatch } from 'react-redux';

import { Button, AwesomeIcon } from 'components';
import { socialLogin } from 'actions';

firebase.initializeApp({
    apiKey: "AIzaSyAGmRcb5e41Jcz_LOuS3cXw2Cqcc58zmgs",
    authDomain: "uc2bir-dd7ee.firebaseapp.com",
    projectId: "uc2bir-dd7ee",
    storageBucket: "uc2bir-dd7ee.appspot.com",
    messagingSenderId: "197190928694",
    appId: "1:197190928694:web:da3d1769f371f1ecaccb97",
    measurementId: "G-R79XC04VG0"
});

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const SocialLogin = () => {
    const responseFacebook = (response) => {
        // eslint-disable-next-line
        console.log(response)
    };

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
            .catch((error) => {
                // eslint-disable-next-line
                console.log('errrr', error)
            });
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
