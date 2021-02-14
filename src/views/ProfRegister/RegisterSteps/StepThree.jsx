/* eslint-disable react/jsx-pascal-case */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { StepContext } from './RegisterSteps';
import { getCitiesAndDistict } from 'actions';
import { Button, Material, GoogleMaps, Text } from 'components';
import { genderData } from '../../../constants';

const StepOne = () => {
  const dispatch = useDispatch();
  const [hasTaxNumber, setHasTaxNumber] = useState(false);
  const [formData, setFormData] = useState({});

  const { isLoading, cities, distict } = useSelector(
    (state) => state.registerData
  );
  useLayoutEffect(() => {
    dispatch(getCitiesAndDistict());
  }, []);

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSelectCity = (event) => {
    dispatch(getCitiesAndDistict(event.target.value));
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return isLoading ? (
    'Loading'
  ) : (
    <div className="step-four-wrapper">
      <Material.date
        required
        name="date"
        forHtml="date"
        text="Doğum Tarihi"
        onChange={handleFormOnChange}
      />
      <Material.select
        required
        name="gender"
        forHtml="gender"
        label="Cinsiyet"
        onChange={handleFormOnChange}
        items={genderData}
      />
      <Material.select
        required
        name="tax"
        forHtml="tax"
        label="Vergi Mükellefi misiniz?"
        onChange={(event) => setHasTaxNumber(!!event.target.value)}
        items={[
          {
            id: 1,
            val: 1,
            text: 'Evet',
          },
          {
            id: 0,
            val: 0,
            text: 'Hayır',
          },
        ]}
      />
      <Material.select
        required
        name="city"
        forHtml="city"
        label="İl Seçiniz"
        onChange={handleSelectCity}
        items={cities}
      />
      <Material.select
        required
        name="district"
        forHtml="district"
        label="İlçe Seçiniz"
        onChange={handleFormOnChange}
        items={distict ?? []}
      />
      {hasTaxNumber && (
        <Material.TextField
          id="taxNumber"
          name="taxNumber"
          label="Vergi No"
          type="text"
          onChange={handleFormOnChange}
        />
      )}
      <Material.TextField
        id="adress"
        name="adress"
        label="Açık Adres"
        type="text"
        onChange={handleFormOnChange}
      />
      <div className="d-flex">
        <div className="adress-no">
          <Material.TextField
            id="apartment"
            name="apartment"
            label="Bina"
            type="text"
            onChange={handleFormOnChange}
          />
        </div>
        <div className="adress-apartment">
          <Material.TextField
            id="no"
            name="no"
            label="Daire"
            type="text"
            onChange={handleFormOnChange}
          />
        </div>
      </div>
      <Button
        text="İleri"
        className="blue"
        fontWeight="bold"
        onClick={() => getCurrentAdress()}
      />
    </div>
  );
};

export default StepOne;
