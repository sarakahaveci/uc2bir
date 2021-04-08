// @ts-nocheck
import React, { useEffect } from 'react';
import Lessons from '../../Lessons';
const EditLesson = ({ setBannerActive }) => {
  useEffect(() => {
    setBannerActive(false);
  }, []);
  return (
    <>
      <Lessons />
    </>
  );
};

export default EditLesson;
