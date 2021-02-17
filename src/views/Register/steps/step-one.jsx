// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Button, SocialLogin, Text, MacroCollections } from '../../../components';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { stepOne as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepOne, login, setStepTwo } from '../../../actions';
import StepTwo from './step-two';

const StepOne = (props) => {
  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const getStepOne = useSelector((state) => state.stepOne);
  const getStepTwo = useSelector((state) => state.stepTwo);
  const [data, setData] = useState({ ...macro.inputs });
  const [step_two, set_step_two] = useState(false);

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
				onClose: () => {dispatch(
          login(
            { email: data.email, password: data.password },
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
          ));
          return setSteps('step2');
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
      if ( getStepOne.error ) {
        for (const [key, val] of Object.entries(getStepOne.error)) {
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
      } else {
        toast.error(getStepOne.error, {
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
  },[getStepOne.error]);

  const actionStepOne = () => {
    dispatch(
			setStepOne({ ...data }, isSuccess, isError)
		);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if ( registerData ) {
      const user_type = registerData["user-type"].filter(f => f.key === "st");
      setData({...data, [data.type_id]: user_type.id});
      const response = await actionStepOne();
      return response;
    } else {
      toast.error('Bir sorun oluştu lütfen daha sonra tekrar deneyiniz.', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const isResponseSuccess = () => {
		toast.success('Kod gönderildi...', {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

  const isResponseError = () => {
		toast.error('Kod gönderilemedi...', {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
      onClose: set_step_two(false)
		});
	};

  const onClick = async () => {
    dispatch(
			setStepTwo({ phone: data.phone, code: "" }, isResponseSuccess, isResponseError)
		);
    set_step_two(true);
  }
  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        <MacroCollections macro={macro.macro} data={data} setData={setData} />
        {step_two && 
          <StepTwo
            phone={data.phone}
            setSteps={setSteps}
          />
        }
        {!(getStepOne.isLoading) && !(getStepOne.isAuthenticated) ? (
          step_two && !(getStepTwo.isSuccess) && !(getStepTwo.error) ?
            <Button 
              onClick={onSubmit}
              text={`İleri`} 
              className="blue"
            /> :           
            <Button 
              onClick={onClick}
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
      <SocialLogin />
    </>
  );
};

export default StepOne;
