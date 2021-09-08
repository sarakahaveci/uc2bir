/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';
import { Switch } from 'components';
import { useTranslation } from 'react-i18next';

export default function ShowPersonalInfo() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const share_data = useSelector(
    (state) => state.profileSettings2.profileDetail?.detail?.data?.share_data
  );
  return (
    <div className="w-100 h-100">
      <div className="w-100">
        <text
          style={{ fontSize: '13px', fontFamily: 'Poppins', color: '#7B7B7B' }}
        >
          {t(
            "When 'View My Profile' is turned on, your height, weight, BMI, completed tests and completed reservations are visible to other users"
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
        <text style={{ fontFamily: 'Poppins' }}>{t('Show My Profile')}</text>
        <Switch
          checked={share_data == 'yes'}
          onChange={() => {
            dispatch(
              setProfile(
                {
                  share_data: share_data == 'yes' ? 'no' : 'yes',
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
