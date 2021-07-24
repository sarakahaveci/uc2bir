/* eslint-disable react/jsx-pascal-case */

import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';

import { Material } from 'components';

export default function ShowPersonalInfo() {
  // const dispatch = useDispatch();

  // const { cities, distict, town, cityId, districtId, townId, isSuccessGetId } =
  //   useSelector((state) => state.registerData);

  // const { userInfo, isLoading, isSuccessGetDetail } = useSelector(
  //   (state) => state.profile
  // );







  // const updateAddressFail = () => {
  //   toast.error(
  //     'Adres güncellenirken hata ile karşılaşıldı. Bilgileri kontrol ediniz',
  //     {
  //       position: 'bottom-right',
  //       autoClose: 3000,
  //     }
  //   );
  // };

  // const updateAddressSuccess = () => {
  //   toast.success('Haritadan adres başarı ile eklendi', {
  //     position: 'bottom-right',
  //     autoClose: 3000,
  //   });
  // };






  return (

    <div className="w-100 h-100">
      <div className="w-100">
        Kişisel bilgilerimin 3.kişilere (Eğitmen, Diyetisyen) gösterilebilir.
      </div>
      <Material.IOSSwitch></Material.IOSSwitch>
    </div>
  );
}
