/* eslint-disable default-case */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileForms from './tabs/CompanyForms';

const CompanyInf = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [type, setType] = useState();
  const type_id = user.type_id;

  useEffect(() => {
    if (isAuthenticated) {
      switch (type_id) {
        case 1:
          return setType('USER');

        case 2:
          return setType('PERSONAL_TRAINER');

        case 3:
          return setType('WORK_PLACE');

        case 4:
          return setType('DIETITIAN');
      }
    }
  }, [isAuthenticated]);
  return <ProfileForms type={type} />;
};

export default CompanyInf;
