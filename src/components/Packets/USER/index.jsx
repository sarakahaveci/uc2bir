import React, { useEffect, useState } from 'react';
import { createTypes, getSessionTypes, getUserMyPacket } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getGeocode } from 'use-places-autocomplete';

import Home from './Home';
import DetailLesson from './DetailLesson';
import Exercises from './Exercises';
import ExerciseDetail from './ExerciseDetail';
import PacketReservation from './PacketReservation';

const User = ({ icons, setBannerActive }) => {
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
    dispatch(getUserMyPacket());
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
      return (
        <Home
          icons={icons}
          select={select}
          selected={selected}
          get={get}
          create={create}
          submit={submit}
          setPage={setPage}
        />
      );

    case 'DetailLesson':
      return (
        <div>
          <DetailLesson
            setPage={setPage}
            icons={icons}
            setBannerActive={setBannerActive}
          />
        </div>
      );
    case 'Exercises':
      return (
        <div>
          <Exercises
            setPage={setPage}
            icons={icons}
            setBannerActive={setBannerActive}
          />
        </div>
      );
    case 'ExerciseDetail':
      return (
        <div>
          <ExerciseDetail
            setPage={setPage}
            icons={icons}
            setBannerActive={setBannerActive}
          />
        </div>
      );
    case 'PacketReservation':
      return (
        <div>
          <PacketReservation
            setPage={setPage}
            setBannerActive={setBannerActive}
          />
        </div>
      );
    default:
      return <></>;
  }
};

export default User;
