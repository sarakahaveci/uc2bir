// @ts-nocheck
import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Material, Button } from '../../../components';

import { toast } from 'react-toastify';

import { stepTwo as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepTwo, verifyCode } from '../../../actions';

const StepTwo = (props) => {
	const getStepOne = useSelector((state) => state.stepOne);
	const getStepTwo = useSelector((state) => state.stepTwo);
	const { setSteps } = props;

	const [verifyCode, setVerifyCode] = useState(false);
	const [code, setCode] = useState({ ...macro.inputs });
	const [counter, setCounter] = useState(0);
	const time = 120;

	const isResponseSuccess = () => {
		setVerifyCode(true);
		return setCounter(time);
	};
	const isResponseError = () => {
		toast.error('Mesaj gönderilirken hata oluştu...', {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		setVerifyCode(false);
		return setCounter(0);
	};

	const isResultSuccess = () => {
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
						setStepTwo({ ...getStepOne.data, code: Object.values(code).map(val => val).join("") },
							() => setSteps("step3"),
							() => toast.error('Bir sorun oluştu lütfen yeniden üye olunuz.', {
								position: 'bottom-right',
								autoClose: 2000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								onClose: setSteps("step2")
							}))
					);
				},
			});
		}, 1000);
	};
	const isResultError = () => {
		toast.error('Kod doğrulanamadı...', {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const dispatch = useDispatch();
	const vrf_response = () => {
		dispatch(
			verifyCode({ phone: getStepOne.data.phone, code: "" }, isResponseSuccess, isResponseError)
		);
	}
	const vrf_result = () => {
		dispatch(
			setStepTwo({ phone: getStepOne.data.phone, code: Object.values(code).map(val => val).join("") }, isResultSuccess, isResultError)
		);
	}

	const [open, setOpen] = useState(true);
	const fullWidth = true;
	const maxWidth = 'sm';

	const handleClose = () => setOpen(false);
	const handleClickOpen = () => setOpen(true);

	useEffect(() => {
		if (verifyCode) {
			setOpen(true);
		} else {
			vrf_response();
		}
	}, [verifyCode]);

	useEffect(() => {
		if (counter > 0) {
			const interval = setInterval(() => {
				setCounter(counter - 1);
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}, [counter]);

	const onSubmit = (event) => {
		event.preventDefault();
		return vrf_result();
	}
	return (
		<>
			<React.Fragment>
				<Button className="blue" style={{ marginBottom: 15 }} onClick={handleClickOpen} fontSize="11pt" text="Kodu Gir!" />
				<Button className="blue" style={{ marginBottom: 15 }} onClick={vrf_response} fontSize="11pt" text="Telefonuma Kodu Tekrar Gönder!" />
				<Dialog
					className="material-dialog"
					fullWidth={fullWidth}
					maxWidth={maxWidth}
					open={open}
					onClose={handleClose}>
					<DialogTitle className="text-center">Telefon Numaranızı Doğrulayın</DialogTitle>
					<DialogContent>
						<DialogContentText style={{ padding: "15px 30px" }} className="text-center">
							<b></b> numaralı telefona gönderdiğimiz 6 haneli kodu girin.
          	</DialogContentText>
						<div className="d-flex flex-wrap dialog-center">
							<form className="d-flex flex-wrap dialog-center" onSubmit={onSubmit}>
								<div className="d-flex group-text">
									{Object.keys(code).map(name =>
										<Material.TextField
											required 
											key={`code-${name}`} 
											type="number" 
											name={name} 
											maxLength={1} 
											onChange={e => setCode({ ...code, [e.target.name]: e.target.value })}
										/>
									)}
								</div>
								<Button 
									onClick={vrf_response} 
									variant="link" 
									text={counter > 0 ? `Güvenlik kodunu girmek için kalan süreniz ${counter} veya tekrar gönder.` 
									: `Güvenlik kodunu tekrar gönder.`} 
								/>
								{!getStepTwo.isLoading ? 
									<Button 
										type="submit"
										text={`İleri`} 
										className="blue" 
									/> : 
									<Button 
										className="blue" 
										onClick={() => console.log("Lütfen Bekleyiniz...")} 
										text={`Lütfen Bekleyiniz...`} 
									/>
								}
							</form>
						</div>
					</DialogContent>
				</Dialog>
			</React.Fragment>
		</>
	);
};

export default StepTwo;