import React, { useEffect } from 'react';
import { Material } from 'components';
import { genderData } from '../../../constants/formData';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, setProfile } from 'actions';
import { unMaskPhone } from 'utils';

const Profile = ({ about = false, st = true }) => {
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

  if (about) {
    return (
      <section>
        {detail.isSuccess && (
          <>
            <Material.TexAreaField
              label="Hakkında"
              type="text"
              name="about"
              defaultValue={detail?.data?.about}
              settings
              action={actionSetData}
              state={detail}
            />
          </>
        )}
      </section>
    );
  } else {
    return (
      <section>
        {detail.isSuccess && (
          <>
            <Material.TextField
              label="Adınız Soyadınız"
              type="text"
              name="name"
              defaultValue={detail?.data?.name}
              settings
              action={actionSetData}
              state={detail}
            />
            {!st && (
              <Material.TextField
                label="Ünvan"
                type="text"
                name="title"
                defaultValue={detail?.data?.title}
                settings
                action={actionSetData}
                state={detail}
              />
            )}
            {st && (
              <Material.TextField
                label="Mail Adresiniz"
                type="email"
                name="name"
                defaultValue={detail?.data?.email}
                settings
                action={actionSetData}
                state={detail}
              />
            )}
            <Material.TextField
              label="Telefon Numaranız"
              type="text"
              name="phone"
              mask="\0(999) 999 99 99"
              defaultValue={detail?.data?.phone}
              settings
              action={actionSetData}
              state={detail}
            />
            <Material.SimpleSelect
              label="Cinsiyetiniz"
              items={genderData}
              name="genre"
              defaultValue={detail?.data?.genre}
              settings
              action={actionSetData}
              state={detail}
            />
            <Material.MaterialDateField
              label="Doğum Tarihiniz"
              type="text"
              name="birthday"
              defaultValue={detail?.data?.birthday}
              settings
              action={actionSetData}
              state={detail}
            />
          </>
        )}
      </section>
    );
  }
};

export default Profile;
