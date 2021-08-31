/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProfile } from 'actions';
import { Switch } from 'components';

export default function AllowPackage() {
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
          "Pakete İzin Ver" açık olduğunda kullanıcılar üç2bir.com tarafından
          oluşturulan paketler üzerinden size randevu oluşturabilir. Paket
          katılımına onay vermeniz durumunda Ücretlendirme kalsifikasyonunuza
          göre standart fiyatlar üzerinden belirlenecektir.
        </text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <text style={{ fontFamily: 'Poppins' }}>Pakete İzin Ver</text>
        <Switch
          checked={accept_package == 'yes'}
          onChange={() => {
            dispatch(
              setProfile(
                {
                  accept_package: accept_package == 'yes' ? 'no' : 'yes',
                },
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
          }}
        />
      </div>
    </div>
  );
}
