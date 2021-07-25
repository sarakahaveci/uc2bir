/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import { toast } from 'react-toastify';
import { setProfile } from 'actions'
import {Switch } from 'components';

export default function ShowPersonalInfo() {
  const dispatch = useDispatch();
  const { share_data } = useSelector(state => state.profileSettings2.profileDetail?.detail?.data)
  return (

    <div className="w-100 h-100">
      <div className="w-100">
        Kişisel bilgilerimin 3.kişilere (Eğitmen, Diyetisyen) gösterilebilir.
      </div>
      <Switch
        checked={share_data == 'yes'}
        onChange={() => {
          dispatch(
            setProfile({
              share_data: share_data == 'yes' ? 'no' : 'yes',
            }, () => {
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
              })
          );
        }}
      />
    </div>
  );
}
