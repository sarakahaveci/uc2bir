/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

import RegisterFileUpload from './RegisterFileUpload';
import Svg from 'components/statics/svg';
import { CRIMINAL_RECORD } from '../../../constants';

const CriminalRecordStep = () => {
  return (
    <div className="step-six">
      <RegisterFileUpload
        title="E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin. 
        Aşağıdaki linkten e-devlete ulaşabilirsiniz."
        fileTypeId={CRIMINAL_RECORD}
      >
        <div className="step-six__criminal-record">
          <Svg.InfoIcon />
          E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin.
          Aşağıdaki linkten e-devlete ulaşabilirsiniz.
        </div>

        <a
          href="https://www.turkiye.gov.tr/adli-sicil-kaydi"
          target="_blank"
          className="step-six__criminal-record-link"
        >
          E-devlet’e giriş yapmak için tıklayınız
        </a>
      </RegisterFileUpload>
    </div>
  );
};

export default CriminalRecordStep;
