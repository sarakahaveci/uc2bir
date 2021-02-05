import React, { useState } from 'react';
import { Link } from 'gatsby';

import { Modal } from 'react-bootstrap';
import { Button, Text, Material } from 'components';
import { macroConverter } from 'utils';
import AwesomeIcon from '../../../../statics/icon';

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

  const [acceptMemberAgreement, setAcceptMemberAgreement] = useState(false);
  const [acceptHealthAgreement, setAcceptHealthAgreement] = useState(false);
  const [acceptKvkk, setAcceptKvkk] = useState(false);

  const [open, setOpen] = useState(false);

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
        <div className="modal-register">
          <Text variant="h2" fontSize="1.2rem" color="dark">
            Telefon Numaranızı Doğrulayın
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default StepOne;
