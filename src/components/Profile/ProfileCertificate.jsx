import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Certificate } from 'components';
import { getUserCertificate } from 'actions';

export default function ProfileCertificate({ userId }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { certificate } = useSelector((state) => state.userProfile.certificate);

  useEffect(() => {
    dispatch(getUserCertificate(userId));
  }, []);

  return certificate.length > 0 ? (
    certificate?.map((data, index) => (
      <Certificate
        key={index}
        fileText={data.name}
        isOdd={(index + 1) % 2}
        path={data?.path}
      />
    ))
  ) : (
    <div className="d-flex">
      <strong className="mx-auto">
        {t('There is no certificate registered to the Workplace')}
      </strong>
    </div>
  );
}
