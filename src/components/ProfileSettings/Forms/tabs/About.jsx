// @ts-nocheck
import React, { useEffect } from 'react';
import Section from '../Section';

import { Material } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile } from 'actions';
import { unMaskPhone } from 'utils';

const About = (props) => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.profileSettings);

  const actionGetData = async () => {
    await dispatch(
      getProfile(
        () => {},
        () => {
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  const actionSetData = async (name, value) => {
    if (name === 'phone') {
      value = unMaskPhone(value);
    }
    dispatch(
      setProfile(
        { [name]: value },
        () => {
          toast.success('Bilgileriniz güncellendi.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        },
        () => {
          toast.error('Güncelleme işlemi yapılamadı.', {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      )
    );
  };

  useEffect(() => {
    actionGetData();
  }, []);

  return (
    <Section>
      {detail.isSuccess && (
        <>
          <Material.TexAreaField
            label="Hakkında"
            type="text"
            name="about"
            value={detail?.data?.about}
            defaultValue={detail?.data?.about}
            settings
            action={actionSetData}
            state={detail}
          />
        </>
      )}
    </Section>
  );
};

export default About;
