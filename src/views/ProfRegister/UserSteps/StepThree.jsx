/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { getGeocode } from 'use-places-autocomplete';
import styled from 'styled-components/macro';
import { device } from 'utils';
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
import { useTranslation } from 'react-i18next';

const StepThree = () => {
  const { t } = useTranslation();

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
  const [isBirthdaySafe, setIsBirthdaySafe] = useState(true);

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
    setFormData({ ...formData, [event.target.name]: event.target?.value });
  };

  const isSuccess = () => {
    setStepNumber((value) => (isDietitian ? value + 2 : value + 1));
  };

  const isError = () => {
    toast.error(t('Check the entered information'), {
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

  const submitBranch = () => {
    if (!!offeredBranch) dispatch(offerBranch({ branch: offeredBranch }));
    if (selectedButtons.length > 0)
      dispatch(submitUserBranch(selectedButtons, isError));
    isSuccess();
  };

  const submitBenefitsHandler = () => {
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
    toast.error(
      t('A problem was encountered while adding an address from the map'),
      {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const onPositionChange = (data) => {
    setAdressFromMap(data);
  };

  const onCloseBranchModal = () => {
    setShowBranchModal(false);
    setStepNumber((value) => value - 1);
  };

  const selectBenefitHandler = (key) => {
    if (selectedBenefits.filter((item) => item === key) > 0) {
      setSelectedBenefits(selectedBenefits.filter((item) => item !== key));
    } else {
      setSelectedBenefits((selecteds) => [...selecteds, key]);
    }
  };

  const handleCloseBenefitModal = () => {
    setShowBenefitModal(false);
    setStepNumber((value) => value - 1);
  };

  return isLoading ? (
    <div>{t('Loading')}</div>
  ) : (
    <>
      <StyledModal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title textAlign="center">{t('Choose From Map!')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center">
            {t('Search by Neighborhood, Street or Street name or Drag Pin')}{' '}
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
              text={t('Use This Address')}
              disabled={isEmpty(adressFromMap)}
              onClick={useAdressFromMap}
            />
          </div>
        </Modal.Body>
      </StyledModal>

      <form
        className="step-four-wrapper"
        onSubmit={submitStepThree}
        autoComplete="off"
      >
        <Material.MaterialDateField
          required
          name={isWorkPlace ? 'company_date' : 'birthday'}
          label={
            isWorkPlace ? t('Workplace Establishment date') : t('Date of Birth')
          }
          onChange={handleBirthdayChange}
          minDate="01.01.1945"
          maxDate={isWorkPlace ? new Date() : '01.15.2014'}
          minYears={isWorkPlace ? 0 : 18}
          forHtml="birthday"
          onError={(err) => setIsBirthdaySafe(!!err)}
        />

        {!isWorkPlace && (
          <>
            <Material.select
              required
              name="genre"
              forHtml="gender"
              label={t('gender')}
              onChange={handleFormOnChange}
              items={genderData}
              icon={AwesomeIcon.Gender}
            />
            <Material.select
              required
              name="tax"
              forHtml="tax"
              label={t('Are you a Taxpayer?')}
              onChange={(event) => setHasTaxNumber(!!event.target.value)}
              items={yesNo}
            />
          </>
        )}
        <IconLabel
          style={{
            color: '#00b2a9',
            textDecoration: 'underline',
          }}
          icon={AwesomeIcon.Map}
          text={t('Add From Map')}
          onClick={handleClickOpen}
        />

        <Material.select
          required
          name="city"
          forHtml="city"
          label={t('Select City')}
          changeValue={cityId}
          onChange={handleSelectRelion}
          items={cities}
        />
        <Material.select
          required
          name="district"
          forHtml="district"
          label={t('Select District')}
          changeValue={districtId}
          onChange={handleSelectRelion}
          items={distict ?? []}
        />
        <Material.select
          required
          name="town"
          forHtml="rown"
          label={t('Select Neighborhood')}
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
              label={t('Company Title')}
              type="text"
              onChange={handleFormOnChange}
              inputProps={inputProps}
            />
            <Material.TextField
              required
              id="taxOffice"
              name="tax_office"
              label={t('Tax Administration')}
              type="text"
              onChange={handleFormOnChange}
              inputProps={inputProps}
            />
            <Material.TextField
              required
              id="taxNumber"
              name="tax_number"
              label={t('Tax number')}
              type="tel"
              onChange={handleFormOnChange}
              inputProps={{ maxLength: 11 }}
            />
          </>
        )}
        <Material.TextField
          required
          id="addressDetail"
          name="address_detail"
          label={t('Open address')}
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
              label={t('Building')}
              type="text"
              onChange={handleFormOnChange}
              inputProps={{ maxLength: 5 }}
            />
          </div>
          <div className="adress-apartment">
            <Material.TextField
              required
              id="buildNo"
              name="build_no"
              label={t('Apartment')}
              type="text"
              onChange={handleFormOnChange}
              inputProps={{ maxLength: 5 }}
            />
          </div>
        </div>
        <Button
          type="submit"
          text={t('Forward')}
          className="blue"
          fontWeight="bold"
          disabled={isBirthdaySafe}
        />
      </form>
      <StyledModal
        show={showBranchModal}
        onHide={onCloseBranchModal}
        className="material-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Please Make Your Branch Selection')}</Modal.Title>
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
              label={t('Other Branches')}
            />
            {showAddBranchArea && (
              <>
                <Text fontSize="13px" fontWeight="500" className="no-margin">
                  {t('Add')}
                </Text>
                <Material.TextField
                  id="branch"
                  name="branch"
                  label={t('Enter the branch you want to add')}
                  type="text"
                  onChange={(event) => setOfferedBranch(event.target.value)}
                />

                <span className="text-danger mt-2 mb-2 infoText">
                  {t(
                    'The branches you have added will be in service very soon! We will contact you as soon as possible'
                  )}
                </span>
              </>
            )}
            <div className="buttonWrapper">
              <div className="col-3 col-md-3 col-sm-12 d-flex align-items-center">
                <IconLabel text={t('Give Up')} onClick={onCloseBranchModal} />
              </div>
              <div className="col-8 col-md-8 col-sm-12">
                <Button
                  fontWeight="bold"
                  className="blue ml-auto w-100"
                  text={t('Forward')}
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
      </StyledModal>

      <Modal
        show={showBenefitModal}
        onHide={handleCloseBenefitModal}
        className="material-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Select the Work Place Facilities')}</Modal.Title>
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
                <IconLabel
                  text={t('Give Up')}
                  onClick={handleCloseBenefitModal}
                />
              </div>
              <div className="col-8 col-md-8 col-sm-12">
                <Button
                  fontWeight="bold"
                  className="blue ml-auto w-100"
                  text={t('Forward')}
                  size="lg"
                  onClick={submitBenefitsHandler}
                  disabled={selectedBenefits.length === 0}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
const StyledModal = styled(Modal)`
  .modal-content {
    display: flex;
    width: 600px;
    @media ${device.sm} {
      margin: 0;
      padding: 0;
      height: 80vh;
      width: 90vw;
      overflow: scroll;
    }
  }
  .modal-dialog {
    margin-top: 50px !important;
    margin: auto;
  }
`;
export default StepThree;
