import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import styled from 'styled-components/macro';
import { TextField } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
//import InstagramLogin from 'instagram-login-react';
import GoogleIcon from 'assets/google-login.png';
import FacebookIcon from 'assets/facebook-login.png';
//import InstagramIcon from 'assets/instagram-login.png'
import AppleIcon from 'assets/apple-login.png';
import AppleSignin from 'react-apple-signin-auth';

import { StepContext } from '../RegisterSteps';
import { setStepOne, getAuthFiles, setStepOneSocial } from 'actions';
import {
  Button,
  Text,
  Material,
  Agreement,
  Permission,
  Information,
  Privacy,
  Svg,
} from 'components';
import StepTwo from './StepTwo';
import { WORK_PLACE, DIETITIAN } from '../../../constants';
import { macroConverter, unMaskPhone } from 'utils';
import { useTranslation } from 'react-i18next';

const StepOne = ({ userTypeId, setUserTypeId }) => {
  const { t } = useTranslation();
  const macro = [
    {
      type: 'text',
      name: 'name',
      required: true,
      text: t('Name surname'),
      icon: Svg.UsernameIcon,
      inputProps: {
        minLength: 3,
        maxLength: 35,
      },
    },
    {
      type: 'email',
      name: 'email',
      text: 'E mail',
      required: true,
      icon: Svg.EmailIcon,
      inputProps: {
        maxLength: 40,
      },
    },
  ];
  const { data: registerData } = useSelector((state) => state.registerData);

  const confirmationData = useSelector((state) => state.registerData.authFiles);

  const { isLoading: registerLoading } = useSelector((state) => state.stepOne);

  const { stepNumber, setStepNumber } = useContext(StepContext);

  const [form, setForm] = useState({});
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const [phone, setPhone] = useState('');
  const [acceptMemberAgreement, setAcceptMemberAgreement] = useState(false);
  const [acceptHealthAgreement, setAcceptHealthAgreement] = useState(false);
  const [acceptKvkk, setAcceptKvkk] = useState(false);
  const [acceptPermissions, setAcceptPermissions] = useState(false);
  const [isOtpModalActive, setIsOtpModalActive] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const [confirmationType, setConfirmationType] = useState('');
  const [socialMode, setSocialMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stepNumber === 2) {
      setIsOtpModalActive(true);
    }
  }, [stepNumber]);

  useEffect(() => {
    if (userTypeId) {
      dispatch(getAuthFiles(userTypeId));
    }

    setAcceptMemberAgreement(false);
    setAcceptHealthAgreement(false);
    setAcceptKvkk(false);
    setAcceptPermissions(false);
  }, [userTypeId]);
  const responseSocial = async (type, res) => {
    var user = {
      type: type,
      accessToken: res?.accessToken,
      email: res?.profileObj?.email || res?.email,
      uid: res?.googleId || res?.userID,
      name: manipulateName(res?.name || res?.profileObj?.name),
    };
    setSocialMode(true);
    setForm({ ...form, ...user });

    //dispatch(setStepOneSocial(user))
  };
  const actionStepOneSocial = () => {
    dispatch(
      setStepOneSocial(
        {
          ...form,
          name: manipulateName(form.name),
          type_id: userTypeId,
          password,
          phone,
          kvkk: acceptKvkk ? 1 : 0,
          agreement: acceptMemberAgreement ? 1 : 0,
          health_status: acceptHealthAgreement ? 1 : 0,
          permission: acceptPermissions ? 1 : 0,
        },
        registerSuccessCallback,
        registerErrorCallback
      )
    );
  };
  const registerSuccessCallback = () => {
    toast.info(t('Please wait! You are redirected...'), {
      position: 'bottom-right',
      autoClose: 1000,
      onClose: () => {
        setStepNumber((step) => step + 1);
      },
    });
  };

  const registerErrorCallback = (errorMessages) =>
    Object.keys(JSON.parse(errorMessages))?.forEach((errorKey) => {
      JSON.parse(errorMessages)?.[errorKey].forEach((error) =>
        toast.error(error, {
          position: 'bottom-right',
          autoClose: 2000,
        })
      );

    });

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

  const submitHandler = (e) => {
    e.preventDefault();
    const regex = new RegExp('^(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$');
    if (!(password === repassword)) {
      setErrorMessage(t('The 2 passwords do not match'));
      return;
    }

    if (!regex.test(password)) {
      setErrorMessage(
        t(
          'Your password must be at least 6 characters. It should contain uppercase, lowercase letters and numbers'
        )
      );
      return;
    }

    if (!unMaskPhone(phone)) {
      setErrorMessage(t('Enter Phone Number'));
      return;
    }

    if (
      ![
        acceptHealthAgreement,
        acceptMemberAgreement,
        acceptKvkk,
        acceptPermissions,
      ].every((value) => value)
    ) {
      setErrorMessage(t('Please accept the agreements.'));
      return;
    }

    setErrorMessage('');

    if (socialMode) {
      actionStepOneSocial();
    } else {
      dispatch(
        setStepOne(
          {
            name: manipulateName(form.name),
            email: form.email,
            password,
            type_id: userTypeId,
            kvkk: acceptKvkk ? 1 : 0,
            agreement: acceptMemberAgreement ? 1 : 0,
            health_status: acceptHealthAgreement ? 1 : 0,
            permission: acceptPermissions ? 1 : 0,
            phone,
          },
          registerSuccessCallback,
          registerErrorCallback
        )
      );
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
          userTypeId={userTypeId}
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
          userTypeId={userTypeId}
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
          userTypeId={userTypeId}
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
          userTypeId={userTypeId}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div className="step-one-wrapper">
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
      <form onSubmit={submitHandler}>
        <Material.select
          required
          name="userType"
          forHtml="userType"
          label={t('Select Membership Type')}
          onChange={(e) => setUserTypeId(e.target.value)}
          items={registerData?.['user-type']?.filter(
            (userType) => userType.key !== 'st'
          )}
        />
        {macro.map((item, index) => (
          <Fragment key={index}>
            {macroConverter(form, setForm, item, socialMode)}
          </Fragment>
        ))}
        <div className="materials">
          <InputMask
            mask="\0(999) 999 99 99"
            value={phone}
            disabled={false}
            onChange={(e) => setPhone(e.target.value)}
            alwaysShowMask={false}
            maskChar=" "
            onFocus={() => setShrink(true)}
            onBlur={() =>
              // Had to do that for fixing shrink
              phone !== '0(   )          ' ? setShrink(true) : setShrink(false)
            }
          >
            {() => (
              <TextField
                InputLabelProps={{ shrink }}
                label={t('Phone')}
                className="material-inputs has-icon"
                InputProps={{
                  startAdornment: (
                    <Svg.PhoneIcon
                      className="material-inputs-icon"
                      style={{ top: '6px' }}
                    />
                  ),
                }}
              />
            )}
          </InputMask>
        </div>

        <Material.TextField
          required
          name={t('password')}
          type="password"
          forHtml="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{
            maxLength: 15,
          }}
          label={t('password')}
          icon={Svg.PasswordIcon}
          password={Svg.EyeIcon}
        />
        <Material.TextField
          required
          name="repassword"
          type="password"
          forHtml="repassword"
          value={repassword}
          onChange={(e) => setRePassword(e.target.value)}
          inputProps={{
            maxLength: 15,
          }}
          label={t('password again')}
          icon={Svg.PasswordIcon}
          password={Svg.EyeIcon}
        />
        <div className="step-one-wrapper__checkbox-wrapper">
          <Material.CheckBox
            checked={acceptMemberAgreement}
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
                {userTypeId !== DIETITIAN && (
                  <>
                    ve &nbsp;
                    <a
                      href={
                        userTypeId === WORK_PLACE
                          ? 'https://file.uc2bir.com/uploads/pt-points/files/spor-alani.pptx'
                          : 'https://file.uc2bir.com/uploads/pt-points/files/egitmen.pptx'
                      }
                      target="_blank"
                      className="underline-text"
                    >
                      Ekleri&apos;ni
                    </a>
                  </>
                )}
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
                  Gizlilik sözleşmesini
                </span>
                , okudum onaylıyorum.
              </div>
            }
          />

          <Material.CheckBox
            onChange={(e) => setAcceptPermissions(e.target.checked)}
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
                  Açık rıza ve aydınlatma metinlerini
                </span>
                , okudum onaylıyorum.
              </div>
            }
          />
        </div>
        {errorMessage && (
          <ErrorMessage>
            <Svg.ErrorIcon /> {errorMessage}
          </ErrorMessage>
        )}
        <Button
          type="submit"
          text="İleri"
          className="blue"
          fontWeight="bold"
          isLoading={registerLoading}
        />
      </form>

      <Text
        style={{ marginTop: 30, marginBottom: 10 }}
        fontSize="12pt"
        color="gray"
        textAlign="center"
      >
        {t('Do you have an account?')}
        <Link style={{ color: 'var(--blue)', marginLeft: '5px' }} to="/login">
          {t('login')}
        </Link>
      </Text>

      {/* STEP TWO  */}

      {isOtpModalActive && (
        <StepTwo
          formData={{
            ...form,
            password,
            type_id: userTypeId,
            kvkk: acceptKvkk ? 1 : 0,
            agreement: acceptMemberAgreement ? 1 : 0,
            health_status: acceptHealthAgreement ? 1 : 0,
            permission: acceptPermissions ? 1 : 0,
            phone,
          }}
          isOtpModalActive={isOtpModalActive}
          setIsOtpModalActive={setIsOtpModalActive}
          setStepNumber={setStepNumber}
        />
      )}

      <ConfirmationModal show={openModal} onHide={() => setOpenModal(false)}>
        {confirmation}
      </ConfirmationModal>
    </div>
  );
};

export default StepOne;

const ConfirmationModal = styled(Modal)`
  .modal-content {
    width: 600px;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: var(--red);
  font-weight: 500;
  margin-bottom: 15px;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;
