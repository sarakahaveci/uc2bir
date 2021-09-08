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
import { useTranslation } from 'react-i18next';

export default function Address({ locationDisable = false }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { cities, distict, town, cityId, districtId, townId, isSuccessGetId } =
    useSelector((state) => state.registerData);

  const { userInfo, isLoading, isSuccessGetDetail } = useSelector(
    (state) => state.profile
  );

  const [formData, setFormData] = useState({});
  const [adressFromMap, setAdressFromMap] = useState({});
  const [location, setLocation] = useState({});
  const [townList, setTownList] = useState(town);
  const [addressId, setAddressId] = useState(userInfo?.id);

  useEffect(() => {
    dispatch(getCitiesAndDistict({}));
    dispatch(getProfileInformation());
  }, []);

  useEffect(() => {
    setTownList(town);
  }, [town]);

  const getCityAndDistrict = (city, district) => {
    dispatch(getCitiesAndDistict({ city }));
    dispatch(getCitiesAndDistict({ district }));
  };

  useEffect(() => {
    if (isSuccessGetDetail) {
      setAddressId(userInfo?.id);
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

  const getLocationOfAddress = async (reqTown) => {
    const cityName = await cities?.find((city) => city.id === formData.city);
    const districtName = await distict?.find(
      (dist) => dist.id === formData.distict
    );
    const townName = await town?.find((towns) => towns.id === reqTown);
    const results = await getGeocode({
      address:
        townName?.name + ', ' + districtName?.name + ', ' + cityName?.name,
    });
    const lat = results?.[0]?.geometry?.location?.lat();
    const lng = results?.[0]?.geometry?.location?.lng();
    await setLocation({ lat, lng });
  };

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleTownChange = (event) => {
    getLocationOfAddress(event.target.value);
    setFormData({
      ...formData,
      address_detail: null,
      apt_no: null,
      build_no: null,
      [event.target.name]: event.target.value,
    });
  };

  const onPositionChange = (data) => {
    setAdressFromMap(data);
  };

  const updateAddressFail = () => {
    toast.error(
      t('Error encountered while updating address. Check the information'),
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
  };

  const updateAddressSuccess = () => {
    toast.success(t('Address added from map with success'), {
      position: 'bottom-right',
      autoClose: 3000,
    });
    dispatch(getProfileInformation());
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
    toast.error(
      t('A problem was encountered while adding an address from the map'),
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
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
        address_detail: null,
        apt_no: null,
        build_no: null,
      });
    } else {
      setFormData({
        ...formData,
        address_detail: null,
        town: null,
        apt_no: null,
        build_no: null,
        [event.target.name]: event.target.value,
      });
    }
    dispatch(getCitiesAndDistict({ [event.target.name]: event.target.value }));
  };

  return isLoading ? (
    <>{t('Loading')}</>
  ) : (
    <div className="w-100 h-100">
      <div className="w-100">
        <form
          className="step-four-wrapper"
          onSubmit={updateAddress}
          autoComplete="off"
        >
          <Material.SimpleSelect
            required
            name="city"
            forHtml="city"
            label={t('Select City')}
            changeValue={formData?.city || ''}
            onChange={handleSelectRelion}
            items={cities}
          />
          <Material.SimpleSelect
            required
            name="district"
            forHtml="district"
            label={t('Select District')}
            changeValue={formData?.district || ''}
            onChange={handleSelectRelion}
            items={distict ?? []}
          />
          <Material.SimpleSelect
            required
            name="town"
            forHtml="town"
            label={t('Select Neighborhood')}
            changeValue={formData?.town || ''}
            onChange={handleTownChange}
            items={townList ?? []}
          />
          <Material.TextField
            required
            id="addressDetail"
            name="address_detail"
            label={t('Open address')}
            type="text"
            changeValue={formData?.address_detail || ''}
            onChange={handleFormOnChange}
          />
          <div className="d-flex">
            <div className="adress-no">
              <Material.TextField
                id="apartmentNo"
                name="apt_no"
                label={t('Building')}
                type="text"
                changeValue={formData?.apt_no || ''}
                onChange={handleFormOnChange}
              />
            </div>
            <div className="adress-apartment">
              <Material.TextField
                id="buildNo"
                name="build_no"
                label={t('Apartment')}
                type="text"
                changeValue={formData?.build_no || ''}
                onChange={handleFormOnChange}
              />
            </div>
          </div>
          <div className="d-flex w-100">
            <Button
              type="submit"
              text={t('Update Address')}
              className="blue marginTop mx-auto mb-2 w-50"
              fontWeight="bold"
            />
          </div>
        </form>
      </div>
      {!locationDisable && (
        <div className="w-100">
          <GoogleMap
            onPositionChange={onPositionChange}
            draggable
            locationFromUser={!isEmpty(location) ? location : false}
          />
          <div className="d-flex w-100">
            <Button
              fontWeight="bold"
              className="blue mx-auto mt-2 w-50"
              text={t('Export address on map to list')}
              disabled={isEmpty(adressFromMap)}
              onClick={useAdressFromMap}
            />
          </div>
        </div>
      )}
    </div>
  );
}
