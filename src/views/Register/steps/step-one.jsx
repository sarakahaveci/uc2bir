// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Material, Button, AwesomeIcon, Text } from '../../../components';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { stepOne as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepOne, login } from '../../../actions';

const StepOne = (props) => {
  const { setSteps } = props;
  const dispatch = useDispatch();

  const getStepOne = useSelector((state) => state.stepOne);
  const [data, setData] = useState({ ...macro.inputs });

  const isSuccess = () => {
    toast.success('Kayıt alındı.', {
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
				onClose: () => {
          dispatch(
            login({ email: data.email, password: data.password }, 
              () => setSteps('step2'), 
              () => toast.error('Hatalı Giriş', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            )
          );
        },
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

  useEffect(() => {
    if ( getStepOne.error ) {
      if ( getStepOne.error.message ) {
        for (const [key, val] of Object.entries(getStepOne.error.message)) {
          toast.error(`${key}: ${val}`, {
            position: 'bottom-right',
            autoClose: 4500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  },[getStepOne.error]);

  const actionStepOne = () => {
    dispatch(
			setStepOne({ ...data }, isSuccess, isError)
		);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
		const response = await actionStepOne();
    return response;
  };
  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        {macro.macro.map((val, key) => {
          return (
            <div style={{ width: '100%' }} key={key}>
              {(val.type === 'text' ||
                val.type === 'email' ||
                val.type === 'password' ||
                val.type === 'date') &&
                Material[val.type]({
                  id: val.name,
                  name: val.name,
                  type: val.type,
                  label: val.text,
                  required: val.required,
                  onChange: (e) =>
                    setData({ ...data, [e.target.name]: e.target.value }),
                  autoComplete: 'off',
                  icon: val.icon,
                })}
            </div>
          );
        })}
        <div style={{ width: '100%' }}>
          {macro.macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`radio-${key}`}>
                {val.type === 'radio' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    type: val.type,
                    label: val.text,
                    required: val.required,
                    onChange: (e) =>
                      setData({ ...data, [e.target.name]: e.target.value }),
                    autoComplete: 'off',
                    items: val.items ? val.items : [],
                  })}
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%' }}>
          {macro.macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`select-${key}`}>
                {val.type === 'select' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    type: val.type,
                    label: val.text,
                    required: val.required,
                    onChange: (e) =>
                      setData({ ...data, [e.target.name]: e.target.value }),
                    autoComplete: 'off',
                    icon: val.icon,
                    items: val.items ? val.items : [],
                  })}
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%', marginBottom: 25, marginTop: 40 }}>
          {macro.macro.map((val, key) => {
            return (
              <div style={{ width: '100%' }} key={`check-${key}`}>
                {val.type === 'checkbox' &&
                  Material[val.type]({
                    id: val.name,
                    name: val.name,
                    required: val.required,
                    type: val.type,
                    label: val.text || (val.component && val.component()),
                    onChange: (e) =>
                      setData({
                        ...data,
                        [val.name]: e.target.checked ? 1 : 0,
                      }),
                    checked: data[val.name] ? true : false,
                  })}
              </div>
            );
          })}
        </div>
        {!(getStepOne.isLoading) && !(getStepOne.isAuthenticated) ? (
          <Button 
            type="submit" 
            text={`İleri`} 
            className="blue"
          />
        ) : (
            <Button
              onClick={() => {
                console.log('Lütfen Bekleyiniz...');
              }}
              text={`Yükleniyor...`}
              className="blue"
            />
          )}
      </form>
      <Text
        style={{ marginTop: 30, marginBottom: 10 }}
        fontSize="12pt"
        gray
        textAlign="center"
      >
        Hesabınız var mı? <Link to="/login">Giriş Yap</Link>
      </Text>
      <div className="identfy">
        <span>Veya</span>
      </div>
      <div className="d-flex login-footer-start">
        <div className="col">
          <Button
            fontSize="9pt"
            height="45px"
            icon={AwesomeIcon.Google}
            text="Google ile giriş yap"
            className="dark"
          />
        </div>
        <div className="col">
          <Button
            fontSize="9pt"
            height="45px"
            icon={AwesomeIcon.Facebook}
            text="Facebook ile giriş yap"
            className="dark"
          />
        </div>
      </div>
    </>
  );
};

export default StepOne;
