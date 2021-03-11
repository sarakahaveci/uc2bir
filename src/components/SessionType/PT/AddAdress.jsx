// @ts-nocheck
/* eslint-disable react/jsx-pascal-case */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { getGeocode } from 'use-places-autocomplete';

import {
  getCitiesAndDistict,
  getAdressIds,
  getProfileInformation,
  updateUserAdress,
} from 'actions';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { Material, Button, AwesomeIcon } from 'components';
import axios from 'axios';

const AddAdress = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [adressFromMap, setAdressFromMap] = useState({});
  const [location, setLocation] = useState({});

  const [data, setData] = useState({});
	const [city, setCity] = useState(false);
	const [town, setTown] = useState([]);
	const [district, setDistrict] = useState([]);
  const uri = `${process.env.REACT_APP_API_URL}/regions`;

  useEffect(() => {
		if (!city) {
			axios.post(uri)
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

  const onPositionChange = (data) => {
    setAdressFromMap(data);
  };

  const updateAddressSuccess = () => {
    toast.success('Haritadan adres eklenirken bir sorun ile karışlaşıldı', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const isFailGetIds = () => {
    toast.error('Haritadan adres eklenirken bir sorun ile karışlaşıldı', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const useAdressFromMap = () => {
    dispatch(
      getAdressIds(
        {
          city: adressFromMap.city,
          district: adressFromMap.district,
          town: adressFromMap.town,
        },
        () => {},
        () => isFailGetIds()
      )
    );
    return false;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleSelectRelion = (event) => {
    if (event.target.name === 'city') {
      setFormData({
        ...formData,
        city: event.target.value,
        district: null,
        town: null,
      });
    } else {
      setFormData({
        ...formData,
        town: null,
        [event.target.name]: event.target.value,
      });
    }
    dispatch(getCitiesAndDistict({ [event.target.name]: event.target.value }));
  };

  return (
    <div className="row w-100">
      <div className="col-12">
        <form
          style={{ padding: "0 45px", marginBottom: 15 }}
          onSubmit={onSubmit}
          autoComplete="off"
        >
          {city && (
						<>
							<Material.SimpleSelect
								required
								label="İl Seçiniz"
								items={city}
								name="city"
								onChange={(e) => {
									axios.post(uri, { city_id: e.target.value })
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
									axios.post(uri, { district_id: e.target.value })
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
          <div className="d-flex w-100">
            <Button
              type="submit"
              text="Adres Ekle"
              className="blue marginTop mx-auto  w-75"
              fontWeight="bold"
            />
          </div>
        </form>
      </div>
      <div className="col-12">
        <GoogleMap
          onPositionChange={onPositionChange}
          draggable
          locationFromUser={!isEmpty(location) ? location : false}
        />
        <div className="d-flex w-100">
          <Button
            fontWeight="bold"
            className="blue mx-auto mt-2 w-75"
            text="Haritadaki adresi listeye aktar"
            disabled={isEmpty(adressFromMap)}
            onClick={useAdressFromMap}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAdress;
