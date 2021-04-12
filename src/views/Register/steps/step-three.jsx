import React, { useState } from 'react';

import { toast } from 'react-toastify';

import { Button, Material, AwesomeIcon } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { setStepThree } from '../../../actions';
import { genderData } from '../../../constants';

const StepThree = (props) => {
  const { setSteps } = props;
  const dispatch = useDispatch();

  const getStepThree = useSelector((state) => state.stepThree);

  const [formData, setFormData] = useState({});
  const [isBirthdaySafe, setIsBirthdaySafe] = useState(false);

  const isSuccess = () => {
    toast.success('Bilgileriniz güncellendi.', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
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
            label="Doğum Tarihi"
            minDate="01.01.1945"
            maxDate="01.15.2014"
            onError={(err) => setIsBirthdaySafe(!!err)}
            onChange={handleFormOnChange}
          />
          <Material.select
            required
            name="genre"
            forHtml="gender"
            label="Cinsiyet"
            items={genderData}
            icon={AwesomeIcon.Gender}
            onChange={handleFormOnChange}
          />
        </div>
        {!getStepThree.isLoading || !getStepThree.isSuccess ? (
          <Button
            type="submit"
            text={`İleri`}
            className="blue"
            disabled={isBirthdaySafe}
          />
        ) : (
          <Button text={`Yükleniyor...`} className="blue" />
        )}
      </form>
    </>
  );
};

export default StepThree;
