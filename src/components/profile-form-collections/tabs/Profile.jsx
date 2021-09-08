import React, { useEffect } from 'react';
import { Material } from 'components';
import { genderData } from '../../../constants/formData';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';
import { unMaskPhone } from 'utils';

const Profile = ({ about = false, st = true }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { detail } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );

  const actionSetData = async (name, value) => {
    if (name === 'phone') {
      value = unMaskPhone(value);
    }
    dispatch(
      setProfile(
        { [name]: value },
        () => {
          toast.success(t('Your information has been updated'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
        },
        () => {
          toast.error(t('Failed to update'), {
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
              label={t('About')}
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
              label={t('your name and your surname')}
              type="text"
              name="name"
              defaultValue={detail?.data?.name}
              settings
              action={actionSetData}
              state={detail}
            />
            {!st && (
              <Material.TextField
                label={t('title')}
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
                label={t('Your Email Address')}
                type="email"
                name="name"
                defaultValue={detail?.data?.email}
                settings
                action={actionSetData}
                state={detail}
              />
            )}
            <Material.TextField
              label={t('Your telephone number')}
              type="text"
              name="phone"
              mask="\0(999) 999 99 99"
              defaultValue={detail?.data?.phone}
              settings
              action={actionSetData}
              state={detail}
            />
            <Material.SimpleSelect
              label={t('Your gender')}
              items={genderData}
              name="genre"
              defaultValue={detail?.data?.genre}
              settings
              action={actionSetData}
              state={detail}
            />
            <Material.MaterialDateField
              label={t('Your Date of Birth')}
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
