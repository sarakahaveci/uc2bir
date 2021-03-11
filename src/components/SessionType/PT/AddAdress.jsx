// @ts-nocheck
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

const AddAdress = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [adressFromMap, setAdressFromMap] = useState({});
  const [location, setLocation] = useState({});

  const onPositionChange = (data) => {
    setAdressFromMap(data);
  };

  const handleSelectRelion = (event) => {
    
  };

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleTownChange = (event) => {
    getLocationOfAddress();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getLocationOfAddress = async () => {
    
  };

  const updateAddressSuccess = () => {
    toast.success('Haritadan adres eklenirken bir sorun ile karışlaşıldı', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const updateAddress = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="row w-100">
      <div className="col-12">
        <form
          style={{ padding: "0 45px", marginBottom: 15 }}
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
            items={[]}
          />
          <Material.SimpleSelect
            required
            name="district"
            forHtml="district"
            label="İlçe Seçiniz"
            changeValue={formData.district}
            onChange={handleSelectRelion}
            items={[]}
          />
          <Material.SimpleSelect
            required
            name="town"
            forHtml="rown"
            label="Mahalle Seçiniz"
            changeValue={formData.town}
            onChange={handleTownChange}
            items={[]}
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
              text="Adres Ekle"
              className="blue marginTop mx-auto  w-75"
              fontWeight="bold"
            />
          </div>
        </form>
      </div>
      <div className="col-12">
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
          />
        </div>
      </div>
    </div>
  );
};

export default AddAdress;
