/* eslint-disable react/jsx-pascal-case */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geolocated } from 'react-geolocated';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getCitiesAndDistict } from 'actions';
import { Button, Material, IconLabel, AwesomeIcon } from 'components';
import Map from '../../../components/google-maps/MapWidthSearchBox';
import { genderData, yesNo } from '../../../constants';

const StepThree = (props) => {
  const dispatch = useDispatch();
  const [hasTaxNumber, setHasTaxNumber] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    // TODO: Add service for each case of step
  };

  return isLoading ? (
    'Loading'
  ) : (
    <>
      <Dialog
        className="material-dialog"
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="text-center">Haritadan Seçin!</DialogTitle>
        <DialogContent>
          <Map
            google={props.google}
            center={{
              lat: props.coords?.latitude,
              lng: props.coords?.longitude,
            }}
            height="350px"
            zoom={15}
            modalClose={handleClose}
          />
        </DialogContent>
      </Dialog>
      <form
        className="step-four-wrapper"
        onSubmit={onSubmit}
        autoComplete="off"
      >
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
          icon={AwesomeIcon.Gender}
        />
        <Material.select
          required
          name="tax"
          forHtml="tax"
          label="Vergi Mükellefi misiniz?"
          onChange={(event) => setHasTaxNumber(!!event.target.value)}
          items={yesNo}
        />
        <IconLabel
          icon={AwesomeIcon.Map}
          text="Haritadan Ekle"
          onClick={handleClickOpen}
        />

        <Material.select
          required
          name="city"
          forHtml="city"
          label="İl Seçiniz"
          onChange={handleSelectCity}
          items={cities}
        />

        {!hasTaxNumber ? (
          <Material.select
            required
            name="district"
            forHtml="district"
            label="İlçe Seçiniz"
            onChange={handleFormOnChange}
            items={distict ?? []}
          />
        ) : (
          <>
            <Material.TextField
              id="taxOffice"
              name="tax_office"
              label="Vergi Dairesi"
              type="text"
              onChange={handleFormOnChange}
            />
            <Material.TextField
              id="taxNumber"
              name="tax_number"
              label="Vergi No"
              type="text"
              onChange={handleFormOnChange}
            />
          </>
        )}
        <Material.TextField
          id="addressDetail"
          name="address_detail"
          label="Açık Adres"
          type="text"
          onChange={handleFormOnChange}
        />
        <div className="d-flex">
          <div className="adress-no">
            <Material.TextField
              id="apartmentNo"
              name="apt_no"
              label="Bina"
              type="text"
              onChange={handleFormOnChange}
            />
          </div>
          <div className="adress-apartment">
            <Material.TextField
              id="buildNo"
              name="build_no"
              label="Daire"
              type="text"
              onChange={handleFormOnChange}
            />
          </div>
        </div>
        <Button type="submit" text="İleri" className="blue" fontWeight="bold" />
      </form>
    </>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(StepThree);
