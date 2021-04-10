import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import styled from 'styled-components/macro';
import { TextField } from '@material-ui/core';

import { StepContext } from '../RegisterSteps';
import { setStepOne, getAuthFiles } from 'actions';
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

const macro = [
  {
    type: 'text',
    name: 'name',
    required: true,
    text: 'Ad Soyad',
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

const StepOne = ({ userTypeId, setUserTypeId }) => {
  const { data: registerData } = useSelector((state) => state.registerData);

  const confirmationData = useSelector((state) => state.registerData.authFiles);

  const { isLoading: registerLoading } = useSelector((state) => state.stepOne);

  const { stepNumber, setStepNumber } = useContext(StepContext);

  const [form, setForm] = useState({});
  const [password, setPassword] = useState('');
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

  const registerSuccessCallback = () => {
    toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
      position: 'bottom-right',
      autoClose: 1000,
      onClose: () => {
        setStepNumber((step) => step + 1);
      },
    });
  };

  const registerErrorCallback = (errorMessages) =>
    Object.keys(errorMessages)?.forEach((errorKey) => {
      errorMessages?.[errorKey].forEach((error) =>
        toast.error(error, {
          position: 'bottom-right',
          autoClose: 2000,
        })
      );
    });

  const submitHandler = (e) => {
    e.preventDefault();

    const regex = new RegExp('^(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$');

    if (!regex.test(password)) {
      setErrorMessage(
        'Şifrenizin en az 6 karakter olmalı, büyük harf, küçük harf ve rakam içermelidir.'
      );
      return;
    }

    if (!unMaskPhone(phone)) {
      setErrorMessage('Telefon Numarası Giriniz.');
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
      setErrorMessage('Lütfen sözleşmeleri kabul ediniz.');
      return;
    }

    setErrorMessage('');

    dispatch(
      setStepOne(
        {
          ...form,
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
      <form onSubmit={submitHandler}>
        <Material.select
          required
          name="userType"
          forHtml="userType"
          label="Üyelik Tipi Seçiniz"
          onChange={(e) => setUserTypeId(e.target.value)}
          items={registerData?.['user-type']?.filter(
            (userType) => userType.key !== 'st'
          )}
        />
        {macro.map((item, index) => (
          <Fragment key={index}>{macroConverter(form, setForm, item)}</Fragment>
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
                label="Telefon *"
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
          name="password"
          type="password"
          forHtml="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{
            maxLength: 15,
          }}
          label="Şifre"
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
                  Açık rıza ve aydınlatma metinleri
                </span>
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
        Hesabınız var mı?
        <Link style={{ color: 'var(--blue)', marginLeft: '5px' }} to="/login">
          Giriş Yap
        </Link>
      </Text>

      {/* <div className="identfy">
        <span>Veya</span>
      </div> */}

      {/* <SocialLogin /> */}

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
