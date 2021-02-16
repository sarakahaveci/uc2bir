/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { toast } from 'react-toastify';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getCitiesAndDistict, setStepThree, submitUserBranch } from 'actions';
import { Button, Material, IconLabel, AwesomeIcon, Text } from 'components';
import Map from '../../../components/google-maps/MapWidthSearchBox';
import { genderData, yesNo, WORK_PLACE, DIETITIAN } from '../../../constants';
import { StepContext } from './RegisterSteps';

const StepThree = (props) => {
  const dispatch = useDispatch();
  const { data: registerData, isLoading, cities, distict, town } = useSelector(
    (state) => state.registerData
  );

  const { stepNumber, setStepNumber } = useContext(StepContext);

  const { user } = useSelector((state) => state.auth);

  const isWorkPlace = user?.type_id === WORK_PLACE;
  const isDietitian = user?.type_id === DIETITIAN;

  const [hasTaxNumber, setHasTaxNumber] = useState(isWorkPlace);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [showAddBranchArea, setShowAddBranchArea] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  useEffect(() => {
    if (stepNumber === 4) {
      setShowBranchModal(true);
    }
  }, [stepNumber]);

  useEffect(() => {
    dispatch(getCitiesAndDistict({}));
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
    const value = event.target?.value
      ?.toLocaleDateString?.()
      .replaceAll('/', '.');
    setFormData({ ...formData, [event.target.name]: value });
  };

  const isSuccess = () => {
    toast.success('Giriş Başarılı!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setStepNumber((value) => (isDietitian ? value + 2 : value + 1));
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

  const submitBranch = (e) => {
    e.preventDefault();
    dispatch(submitUserBranch(selectedButtons, isSuccess, isError));
  };

  const handleSelectRelion = (event) => {
    dispatch(getCitiesAndDistict({ [event.target.name]: event.target.value }));
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return isLoading ? (
    <div>Yükleniyor</div>
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
          name={isWorkPlace ? 'company_date' : 'birthday'}
          forHtml="birthday"
          label={isWorkPlace ? 'İş Yeri Kuruluş tarihi' : 'Doğum Tarihi'}
          onChange={handleBirthdayChange}
        />

        {!isWorkPlace && (
          <>
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
          </>
        )}
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
          onChange={handleSelectRelion}
          items={cities}
        />
        <Material.select
          required
          name="district"
          forHtml="district"
          label="İlçe Seçiniz"
          onChange={handleSelectRelion}
          items={distict ?? []}
        />
        <Material.select
          required
          name="town"
          forHtml="rown"
          label="Mahalle Seçiniz"
          onChange={handleFormOnChange}
          items={town ?? []}
        />
        {hasTaxNumber && (
          <>
            <Material.TextField
              required
              id="taxOffice"
              name="tax_office"
              label="Vergi Dairesi"
              type="text"
              onChange={handleFormOnChange}
            />
            <Material.TextField
              required
              id="taxNumber"
              name="tax_number"
              label="Vergi No"
              type="number"
              onChange={handleFormOnChange}
            />
          </>
        )}
        <Material.TextField
          required
          id="addressDetail"
          name="address_detail"
          label="Açık Adres"
          type="text"
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
              onChange={handleFormOnChange}
            />
          </div>
        </div>
        <Button type="submit" text="İleri" className="blue" fontWeight="bold" />
      </form>
      {showBranchModal && (
        <div className="branch-modal">
          <div className="branch-modal-content col-md-5 col-xs-12">
            <Text
              className="text-right"
              onClick={() => setShowBranchModal(false)}
            >
              X
            </Text>

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
                <div className="col-3 col-md-3 col-sm-12">
                  <IconLabel
                    text="Vazgeç"
                    onClick={() => setShowBranchModal(false)}
                  />
                </div>
                <div className="col-8 col-md-8 col-sm-12">
                  <Button
                    fontWeight="bold"
                    className="blue ml-auto"
                    text="İleri"
                    size="lg"
                    onClick={submitBranch}
                  />
                </div>
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
