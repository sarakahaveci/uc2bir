/* eslint-disable react/jsx-pascal-case */
import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { toast } from 'react-toastify';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getCitiesAndDistict, getRegisterData, setStepThree } from 'actions';
import {
  Button,
  Material,
  IconLabel,
  AwesomeIcon,
  Text,
  Svg,
} from 'components';
import Map from '../../../components/google-maps/MapWidthSearchBox';
import { genderData, yesNo } from '../../../constants';

const StepThree = (props) => {
  const dispatch = useDispatch();
  const [hasTaxNumber, setHasTaxNumber] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const { data: registerData, isLoading, cities, distict } = useSelector(
    (state) => state.registerData
  );

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [showAddBranchArea, setShowAddBranchArea] = useState(false);

  useLayoutEffect(() => {
    dispatch(getRegisterData());
    dispatch(getCitiesAndDistict());
  }, []);

  const selectButtonHandler = (key) => {
    if (selectedButtons.includes(key)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== key));
    } else {
      setSelectedButtons((selecteds) => [...selecteds, key]);
    }
  };

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleBirthdayChange = (event) => {
    const value = event.target.value.toLocaleDateString().replaceAll('/', '.');
    setFormData({ ...formData, [event.target.name]: value });
  };

  const isSuccess = () => {
    setShowAddBranchArea(true);
  };

  const isError = () => {
    toast.error('Hatalı Giriş', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const submitStepThree = (e) => {
    e.preventDefault();
    dispatch(setStepThree({ ...formData }, isSuccess, isError));
  };

  const handleSelectCity = (event) => {
    dispatch(getCitiesAndDistict(event.target.value));
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
        onSubmit={submitStepThree}
        autoComplete="off"
      >
        <Material.date
          required
          name="birthday"
          forHtml="birthday"
          text="Doğum Tarihi"
          onChange={handleBirthdayChange}
        />
        <Material.select
          required
          name="genre"
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
      {showBranchModal && (
        <div className="branch-modal">
          <div className="modal-content">
            <Svg.CloseIcon
              className="close"
              onClick={() => setShowBranchModal(false)}
            />

            <p>Lütfen Branş Seçiminizi Yapınız</p>

            <div className="branchWrapper">
              {registerData?.['spor_branslari']?.map((button) => {
                const buttonClass = selectedButtons.includes(button.id)
                  ? 'button activeButton'
                  : 'button';

                return (
                  <Button
                    key={button.id}
                    className={buttonClass}
                    onClick={() => selectButtonHandler(button.id)}
                    text={button.name}
                  />
                );
              })}
              <Material.CheckBox
                onChange={(e) => setShowAddBranchArea(e.target.checked)}
                checked={showAddBranchArea}
                label="Diğer Branşlar"
              />
              {showAddBranchArea && (
                <>
                  <Text fontSize="13px" fontWeight="500" className="no-margin">
                    Ekleyin
                  </Text>
                  <Material.TextField
                    id="branch"
                    name="branch"
                    label="Eklemek istediğiniz branşları yazınız"
                    type="text"
                  />
                </>
              )}
              <div className="buttonWrapper">
                <IconLabel
                  text="Vazgeç"
                  onClick={() => setShowBranchModal(false)}
                />
                <Button fontWeight="bold" className="blue" text="İleri" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(StepThree);
