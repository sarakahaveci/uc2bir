/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { addAddress } from 'actions';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { Material, Button, AwesomeIcon } from 'components';
import axios from 'axios';

const AddAdress = ({ setSubPage }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [adressFromMap, setAdressFromMap] = useState({});

  const [city, setCity] = useState(false);
  const [town, setTown] = useState([]);
  const [district, setDistrict] = useState([]);
  const uri = `${process.env.REACT_APP_API_URL}/regions`;
  const uri_map = `${process.env.REACT_APP_API_URL}/regions-map`;

  useEffect(() => {
    if (!city) {
      axios
        .post(uri)
        .then((res) => res.data)
        .then((data) => data.data)
        .then((data) => {
          const new_data = data.map((val) => {
            return {
              id: val.id,
              val: val.id,
              name: val.name,
            };
          });
          return setCity(new_data);
        })
        .catch((err) =>
          toast.error(err, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  }, [city]);

  const onPositionChange = (data) => {
    setAdressFromMap(data);
  };

  const useAdressFromMap = () => {
    axios
      .post(uri_map, {
        city: adressFromMap.city,
        district: adressFromMap.district,
        town: adressFromMap.town,
      })
      .then((res) => res.data)
      .then((data) => data.data)
      .then((data) => {
        const city_id = data.city.id;
        const district_id = data.district.id;
        axios
          .post(uri, { city_id })
          .then((res) => res.data)
          .then((data) => data.data)
          .then((data) => {
            const new_data = data.map((val) => {
              return {
                id: val.id,
                val: val.id,
                name: val.name,
              };
            });
            setTown(new_data);
          });
        axios
          .post(uri, { district_id })
          .then((res) => res.data)
          .then((data) => data.data)
          .then((data) => {
            const new_data = data.map((val) => {
              return {
                id: val.id,
                val: val.id,
                name: val.name,
              };
            });
            setDistrict(new_data);
          });
        setFormData({
          ...formData,
          city: data.city.id,
          district: data.district.id,
          town: data.town.id,
          address_detail: adressFromMap.address_detail,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: 'bottom-right',
          autoClose: 3000,
        })
      );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addAddress(
        { ...formData },
        () => {
          setSubPage('Adds');
          toast.success('Adres başarıyla eklendi', {
            position: 'bottom-right',
            autoClose: 3000,
          });
        },
        () =>
          toast.error('Adres eklenirken hata oluştu', {
            position: 'bottom-right',
            autoClose: 3000,
          })
      )
    );
  };

  return (
    <div className="row w-100">
      <Button text="< Geri" onClick={() => setSubPage('Adds')} />
      <div className="col-12">
        <form
          style={{ marginBottom: 15 }}
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <Material.TextField
            required
            label="Adres Başlığı giriniz"
            type="text"
            name="title"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          {city && (
            <>
              <Material.SimpleSelect
                required
                label="İl Seçiniz"
                items={city}
                name="city"
                changeValue={formData?.city || ''}
                onChange={(e) => {
                  axios
                    .post(uri, { city_id: e.target.value })
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => {
                      const new_data = data.map((val) => {
                        return {
                          id: val.id,
                          val: val.id,
                          name: val.name,
                        };
                      });
                      return setTown(new_data);
                    });
                  return setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Material.SimpleSelect
                required
                label={town ? 'Önce İl Seçiniz' : 'İlçe Seçiniz'}
                items={town ? town : []}
                name="district"
                changeValue={formData?.district || ''}
                onChange={(e) => {
                  axios
                    .post(uri, { district_id: e.target.value })
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => {
                      const new_data = data.map((val) => {
                        return {
                          id: val.id,
                          val: val.id,
                          name: val.name,
                        };
                      });
                      return setDistrict(new_data);
                    });
                  return setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Material.SimpleSelect
                required
                label={district ? 'Önce İlçe Seçiniz' : 'Mahalle Seçiniz'}
                items={district ? district : []}
                name="town"
                changeValue={formData?.town || ''}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <Material.TextField
                required
                label="Açık Adres"
                name="address_detail"
                icon={AwesomeIcon.Map}
                changeValue={formData.address_detail}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <div className="d-flex w-100 justify-content-between">
                <div className="col-5 p-0">
                  <Material.TextField
                    required
                    label="Bina"
                    name="build_no"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    inputProps={{ maxLength: 5 }}
                  />
                </div>
                <div className="col-5 p-0">
                  <Material.TextField
                    required
                    label="Daire"
                    name="apt_no"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    inputProps={{ maxLength: 5 }}
                  />
                </div>
              </div>
            </>
          )}
          <div className="d-flex w-100">
            <Button
              type="submit"
              text="Adres Ekle"
              className="blue marginTop mx-auto w-75"
              fontWeight="bold"
            />
          </div>
        </form>
      </div>
      <div className="col-12">
        <GoogleMap
          onPositionChange={onPositionChange}
          draggable
          showSearchBox
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
