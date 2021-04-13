import React, { useEffect } from 'react';
import { getSessionTypes } from 'actions';
import { useDispatch } from 'react-redux';

import { getGeocode } from 'use-places-autocomplete';

const DIETIAN = () => {
  const dispatch = useDispatch();

  //const [page, setPage] = useState('Home');

  useEffect(() => {
    getGeocode();
  }, []);

  useEffect(() => {
    dispatch(getSessionTypes());
  }, []);

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
