// @ts-nocheck
import React, {useLayoutEffect, useState} from 'react';

import { toast } from 'react-toastify';

import { Button, MacroMap } from '../../../components';

import { stepFour as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepFour, quiz } from '../../../actions';

const StepFour = (props) => {
  const { setSteps } = props;
  const dispatch = useDispatch();
	
	const getStepFour = useSelector((state) => state.stepFour);
	const getQuiz = useSelector((state) => state.quiz);
	
  const [data, setData] = useState({ ...macro.inputs });
  const [macData, setMacroData] = useState([]);

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
				onClose: () => setSteps('finish'),
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

  const actionQuiz = () => {
    dispatch(
      quiz({}, 
        () => {
          console.log(getQuiz);
          if ( getQuiz.data ) {
            setMacroData(getQuiz.data.tests["par-q-testi"]);
          }
        }, 
        () => toast.error('Sorular yüklenemedi.', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
    )
  };

  useLayoutEffect(() => {
    if ( !getQuiz.isSuccess ) {
      actionQuiz();
    }
  },[getQuiz]);

	const actionStepFour = () => {
		dispatch(
			setStepFour({ ...data }, isSuccess, isError)
		);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const response = await actionStepFour();
    return response;
	}
  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
				{console.log(macData)}
				{!(getStepFour.isLoading) || !(getStepFour.isSuccess) ? (
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
    </>
  );
};

export default StepFour;