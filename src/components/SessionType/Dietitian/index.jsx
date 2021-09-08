import React, { useEffect, useState } from 'react';
import { createTypes, getSessionTypes } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getGeocode } from 'use-places-autocomplete';
import { useTranslation } from 'react-i18next';

import Home from './Home';
import Adds from './Adds';

const PT = ({ icons, setBannerActive }) => {
  const { t } = useTranslation();

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
    if (get?.data?.data?.length > 0) {
      get?.data?.data?.forEach((item) => {
        if (item?.status == 'active') {
          if (!selected?.includes(item?.type)) {
            var temp = selected;
            temp.push(item.type);
            setSelected(temp);
          }
        }
      });
    }
  }, [get]);
  const select = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter((item) => item !== key));
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
          dispatch(
            getSessionTypes(() => {
              setPage('Adds');
            })
          );
        },
        () =>
          toast.error(t('There was a problem, please try again later'), {
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
            icons={icons}
            setBannerActive={setBannerActive}
            setPage={setPage}
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
