import React, { useEffect, useState } from 'react';

import {
  Button,
  Text,
  MacroCollections,
  Material,
  Agreement,
  Permission,
  Information,
  Privacy,
} from '../../../components';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'utils';
import { stepOne as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepOne, setStepOneSocial, getAuthFiles } from '../../../actions';
import StepTwo from './step-two';

import { Modal } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
//import InstagramLogin from 'instagram-login-react';
import GoogleIcon from 'assets/google-login.png';
import FacebookIcon from 'assets/facebook-login.png';
//import InstagramIcon from 'assets/instagram-login.png'
import AppleIcon from 'assets/apple-login.png';
import AppleSignin from 'react-apple-signin-auth';
const StepOne = (props) => {
  const { t } = useTranslation();

  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const confirmationData = useSelector((state) => state.registerData.authFiles);

  const getStepOne = useSelector((state) => state.stepOne);
  const [data, setData] = useState({ ...macro.inputs });
  const [modal, setModal] = useState('');

  const [confirmationType, setConfirmationType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [acceptMemberAgreement, setAcceptMemberAgreement] = useState(false);
  const [acceptHealthAgreement, setAcceptHealthAgreement] = useState(false);
  const [acceptKvkk, setAcceptKvkk] = useState(false);
  const [acceptPermissions, setAcceptPermissions] = useState(false);
  const [socialMode, setSocialMode] = useState(false);

  useEffect(() => {
    const userTypeId = 1;

    dispatch(getAuthFiles(userTypeId));
  }, []);

  const isSuccess = (response) => {
    if (response?.data?.token) {
      setSteps('step3');
    } else {
      return setModal(true);
    }
  };
  const isError = () => {
    toast.error(t('Incorrect entry'), {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (getStepOne.error) {
      if (getStepOne.error) {
        if (Object.entries(getStepOne.error).length < 6) {
          for (const [key, val] of Object.entries(getStepOne.error)) {
            toast.error(`${key}: ${val}`, {
              position: 'bottom-right',
              autoClose: 4500,
            });
          }
        }
      } else {
        toast.error(getStepOne.error, {
          position: 'bottom-right',
          autoClose: 4500,
        });
      }
    }
  }, [getStepOne.error]);
  const manipulateName = (name) => {
    if (name?.search(' ') == -1) {
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

      return capitalized;
    } else {
      var res = name.toLowerCase().split(' ');

      const tmpArr = [];
      res.forEach((element) => {
        const capitalizedWord =
          element.charAt(0).toUpperCase() + element.slice(1);
        tmpArr.push(capitalizedWord);
      });
      var res2 = '';
      tmpArr.forEach((element, key) => {
        if (key == tmpArr.length - 1) {
          res2 = res2 + element;
        } else {
          res2 = res2 + element + ' ';
        }
      });

      return res2;
    }
  };
  const responseSocial = async (type, res) => {
    // eslint-disable-next-line

    var user = {
      type: type,
      accessToken: res?.accessToken || res?.identityToken,
      email: res?.profileObj?.email || res?.email,
      uid: res?.googleId || res?.userID || (type == 'apple' ? res?.user : ''),
      name: manipulateName(
        res?.name ||
          res?.profileObj?.name ||
          (res?.fullName.givenName
            ? `${res?.fullName?.givenName} ${res?.fullName?.familyName}`
            : '')
      ),
    };
    setSocialMode(true);
    setData({ ...data, ...user });
  };
  const actionStepOneSocial = () => {
    dispatch(
      setStepOneSocial(
        {
          ...data,
          name: manipulateName(data.name),
          type_id: registerData?.['user-type']?.filter((f) => f.key === 'st')[0]
            ?.id,
          kvkk: acceptKvkk ? 1 : 0,
          agreement: acceptMemberAgreement ? 1 : 0,
          health_status: acceptHealthAgreement ? 1 : 0,
          permission: acceptPermissions ? 1 : 0,
        },
        isSuccess,
        isError
      )
    );
  };
  const actionStepOne = () => {
    dispatch(
      setStepOne(
        {
          ...data,
          name: manipulateName(data.name),
          type_id: registerData?.['user-type']?.filter((f) => f.key === 'st')[0]
            ?.id,
          kvkk: acceptKvkk ? 1 : 0,
          agreement: acceptMemberAgreement ? 1 : 0,
          health_status: acceptHealthAgreement ? 1 : 0,
          permission: acceptPermissions ? 1 : 0,
        },
        isSuccess,
        isError
      )
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!(data.password === data.repassword)) {
      toast.error(t('The two passwords do not match'), {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }
    if (registerData) {
      const user_type = registerData['user-type']?.filter(
        (f) => f.key === 'st'
      );
      setData({ ...data, type_id: user_type?.[0].id });
      if (!socialMode) {
        const response = await actionStepOne();
        return response;
      } else {
        const response = await actionStepOneSocial();
        return response;
      }
    } else {
      toast.error(t('There was a problem, please try again later'), {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  let confirmation;

  switch (confirmationType) {
    case 'agreement':
      confirmation = (
        <Agreement
          setAcceptMemberAgreement={setAcceptMemberAgreement}
          acceptMemberAgreement={acceptMemberAgreement}
          setOpenModal={setOpenModal}
          confirmationData={confirmationData}
          extraAgreementData={confirmationData}
          userTypeId={1}
        />
      );
      break;

    case 'information':
      confirmation = (
        <Information
          acceptHealthAgreement={acceptHealthAgreement}
          setAcceptHealthAgreement={setAcceptHealthAgreement}
          setOpenModal={setOpenModal}
          confirmationData={confirmationData}
          userTypeId={1}
        />
      );
      break;

    case 'privacy':
      confirmation = (
        <Privacy
          acceptKvkk={acceptKvkk}
          setAcceptKvkk={setAcceptKvkk}
          setOpenModal={setOpenModal}
          confirmationData={confirmationData}
          userTypeId={1}
        />
      );
      break;

    case 'permission':
      confirmation = (
        <Permission
          acceptPermissions={acceptPermissions}
          setAcceptPermissions={setAcceptPermissions}
          setOpenModal={setOpenModal}
          confirmationData={confirmationData}
          userTypeId={1}
        />
      );
      break;

    default:
      break;
  }

  return (
    <>
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
        {/* <InstagramLogin
          clientId="5fd2f11482844c5eba963747a5f34556"
          buttonText="Login"
          //onSuccess={responseInstagram}
          //onFailure={responseInstagram}
          render={renderProps => (
            <img onClick={renderProps.onClick} style={{ width: '40px', height: '40px', cursor: 'pointer' }} src={InstagramIcon}></img>
          )}
          />*/}
        <AppleSignin
          authOptions={{
            clientId: 'com.ucikibir.web',
            scope: 'email name',
            redirectURI: 'https://321.4alabs.com',
            state: 'state',
            nonce: 'nonce',
            usePopup: true,
          }} // REQUIRED
          /** General props */
          uiType="dark"
          className="apple-auth-btn"
          noDefaultStyle={false}
          buttonExtraChildren="Continue with Apple"
          //onSuccess={(response) => console.log(response)} // default = undefined
          //onError={(error) => console.error(error)} // default = undefined
          skipScript={false} // default = undefined
          onSuccess={(response) => {
            responseSocial('apple', response);
          }} // default = undefined
          iconProp={{ style: { marginTop: '10px' } }} // default = undefined
          render={(renderProps) => (
            <img
              onClick={renderProps.onClick}
              style={{ height: '40px', cursor: 'pointer' }}
              src={AppleIcon}
            ></img>
          )}
        />
      </div>
      <div className="identfy">
        <span>{t('or')}</span>
      </div>
      <form className="step-one-wrapper" onSubmit={onSubmit} autoComplete="off">
        <MacroCollections
          social={socialMode}
          macro={macro.macro}
          data={data}
          setData={setData}
        />
        <div className="step-one-wrapper__checkbox-wrapper">
          <Material.CheckBox
            checked={acceptMemberAgreement}
            required={true}
            onChange={(e) => setAcceptMemberAgreement(e.target.checked)}
            label={
              <div>
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('agreement');
                    setOpenModal(true);
                  }}
                >
                  Üyelik Sözleşmesini
                </span>
                kabul ediyorum.
              </div>
            }
          />

          <Material.CheckBox
            checked={acceptHealthAgreement}
            onChange={(e) => setAcceptHealthAgreement(e.target.checked)}
            label={
              <div>
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('information');
                    setOpenModal(true);
                  }}
                >
                  Aydınlatma Bildirimini
                </span>
                okudum, onaylıyorum.
              </div>
            }
          />

          <Material.CheckBox
            onChange={(e) => setAcceptKvkk(e.target.checked)}
            checked={acceptKvkk}
            label={
              <div>
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('privacy');
                    setOpenModal(true);
                  }}
                >
                  Gizlilik Sözleşmesini
                </span>
                , okudum onaylıyorum.
              </div>
            }
          />

          <Material.CheckBox
            onChange={(e) => setAcceptPermissions(e.target.checked)}
            required={true}
            checked={acceptPermissions}
            label={
              <div>
                <span
                  className="underline-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationType('permission');
                    setOpenModal(true);
                  }}
                >
                  Açık Rıza Formunu ve Aydınlatma Metinlerini
                </span>
                , okudum onaylıyorum.
              </div>
            }
          />
        </div>

        {!getStepOne.isLoading ? (
          <Button type="submit" text={`İleri`} className="blue" />
        ) : (
          <Button text={t('Loading')} className="blue" />
        )}
      </form>
      {modal && (
        <StepTwo
          setSteps={setSteps}
          phone={data.phone}
          count={1}
          modal={modal}
          setModal={setModal}
        />
      )}
      <Text
        style={{ marginTop: 30, marginBottom: 10 }}
        fontSize="12pt"
        gray
        textAlign="center"
      >
        {t('Do you have an account?')}
        <Link style={{ color: 'var(--blue)', marginLeft: '5px' }} to="/login">
          {t('login')}
        </Link>
      </Text>
      <StyledModal show={openModal} onHide={() => setOpenModal(false)}>
        {confirmation}
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)`
  .modal-content {
    width: 600px;
    background-color: var(--white1);
    padding: 15px 30px;
    @media ${device.sm} {
      height: 70vh;
      width: 90vw;
      overflow: scroll;
    }
  }
`;

export default StepOne;
