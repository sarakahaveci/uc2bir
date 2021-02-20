// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { Button, MacroMap, Material, AwesomeIcon } from '../../../components';

import { stepThree as macro } from '../../../macros/registerMacros';
import { useSelector, useDispatch } from 'react-redux';
import { setStepThree } from '../../../actions';

import axios from 'axios';

const StepThree = (props) => {
	const { setSteps } = props;
	const dispatch = useDispatch();

	const getStepThree = useSelector((state) => state.stepThree);

	const [data, setData] = useState({ ...macro.inputs });
	const [city, setCity] = useState(false);
	const [town, setTown] = useState([]);
	const [district, setDistrict] = useState([]);

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
				<div className="d-flex w-100 flex-wrap">
					<MacroMap macro={macro.macro} data={data} setData={setData} />
					{city && (
						<>
							<Material.SimpleSelect
								required
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
								required
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
								required
								label={district ? 'Önce İlçe Seçiniz' : 'Mahalle Seçiniz'}
								items={district ? district : []}
								name="district"
								onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
							/>
							<Material.TextField
								required
								label="Açık Adres"
								name="address_detail"
								icon={AwesomeIcon.Map}
								onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
							/>
							<div className="d-flex w-100 justify-content-between">
								<div className="col-5 p-0">
									<Material.TextField
										required
										label="Bina"
										name="build_no"
										onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
									/>
								</div>
								<div className="col-5 p-0">
									<Material.TextField
										required
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

export default StepThree;