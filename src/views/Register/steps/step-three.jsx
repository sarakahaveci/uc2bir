// @ts-nocheck
import React, {useState} from 'react';

import { toast } from 'react-toastify';

import { Button, MacroMap } from '../../../components';

import { stepThree as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepThree } from '../../../actions';

const StepThree = (props) => {
	const { setSteps } = props;
  const dispatch = useDispatch();
	
	const getStepThree = useSelector((state) => state.stepThree);
	
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

	const actionStepThree = () => {
		dispatch(
			setStepThree({ ...data }, isSuccess, isError)
		);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const response = await actionStepThree();
    return response;
	}
	return (
		<>
			<form onSubmit={onSubmit} autoComplete="off">
				<MacroMap macro={macro.macro} data={data} setData={setData}/>
				{!(getStepThree.isLoading) || !(getStepThree.isSuccess) ? (
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

export default StepThree;