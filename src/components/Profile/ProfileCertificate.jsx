import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Certificate } from 'components';
import { getUserCertificate } from 'actions';

export default function ProfileCertificate() {
  const dispatch = useDispatch();
  const { certificate } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserCertificate());
  }, []);

  return certificate.map((data, index) => (
    <Certificate
      key={index}
      fileText={data.name}
      isOdd={(index + 1) % 2}
      path={data?.path}
    />
  ));
}
