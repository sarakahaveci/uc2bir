/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import { toast } from 'react-toastify';
import { setProfile } from 'actions'
import {Switch } from 'components';

export default function ShowPersonalInfo() {
  const dispatch = useDispatch();
  const share_data = useSelector(state => state.profileSettings2.profileDetail?.detail?.data?.share_data)
  return (

    <div className="w-100 h-100">
      <div className="w-100">
        <text style={{fontSize:'13px',fontFamily:'Poppins',color:'#7B7B7B'}}>Profilinizi gizli tuttuğunuzda boy, kilo,vki bilgileriniz, tamamlanmış testleriniz ve tamamlanan rezervasyonlarınız gizli tutulur.</text>
      </div>
      <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
        <text style={{fontFamily:'Poppins',}} >Profilimi Gizle</text>
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
    </div>
  );
}
