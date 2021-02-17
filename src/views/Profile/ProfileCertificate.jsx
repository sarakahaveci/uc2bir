import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Certificate } from 'components';
import { getUserCertificate } from 'actions';

export default function ProfileCertificate({ userId }) {
  const dispatch = useDispatch();
  const { certificate } = useSelector((state) => state.profile);

  const successHandler = () => {};
  const failHandler = () => {};

  useEffect(() => {
    dispatch(getUserCertificate(userId, successHandler, failHandler));
  }, []);

  return certificate.map((data, index) => (
    <Certificate fileText={data.name} isOdd={(index + 1) % 2} />
  ));
}
