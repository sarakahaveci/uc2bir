// @ts-nocheck
import React, { useEffect } from 'react';
import Section from '../Section';

import { Material } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile } from 'actions';
import { unMaskPhone } from 'utils';

const ProfileForms = ({ type }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );

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
          {(type === 'PERSONAL_TRAINER' || 'WORK_PLACE') && (
            <>
              <Material.TextField
                label="Şirket Ünvanı"
                type="text"
                name="title"
                value={detail?.data?.title}
                defaultValue={detail?.data?.title}
                settings
                action={actionSetData}
                state={detail}
              />
              <Material.TextField
                label="Vergi Dairesi"
                type="text"
                name="tax_office"
                value={detail?.data?.tax_office}
                defaultValue={detail?.data?.tax_office}
                settings
                action={actionSetData}
                state={detail}
              />
              <Material.TextField
                label="Vergi No"
                type="text"
                name="tax_number"
                value={detail?.data?.tax_number}
                defaultValue={detail?.data?.tax_number}
                settings
                action={actionSetData}
                state={detail}
              />
            </>
          )}
        </>
      )}
    </Section>
  );
};

export default ProfileForms;
