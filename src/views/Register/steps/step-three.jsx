import React, { useState } from 'react';

import { toast } from 'react-toastify';

import { Button, Material, AwesomeIcon } from 'components';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { setStepThree } from '../../../actions';
import { genderData } from '../../../constants';

const StepThree = (props) => {
  const { t } = useTranslation();

  const { setSteps } = props;
  const dispatch = useDispatch();

  const getStepThree = useSelector((state) => state.stepThree);

  const [formData, setFormData] = useState({});
  const [isBirthdaySafe, setIsBirthdaySafe] = useState(false);

  const isSuccess = () => {
    toast.success(t('Your information has been updated'), {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      toast.info(t('Please wait! You are redirected...'), {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => setSteps('step4'),
      });
    }, 1000);
  };
  const isError = () => {
    toast.error(t('Incorrect entry'), {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const actionStepThree = () => {
    dispatch(setStepThree({ ...formData }, isSuccess, isError));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    actionStepThree();
  };

  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="d-flex w-100 flex-wrap">
          <Material.MaterialDateField
            required
            name="birthday"
            forHtml="birthday"
            label={t('Your Date of Birth')}
            minDate="01.01.1945"
            maxDate="01.15.2014"
            onError={(err) => setIsBirthdaySafe(!!err)}
            onChange={handleFormOnChange}
          />
          <Material.select
            required
            name="genre"
            forHtml="gender"
            label={t('gender')}
            items={genderData}
            icon={AwesomeIcon.Gender}
            onChange={handleFormOnChange}
          />
        </div>
        {!getStepThree.isLoading || !getStepThree.isSuccess ? (
          <Button
            type="submit"
            text={t('Forward')}
            className="blue"
            disabled={isBirthdaySafe}
          />
        ) : (
          <Button text={t('Loading')} className="blue" />
        )}
      </form>
    </>
  );
};

export default StepThree;
