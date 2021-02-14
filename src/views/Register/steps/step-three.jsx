// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Button, MacroMap, Material, AwesomeIcon, IconLabel } from '../../../components';

import { stepThree as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepThree } from '../../../actions';

import Map from "../../../components/google-maps/MapWidthSearchBox";

import axios from 'axios';
import { geolocated } from "react-geolocated";

const StepThree = (props) => {
	const { setSteps } = props;
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const fullWidth = true;
	const maxWidth = 'md';
	const handleClose = () => setOpen(false);
	const handleClickOpen = () => setOpen(true);

	const getStepThree = useSelector((state) => state.stepThree);

	const [data, setData] = useState({ ...macro.inputs });
	const [city, setCity] = useState(false);
	const [town, setTown] = useState([]);
	const [district, setDistrict] = useState([]);
	const [googleLocation, setGoogleLocation] = useState(false);

	useEffect(() => {
		if (!city) {
			axios.post(macro.uri)
				.then((res) => res.data)
				.then((data) => data.data)
				.then((data) => {
					const new_data = data.map((val) => {
						return {
							id: val.id,
							val: val.id,
							name: val.name
						}
					});
					return setCity(new_data);
				})
				.catch((err) => toast.error(err, {
					position: 'bottom-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}));
		}
	}, [city]);

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
			<React.Fragment>
				<Dialog
					className="material-dialog"
					fullWidth={fullWidth}
					maxWidth={maxWidth}
					open={open}
					onClose={handleClose}>
					<DialogTitle className="text-center">Haritadan Seçin!</DialogTitle>
					<DialogContent>
						<Map 
							google={props.google}
							center={{lat: props.coords?.latitude, lng: props.coords?.longitude}}
							height='350px'
							zoom={15}
							setGoogleLocation={setGoogleLocation}
							modalClose={handleClose}
						/>
					</DialogContent>
				</Dialog>
			</React.Fragment>
			{console.log(googleLocation)}
			<form onSubmit={onSubmit} autoComplete="off">
				<div className="d-flex w-100 flex-wrap">
					<MacroMap macro={macro.macro} data={data} setData={setData} />
					{props.coords?.latitude && props.coords?.longitude &&
					<IconLabel
						icon={AwesomeIcon.Map}
						text="Haritadan Ekle"
						onClick={handleClickOpen}
					/>}
					{city && (
						<>
							<Material.SimpleSelect
								label="İl Seçiniz"
								items={city}
								name="city"
								onChange={(e) => {
									axios.post(macro.uri, { city_id: e.target.value })
										.then((res) => res.data)
										.then((data) => data.data)
										.then((data) => {
											const new_data = data.map((val) => {
												return {
													id: val.id,
													val: val.id,
													name: val.name
												}
											});
											return setTown(new_data);
										})
									return setData({ ...data, [e.target.name]: e.target.value });
								}}
							/>
							<Material.SimpleSelect
								label={town ? 'Önce İl Seçiniz' : 'İlçe Seçiniz'}
								items={town ? town : []}
								name="town"
								onChange={(e) => {
									axios.post(macro.uri, { district_id: e.target.value })
										.then((res) => res.data)
										.then((data) => data.data)
										.then((data) => {
											const new_data = data.map((val) => {
												return {
													id: val.id,
													val: val.id,
													name: val.name
												}
											});
											return setDistrict(new_data);
										})
									return setData({ ...data, [e.target.name]: e.target.value });
								}}
							/>
							<Material.SimpleSelect
								label={district ? 'Önce İlçe Seçiniz' : 'Mahalle Seçiniz'}
								items={district ? district : []}
								name="district"
								onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
							/>
							<Material.TextField
								label="Açık Adres"
								name="address_detail"
								icon={AwesomeIcon.Map}
								onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
							/>
							<div className="d-flex w-100 justify-content-between">
								<div className="col-5 p-0">
									<Material.TextField
										label="Bina"
										name="build_no"
										onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
									/>
								</div>
								<div className="col-5 p-0">
									<Material.TextField
										label="Daire"
										name="apt_no"
										onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
									/>
								</div>
							</div>
						</>
					)}
				</div>
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

export default geolocated({
	positionOptions: {
			enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(StepThree);