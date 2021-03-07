/* eslint-disable react/jsx-pascal-case */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { getGeocode } from 'use-places-autocomplete';

import {
  getCitiesAndDistict,
  getAdressIds,
  getProfileInformation,
  updateUserAdress,
} from 'actions';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { Material, Button } from 'components';

export default function Address() {
  const dispatch = useDispatch();

  const {
    cities,
    distict,
    town,
    cityId,
    districtId,
    townId,
    isSuccessGetId,
  } = useSelector((state) => state.registerData);

  const { userInfo, isLoading, isSuccessGetDetail } = useSelector(
    (state) => state.profile
  );

  const addressId = userInfo?.addresses?.[0]?.id;

  const [formData, setFormData] = useState({});
  const [adressFromMap, setAdressFromMap] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    dispatch(getCitiesAndDistict({}));
    dispatch(getProfileInformation());
  }, []);

  const getCityAndDistrict = async (city, district) => {
    await dispatch(getCitiesAndDistict({ city }));
    await dispatch(getCitiesAndDistict({ district }));
  };

  useEffect(() => {
    if (isSuccessGetDetail) {
      setFormData({
        ...formData,
        city: userInfo?.addresses?.[0]?.city,
        district: userInfo?.addresses?.[0]?.district,
        town: userInfo?.addresses?.[0]?.town,
        address_detail: userInfo?.addresses?.[0]?.address_detail,
        build_no: userInfo?.addresses?.[0]?.build_no,
        apt_no: userInfo?.addresses?.[0]?.apt_no,
        lat: userInfo?.addresses?.[0]?.lat,
        lng: userInfo?.addresses?.[0]?.lng,
      });

      if (
        userInfo?.addresses?.[0]?.lat?.replaceAll(' ', '') &&
        userInfo?.addresses?.[0]?.lng?.replaceAll(' ', '')
      ) {
        setLocation({
          lat: +userInfo?.addresses?.[0]?.lat?.replaceAll(' ', ''),
          lng: +userInfo?.addresses?.[0]?.lng?.replaceAll(' ', ''),
        });
      }
      getCityAndDistrict(
        userInfo?.addresses?.[0]?.city,
        userInfo?.addresses?.[0]?.district
      );
    }
  }, [isSuccessGetDetail]);

  useEffect(() => {
    if (isSuccessGetId) {
      getCityAndDistrict(cityId, districtId);
      setFormData({
        ...formData,
        ...adressFromMap,
        city: cityId,
        district: districtId,
        town: townId,
        build_no: null,
        apt_no: null,
      });
    }
  }, [isSuccessGetId]);

  const getLocationOfAddress = async () => {
    const cityName = cities?.find((city) => city.id === formData.city);
    const districtName = distict?.find((dist) => dist.id === formData.distict);
    const townName = town?.find((towns) => towns.id === formData.town);

    const results = await getGeocode({
      address:
        townName?.name + ', ' + districtName?.name + ', ' + cityName?.name,
    });
    const lat = results?.[0]?.geometry?.location?.lat();
    const lng = results?.[0]?.geometry?.location?.lng();
    setLocation({ lat, lng });
  };

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleTownChange = (event) => {
    getLocationOfAddress();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onPositionChange = (data) => {
    setAdressFromMap(data);
  };

  const updateAddressFail = () => {
    toast.error(
      'Adres güncellenirken hata ile karşılaşıldı. Bilgileri kontrol ediniz',
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
  };

  const updateAddressSuccess = () => {
    toast.success('Haritadan adres eklenirken bir sorun ile karışlaşıldı', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const updateAddress = async (e) => {
    e.preventDefault();
    if (!formData?.lat && !formData?.lng) {
      const cityName = cities?.find((city) => city.id === formData.city);
      const districtName = distict?.find(
        (dist) => dist.id === formData.distict
      );
      const townName = town?.find((towns) => towns.id === formData.town);
      const results = await getGeocode({
        address:
          townName?.name + ', ' + districtName?.name + ', ' + cityName?.name,
      });
      const lat = results?.[0]?.geometry?.location?.lat();
      const lng = results?.[0]?.geometry?.location?.lng();

      dispatch(
        updateUserAdress(
          addressId,
          { ...formData, lat, lng },
          updateAddressSuccess,
          updateAddressFail
        )
      );
    } else
      dispatch(
        updateUserAdress(
          addressId,
          { ...formData, ...location },
          updateAddressSuccess,
          updateAddressFail
        )
      );
  };

  const isFailGetIds = () => {
    toast.error('Haritadan adres eklenirken bir sorun ile karışlaşıldı', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const useAdressFromMap = () => {
    dispatch(
      getAdressIds(
        {
          city: adressFromMap.city,
          district: adressFromMap.district,
          town: adressFromMap.town,
        },
        () => {},
        () => isFailGetIds()
      )
    );
  };

  const handleSelectRelion = (event) => {
    if (event.target.name === 'city') {
      setFormData({
        ...formData,
        city: event.target.value,
        district: null,
        town: null,
      });
    } else {
      setFormData({
        ...formData,
        town: null,
        [event.target.name]: event.target.value,
      });
    }
    dispatch(getCitiesAndDistict({ [event.target.name]: event.target.value }));
  };

  return isLoading ? (
    <>Yükleniyor</>
  ) : (
    <div className="row w-100 h-100 px-1">
      <div className="col-md-6 col-sm-12">
        <form
          className="step-four-wrapper"
          onSubmit={updateAddress}
          autoComplete="off"
        >
          <Material.SimpleSelect
            required
            name="city"
            forHtml="city"
            label="İl Seçiniz"
            changeValue={formData.city}
            onChange={handleSelectRelion}
            items={cities}
          />
          <Material.SimpleSelect
            required
            name="district"
            forHtml="district"
            label="İlçe Seçiniz"
            changeValue={formData.district}
            onChange={handleSelectRelion}
            items={distict ?? []}
          />
          <Material.SimpleSelect
            required
            name="town"
            forHtml="rown"
            label="Mahalle Seçiniz"
            changeValue={formData.town}
            onChange={handleTownChange}
            items={town ?? []}
          />
          <Material.TextField
            required
            id="addressDetail"
            name="address_detail"
            label="Açık Adres"
            type="text"
            changeValue={formData?.address_detail}
            onChange={handleFormOnChange}
          />
          <div className="d-flex">
            <div className="adress-no">
              <Material.TextField
                required
                id="apartmentNo"
                name="apt_no"
                label="Bina"
                type="number"
                changeValue={+formData?.apt_no}
                onChange={handleFormOnChange}
              />
            </div>
            <div className="adress-apartment">
              <Material.TextField
                required
                id="buildNo"
                name="build_no"
                label="Daire"
                type="number"
                changeValue={+formData?.build_no}
                onChange={handleFormOnChange}
              />
            </div>
          </div>
          <div className="d-flex w-100">
            <Button
              type="submit"
              text="Adresi Güncelle"
              className="blue marginTop mx-auto  w-75"
              fontWeight="bold"
            />
          </div>
        </form>
      </div>
      <div className="col-md-6 col-sm-12">
        <GoogleMap
          onPositionChange={onPositionChange}
          draggable
          locationFromUser={!isEmpty(location) ? location : false}
        />
        <div className="d-flex w-100">
          <Button
            fontWeight="bold"
            className="blue mx-auto mt-2 w-75"
            text="Haritadaki adresi listeye aktar"
            disabled={isEmpty(adressFromMap)}
            onClick={useAdressFromMap}
          />
        </div>
      </div>
    </div>
  );
}
