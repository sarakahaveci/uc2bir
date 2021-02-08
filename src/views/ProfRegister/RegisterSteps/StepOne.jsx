import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { StepContext } from './RegisterSteps';
import { Modal } from 'react-bootstrap';
import { Button, Text, Material, AwesomeIcon } from 'components';
import { macroConverter } from 'utils';
import Otp from '../Otp';
import Svg from 'components/statics/svg';

const macro = [
  {
    type: 'select',
    required: true,
    name: 'memberType',
    forHtml: 'memberType',
    text: 'Üyelik Tipi Seçiniz',
    items: [
      {
        id: 1,
        val: 1,
        text: 'Spor Eğitmeni',
      },
    ],
  },
  {
    type: 'text',
    required: true,
    name: 'name',
    text: 'Ad Soyad',
    icon: AwesomeIcon.User,
  },
  {
    type: 'email',
    required: true,
    name: 'email',
    text: 'E mail',
    icon: AwesomeIcon.Envolope,
  },
  {
    type: 'text',
    required: true,
    name: 'phone',
    forHtml: 'phone',
    text: 'Telefon',
    icon: AwesomeIcon.Phone,
  },
  {
    type: 'password',
    required: true,
    name: 'password',
    text: 'Şifre',
    icon: AwesomeIcon.Lock,
  },
];

const StepOne = () => {
  const [form, setForm] = useState({});

  const { stepNumber, setStepNumber } = useContext(StepContext);

  const [acceptMemberAgreement, setAcceptMemberAgreement] = useState(false);
  const [acceptHealthAgreement, setAcceptHealthAgreement] = useState(false);
  const [acceptKvkk, setAcceptKvkk] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (stepNumber === 2) {
      setOpen(true);
    }
  }, [stepNumber]);

  return (
    <div className="step-one-wrapper">
      {macro.map((item) => macroConverter(form, setForm, item))}

      <div className="checkbox-area">
        <Material.CheckBox
          checked={acceptMemberAgreement}
          onChange={(e) => setAcceptMemberAgreement(e.target.checked)}
          label={
            <div>
              <span className="underline-text">Üyelik Sözleşmesini</span> ve
              &nbsp;
              <span className="underline-text">Ekleri'ni</span> kabul ediyorum.
            </div>
          }
        />

        <Material.CheckBox
          checked={acceptHealthAgreement}
          onChange={(e) => setAcceptHealthAgreement(e.target.checked)}
          label="Sağlık muvafakatnamesi okudum, onaylıyorum."
        />

        <Material.CheckBox
          onChange={(e) => setAcceptKvkk(e.target.checked)}
          checked={acceptKvkk}
          label="KVKK okudum, onaylıyorum."
        />
      </div>

      <Button
        text="İleri"
        className="blue"
        fontWeight="bold"
        onClick={() => setOpen(true)}
      />

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

      <div className="d-flex login-footer-start">
        <div className="col">
          <Button
            fontSize="9pt"
            height="45px"
            icon={AwesomeIcon.Google}
            text="Google ile giriş yap"
            className="dark"
          />
        </div>
        <div className="col">
          <Button
            fontSize="9pt"
            height="45px"
            icon={AwesomeIcon.Facebook}
            text="Facebook ile giriş yap"
            className="dark"
          />
        </div>
      </div>

      <Modal show={open} onHide={() => setOpen(false)}>
        <div className="prof-register-modal">
          <Svg.CloseIcon
            className="close-icon"
            onClick={() => setOpen(false)}
          />

          <Text variant="h2" fontSize="1.2rem" color="dark">
            Telefon Numaranızı Doğrulayın
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            <span className="prof-register-modal__phone">
              +90 422 243 35 30
            </span>
            &nbsp; numaralı telefona gönderdiğimiz 6 haneli kodu girin.
          </Text>

          <div>
            <Otp />
          </div>

          <Text fontSize="0.9rem" color="blue" textAlign="center">
            Güvenlik kodunu tekrar gönder (1:24)
          </Text>

          <Button
            fontWeight="bold"
            className="blue"
            text="İleri"
            onClick={() => setStepNumber((step) => step + 2)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default StepOne;
