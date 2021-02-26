// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Section from '../Section';

import { Material, Svg } from 'components';
import { genderData } from '../../../constants/formData';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile } from 'actions';

const Profile = () => {
  const [data, setData] = useState({
    name: "Arif GEVENCİ",
    title: "",
    birthday: "1989-08-20T21:00:00",
    genre: "m",
    about: "about",
  });

  const dispatch = useDispatch();
  const {
    detail: { data: detail, isSuccess }
  } = useSelector((state) => state.profileSettings);

  const actionGetData = () => {
    dispatch(getProfile(
      () => {},
      () => {}
    ));
  };

  useEffect(() => {
    actionGetData();
  },[isSuccess]);

  return (
    <Section>
      {console.log(data)}
      <Material.TextField
        required
        label="Adınız Soyadınız"
        type="text"
        settings
        name="name"
        value={data.name}
        defaultValue={data.name}
        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
      />
      <Material.TextField
        required
        label="Hakkında"
        type="text"
        settings
        name="about"
        value={data.about}
        defaultValue={data.about}
        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
      />
      <Material.SimpleSelect
        required
        label="Cinsiyetiniz"
        defaultValue={data.genre}
        items={genderData}
        settings
        name="genre"
        value={data.genre}
        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
      />
      <Material.MaterialDateField
        required
        label="Doğum Tarihiniz"
        type="text"
        settings
        name="birthday"
        value={data.birthday}
        defaultValue={data.birthday}
        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
      />
    </Section>
  );
};

export default Profile;
