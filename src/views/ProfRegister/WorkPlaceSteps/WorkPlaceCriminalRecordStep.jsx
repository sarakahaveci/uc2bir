import React from 'react';

import FileUpload from '../UserSteps/FileUpload';
import Svg from 'components/statics/svg';
import { CRIMINAL_RECORD } from '../../../constants';

const WorkPlaceCriminalRecordStep = () => {
  return (
    <div className="step-six">
      <FileUpload
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
      </FileUpload>
    </div>
  );
};

export default WorkPlaceCriminalRecordStep;
