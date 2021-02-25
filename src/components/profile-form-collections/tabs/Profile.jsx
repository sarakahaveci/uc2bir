// @ts-nocheck
import React from 'react';
import Section from '../Section';

import { Material, Svg } from 'components';
import { genderMacro } from '../../../constants/formData';

const Profile = () => {
  return (
    <Section>
      <Material.TextField
        required
        label="Adınız Soyadınız"
        type="text"
        settings
      />
      <Material.SimpleSelect
        required
        label="Cinsiyetiniz"
        items={genderMacro}
        settings
      />
      <Material.MaterialDateField
        required
        label="Doğum Tarihiniz"
        type="text"
        settings
      />
      <Material.PhoneField
        required
        label="Telefon Numaranız"
        type="text"
        settings
      />
      <Material.TextField
        required
        label="E Mail Adresiniz"
        type="mail"
        settings
      />
    </Section>
  );
};

export default Profile;
