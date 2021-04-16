import React, { useEffect } from 'react';
import { getSessionTypes } from 'actions';
//import { useSelector, useDispatch } from 'react-redux';
import { getGeocode } from 'use-places-autocomplete';

const PT = () => {
  //const dispatch = useDispatch();
  //const [page, setPage] = useState('Home');

  useEffect(() => {
    getGeocode();
  }, []);

  useEffect(() => {
    dispatch(getSessionTypes());
  }, []);

  switch ('Home') {
    case 'Home':
      return <></>;

    case 'Adds':
      return <div></div>;

    default:
      return <></>;
  }
};

export default PT;
