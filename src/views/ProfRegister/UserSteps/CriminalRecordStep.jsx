/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from './RegisterFileUpload';
import Svg from 'components/statics/svg';
import { CRIMINAL_RECORD } from '../../../constants';

const CriminalRecordStep = () => {
  const { t } = useTranslation();

  return (
    <div className="step-six">
      <RegisterFileUpload
        title="E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin. 
        Aşağıdaki linkten e-devlete ulaşabilirsiniz."
        fileTypeId={CRIMINAL_RECORD}
      >
        <div className="step-six__criminal-record">
          <Svg.InfoIcon />
          {t(
            'Add your criminal record, which you can get via e-government. You can reach e-government from the link below'
          )}
        </div>

        <a
          href="https://www.turkiye.gov.tr/adli-sicil-kaydi"
          target="_blank"
          className="step-six__criminal-record-link"
        >
          {t('Click to login to e-government')}
        </a>
      </RegisterFileUpload>
    </div>
  );
};

export default CriminalRecordStep;
