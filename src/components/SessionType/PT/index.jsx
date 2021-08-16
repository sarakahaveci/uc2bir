import React, { useEffect, useState } from 'react';
import { createTypes, getSessionTypes } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getGeocode } from 'use-places-autocomplete';

import Home from './Home';
import Adds from './Adds';

const PT = ({ icons, setBannerActive }) => {
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
  useEffect(() => {
    if (get?.data?.data?.length > 0) {
      setPage('Adds');
    }
    if(get?.data?.data?.length > 0) {
      get?.data?.data?.forEach(item => {
        if (item?.status == "active") {
          if (!selected?.includes(item?.type)) {
            var temp = selected;
            temp.push(item.type)
            setSelected(temp)
          }
        }
      });
    
    }
  }, [get]);
  const select = (key) => {
    if (selected.includes(key)) {
      var filtered = selected.filter((item) => item !== key);
      setSelected(filtered);
      setTypes([...filtered]);
    } else {
      setSelected((selecteds) => [...selecteds, key]);
      setTypes([...types, key]);
    }
  };

  const submit = async () => {
    await dispatch(
      createTypes(
        { types: selected },
        () => {
          dispatch(getSessionTypes());
          setPage('Adds');
        },
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
        />
      );

    case 'Adds':
      return (
        <div>
          <Adds
            setPage={setPage}
            icons={icons}
            setBannerActive={setBannerActive}
            get={get}
            selected={selected}
          />
        </div>
      );

    default:
      return <></>;
  }
};

export default PT;
