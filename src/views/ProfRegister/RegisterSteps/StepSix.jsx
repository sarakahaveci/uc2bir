import React from 'react';

import FileUpload from './FileUpload';
import Svg from 'components/statics/svg';

const StepSix = () => {
  return (
    <div className="step-six">
      <FileUpload
        title="E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin. 
        Aşağıdaki linkten e-devlete ulaşabilirsiniz."
        fileTypeName="Adli Sicil Kaydı"
      >
        <div className="step-six__criminal-record">
          <Svg.InfoIcon />
          E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin.
          Aşağıdaki linkten e-devlete ulaşabilirsiniz.
        </div>

        <a href="/" target="_blank" className="step-six__criminal-record-link">
          E-devlet’e giriş yapmak için tıklayınız
        </a>
      </FileUpload>
    </div>
  );
};

export default StepSix;
