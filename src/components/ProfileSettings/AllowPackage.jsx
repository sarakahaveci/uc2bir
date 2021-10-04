/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';
import { Switch } from 'components';
import { useTranslation } from 'react-i18next';

export default function AllowPackage() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const accept_package = useSelector(
    (state) =>
      state.profileSettings2.profileDetail?.detail?.data?.accept_package
  );
  return (
    <div className="w-100 h-100">
      <div className="w-100">
        <text
          style={{ fontSize: '13px', fontFamily: 'Poppins', color: '#7B7B7B' }}
        >
          {t(
            "When 'Allow Package' is turned on, users can create an appointment for you through packages created by uc2bir.com. If you approve the package participation, Pricing will be determined at standard prices according to your qualification."
          )}
        </text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <text style={{ fontFamily: 'Poppins' }}>{t('Allow Package')}</text>
        <Switch
          checked={accept_package == 'yes'}
          onChange={() => {
            dispatch(
              setProfile(
                {
                  accept_package:
                    accept_package == t('yes') ? t('no') : t('yes'),
                },
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
          }}
        />
      </div>
    </div>
  );
}
