/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { getGeocode } from 'use-places-autocomplete';

import {
  getCitiesAndDistict,
  setStepThree,
  submitUserBranch,
  getAdressIds,
  offerBranch,
  submitBenefits,
} from 'actions';
import { Button, Material, IconLabel, AwesomeIcon, Text } from 'components';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { genderData, yesNo, inputProps } from '../../../constants';
import { StepContext } from '../RegisterSteps';

const StepThree = () => {
  const dispatch = useDispatch();
  const {
    data: registerData,
    isLoading,
    cities,
    distict,
    town,
    isSuccessGetId,
    cityId,
    districtId,
    townId,
  } = useSelector((state) => state.registerData);

  const { stepNumber, setStepNumber } = useContext(StepContext);

  const { user } = useSelector((state) => state.auth);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [showBenefitModal, setShowBenefitModal] = useState(false);

  const userType = registerData?.['user-type']?.find(
    (userType) => userType.id === user?.type_id
  );

  const branches = registerData?.['spor_branslari']?.filter(
    (branch) => branch.type === userType?.key
  );

  const isWorkPlace = userType?.key === 'bs';
  const isDietitian = userType?.key === 'dt';

  const benefits = registerData?.['is_yeri_olanaklari'] || [];

  const [hasTaxNumber, setHasTaxNumber] = useState(isWorkPlace);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [adressFromMap, setAdressFromMap] = useState({});

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [showAddBranchArea, setShowAddBranchArea] = useState(true);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [offeredBranch, setOfferedBranch] = useState('');

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  useEffect(() => {
    if (stepNumber === 4) {
      if (isWorkPlace) setShowBenefitModal(true);
      else setShowBranchModal(true);
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
    setStepNumber((value) => (isDietitian ? value + 2 : value + 1));
  };

  const isError = () => {
    toast.error('Girilen bilgileri kontrol ediniz.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAdressSearch = async () => {
    const cityName = cities.find((city) => city.id === formData.city);
    const districtName = distict.find((dist) => dist.id === formData.distict);
    const townName = town.find((towns) => towns.id === formData.town);
    const results = await getGeocode({
      address:
        cityName?.name +
        ' ' +
        districtName?.name +
        ' ' +
        townName?.name +
        ' ' +
        formData?.address_detail,
    });
    dispatch(
      setStepThree(
        {
          ...formData,
          lat: results?.[0]?.geometry?.location?.lat(),
          lng: results?.[0]?.geometry?.location?.lng(),
        },
        isSuccess,
        isError
      )
    );
  };

  const submitStepThree = async (e) => {
    e.preventDefault();
    if (!(formData.lat && formData.lng)) {
      await handleAdressSearch();
    } else dispatch(setStepThree({ ...formData }, isSuccess, isError));
  };

  const submitBranch = (e) => {
    e.preventDefault();
    if (!!offeredBranch) dispatch(offerBranch({ branch: offeredBranch }));
    if (selectedButtons.length > 0)
      dispatch(submitUserBranch(selectedButtons, isError));
    isSuccess();
  };

  const submitBenefitsHandler = (e) => {
    e.preventDefault();
    dispatch(
      submitBenefits({ facilities: selectedBenefits }, isSuccess, isError)
    );
  };
  const handleSelectRelion = (event) => {
    dispatch(getCitiesAndDistict({ [event.target.name]: event.target.value }));
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const successCallback = () => {
    setOpen(false);
  };

  const useAdressFromMap = () => {
    dispatch(
      getAdressIds(
        {
          city: adressFromMap.city,
          district: adressFromMap.district,
          town: adressFromMap.town,
        },
        () => successCallback(),
        () => isFailGetIds()
      )
    );
  };

  useEffect(() => {
    if (isSuccessGetId) isSuccessGetIds();
  }, [isSuccessGetId]);

  const isSuccessGetIds = () => {
    dispatch(getCitiesAndDistict({ district: districtId }));
    dispatch(getCitiesAndDistict({ city: cityId }));
    setFormData({
      ...formData,
      ...adressFromMap,
      city: cityId,
      district: districtId,
      town: townId,
    });
  };

  const isFailGetIds = () => {
    toast.error('Haritadan adres eklenirken bir sorun ile karışlaşıldı', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onPositionChange = (data) => {
    setAdressFromMap(data);
  };

  const onCloseBranchModal = () => {
    setShowBranchModal(false);
    setStepNumber((value) => value - 1);
  };

  const selectBenefitHandler = (key) => {
    if (selectedButtons.includes(key)) {
      setSelectedBenefits(selectedButtons.filter((item) => item !== key));
    } else {
      setSelectedBenefits((selecteds) => [...selecteds, key]);
    }
  };

  const handleCloseBenefitModal = () => {
    setShowBenefitModal(false);
    setStepNumber((value) => value - 1);
  };

  return isLoading ? (
    <div>Yükleniyor</div>
  ) : (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title textAlign="center">Haritadan Seçin!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center">
            Mahalle, Cadde veya Sokak adı ile arayın yada Pini Sürükleyin
          </Text>
          <GoogleMap
            onPositionChange={onPositionChange}
            showSearchBox
            draggable
          />
          <div className="d-flex w-100 mt-2">
            <Button
              fontWeight="bold"
              className="blue mx-auto"
              text="Bu Adresi Kullan"
              disabled={isEmpty(adressFromMap)}
              onClick={useAdressFromMap}
            />
          </div>
        </Modal.Body>
      </Modal>

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
          changeValue={cityId}
          onChange={handleSelectRelion}
          items={cities}
        />
        <Material.select
          required
          name="district"
          forHtml="district"
          label="İlçe Seçiniz"
          changeValue={districtId}
          onChange={handleSelectRelion}
          items={distict ?? []}
        />
        <Material.select
          required
          name="town"
          forHtml="rown"
          label="Mahalle Seçiniz"
          changeValue={townId}
          onChange={handleFormOnChange}
          items={town ?? []}
        />
        {(hasTaxNumber || isWorkPlace) && (
          <>
            <Material.TextField
              required
              id="title"
              name="title"
              label="Şirket Ünvanı"
              type="text"
              onChange={handleFormOnChange}
              inputProps={inputProps}
            />
            <Material.TextField
              required
              id="taxOffice"
              name="tax_office"
              label="Vergi Dairesi"
              type="text"
              onChange={handleFormOnChange}
              inputProps={inputProps}
            />
            <Material.TextField
              required
              id="taxNumber"
              name="tax_number"
              label="Vergi No"
              type="number"
              onChange={handleFormOnChange}
              inputProps={inputProps}
            />
          </>
        )}
        <Material.TextField
          required
          id="addressDetail"
          name="address_detail"
          label="Açık Adres"
          type="text"
          changeValue={formData?.address_detail}
          onChange={handleFormOnChange}
          inputProps={inputProps}
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
      <Modal
        show={showBranchModal}
        onHide={onCloseBranchModal}
        className="material-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>Lütfen Branş Seçiminizi Yapınız</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="branchWrapper">
            {branches?.map((button) => {
              const buttonClass = selectedButtons.includes(button.id)
                ? 'branch-button activeButton'
                : 'branch-button';

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
                  label="Eklemek istediğiniz branşı yazınız"
                  type="text"
                  onChange={(event) => setOfferedBranch(event.target.value)}
                />

                <span className="text-danger mt-2 mb-2 infoText">
                  Eklemiş olduğunuz branşlar çok yakında hizmette olacak! En
                  kısa sürede seninle iletişime geçeceeğiz
                </span>
              </>
            )}
            <div className="buttonWrapper">
              <div className="col-3 col-md-3 col-sm-12 d-flex align-items-center">
                <IconLabel text="Vazgeç" onClick={onCloseBranchModal} />
              </div>
              <div className="col-8 col-md-8 col-sm-12">
                <Button
                  fontWeight="bold"
                  className="blue ml-auto w-100"
                  text="İleri"
                  size="lg"
                  disabled={
                    offeredBranch.length < 3 && !selectedButtons.length > 0
                  }
                  onClick={submitBranch}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showBenefitModal}
        onHide={handleCloseBenefitModal}
        className="material-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>İş Yeri Olanaklarını seçiniz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="branchWrapper">
            {benefits?.map((button) => {
              const buttonClass = selectedBenefits.includes(button.id)
                ? 'branch-button activeButton'
                : 'branch-button';

              return (
                <Button
                  key={button.id}
                  className={buttonClass}
                  onClick={() => selectBenefitHandler(button.id)}
                  text={button.name}
                />
              );
            })}

            <div className="buttonWrapper">
              <div className="col-3 col-md-3 col-sm-12 d-flex align-items-center">
                <IconLabel text="Vazgeç" onClick={handleCloseBenefitModal} />
              </div>
              <div className="col-8 col-md-8 col-sm-12">
                <Button
                  fontWeight="bold"
                  className="blue ml-auto w-100"
                  text="İleri"
                  size="lg"
                  onClick={submitBenefitsHandler}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StepThree;
