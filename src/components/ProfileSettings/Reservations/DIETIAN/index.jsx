import React, { useEffect, useState } from 'react';
import { createTypes, getSessionTypes } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getGeocode } from 'use-places-autocomplete';

const DIETIAN = ({ icons, setBannerActive }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState('Home');

  useEffect(() => {
    getGeocode();
  }, []);

  const { create } = useSelector((state) => state.profileSettings2.sessionType);
  const { get } = useSelector((state) => state.profileSettings2.sessionType);

  useEffect(() => {
    dispatch(getSessionTypes());
  }, []);

  const select = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter((item) => item !== key));
    } else {
      setSelected((selecteds) => [...selecteds, key]);
      setTypes([...types, key]);
    }
  };

  const submit = async () => {
    const new_types = [...types];
    if (get?.data?.data?.length > 0) {
      get.data.data.map((val) => new_types.push(val.type));
    }
    await dispatch(
      createTypes(
        { types: new_types },
        () => setPage('Adds'),
        () =>
          toast.error('Bir sorun oluştu lütfen daha sonra tekrar deneyiniz.', {
            position: 'bottom-right',
            autoClose: 2000,
          })
      )
    );
  };
  switch (page) {
    case 'Home':
      return <></>;

    case 'EditLesson':
      return <></>;
    case 'Exercises':
      return <></>;
    case 'ExerciseDetail':
      return <></>;

    default:
      return <></>;
  }
};

export default DIETIAN;
