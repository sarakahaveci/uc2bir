import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal, Spinner } from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import { StepContext } from './RegisterSteps';
import { login, verifyCode, setStepOne, getRegisterData } from 'actions';
import { Button, Text, Material, AwesomeIcon, Otp } from 'components';
import { macroConverter } from 'utils';
import Svg from 'components/statics/svg';

const macro = [
  {
    type: 'text',
    name: 'name',
    required: true,
    text: 'Ad Soyad',
    icon: Svg.UsernameIcon,
  },
  {
    type: 'email',
    name: 'email',
    text: 'E mail',
    required: true,
    icon: Svg.EmailIcon,
  },
  {
    type: 'text',
    name: 'phone',
    forHtml: 'phone',
    required: true,
    text: 'Telefon',
    icon: Svg.PhoneIcon,
  },
  {
    type: 'password',
    name: 'password',
    required: true,
    text: 'Şifre',
    icon: Svg.PasswordIcon,
  },
];

const StepOne = () => {
  const { data: registerData } = useSelector((state) => state.registerData);

  const { isLoading: verifyLoading, error } = useSelector(
    (state) => state.registerData.verifyCode
  );

  const { isLoading: registerLoading } = useSelector((state) => state.stepOne);

  const { stepNumber, setStepNumber } = useContext(StepContext);

  const [form, setForm] = useState({});
  const [userTypeId, setUserTypeId] = useState('');
  const [acceptMemberAgreement, setAcceptMemberAgreement] = useState(false);
  const [acceptHealthAgreement, setAcceptHealthAgreement] = useState(false);
  const [acceptKvkk, setAcceptKvkk] = useState(false);
  const [acceptPermissions, setAcceptPermissions] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegisterData());
  }, []);

  useEffect(() => {
    if (stepNumber === 2) {
      setOpen(true);
    }
  }, [stepNumber]);

  const registerSuccessCallback = () => {
    toast.success('Kayıt alındı.', {
      position: 'bottom-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
        position: 'bottom-right',
        autoClose: 1000,
        onClose: () => {
          dispatch(verifyCode());

          setStepNumber((step) => step + 1);

          dispatch(
            login(
              { email: form.email, password: form.password },
              () => {},
              () =>
                toast.error('Hatalı Giriş', {
                  position: 'bottom-right',
                  autoClose: 2000,
                })
            )
          );
        },
      });
    }, 1000);
  };

  const registerErrorCallback = () => {
    toast.error('Hatalı Kayıt İşlemi', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const verifySuccessCallback = () => setStepNumber((step) => step + 1);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      setStepOne(
        {
          ...form,
          type_id: userTypeId,
          kvkk: acceptKvkk ? 1 : 0,
          agreement: acceptMemberAgreement ? 1 : 0,
          health_status: acceptHealthAgreement ? 1 : 0,
        },
        registerSuccessCallback,
        registerErrorCallback
      )
    );
  };

  const responseFacebook = (response) => console.log(response);

  const responseGoogle = (response) => console.log(response);

  return (
    <div className="step-one-wrapper">
      <form onSubmit={submitHandler}>
        <FormControl style={{ width: '100%' }}>
          <InputLabel>Üyelik Tipi Seçiniz</InputLabel>
          <Select
            value={userTypeId}
            onChange={(e) => setUserTypeId(e.target.value)}
          >
            {registerData?.['user-type'].map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {macro.map((item) => macroConverter(form, setForm, item))}

        <div className="step-one-wrapper__checkbox-wrapper">
          <Material.CheckBox
            checked={acceptMemberAgreement}
            onChange={(e) => setAcceptMemberAgreement(e.target.checked)}
            required
            label={
              <div>
                <span className="underline-text">Üyelik Sözleşmesini</span> ve
                &nbsp;
                <span className="underline-text">Ekleri'ni</span> kabul
                ediyorum.
              </div>
            }
          />

          <Material.CheckBox
            checked={acceptHealthAgreement}
            onChange={(e) => setAcceptHealthAgreement(e.target.checked)}
            label="Sağlık muvafakatnamesi okudum, onaylıyorum."
            required
          />

          <Material.CheckBox
            onChange={(e) => setAcceptKvkk(e.target.checked)}
            checked={acceptKvkk}
            label="KVKK okudum, onaylıyorum."
            required
          />

          <Material.CheckBox
            onChange={(e) => setAcceptPermissions(e.target.checked)}
            checked={acceptPermissions}
            label="Açık rıza ve aydınlatma metinleri"
            required
          />
        </div>

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
        Hesabınız var mı? <Link to="/login">Giriş Yap</Link>
      </Text>

      <div className="identfy">
        <span>Veya</span>
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

      <Modal show={open} onHide={() => setOpen(false)} backdrop="static">
        <div className="prof-register-modal">
          <Text variant="h2" fontSize="1.2rem" color="dark">
            Telefon Numaranızı Doğrulayın
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            <span className="prof-register-modal__phone">{form.phone}</span>
            &nbsp; numaralı telefona gönderdiğimiz 6 haneli kodu girin.
          </Text>

          <div>
            <Otp verifySuccessCallback={verifySuccessCallback} />
          </div>

          {verifyLoading && <Spinner animation="border" />}

          <div className="prof-register-modal__error">{error?.message}</div>
        </div>
      </Modal>
    </div>
  );
};

export default StepOne;
