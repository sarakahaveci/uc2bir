import React from 'react';

import RegisterFileUpload from './RegisterFileUpload';
import { HEALTH_REPORT } from '../../../constants';

const HealthReportStep = () => {
  return (
    <>
      <RegisterFileUpload
        fileTypeId={HEALTH_REPORT}
        title="İlgili kurumlardan aldığınız sağlık raporunuzu ekleyin."
        showPassButton
      >
        <div className="health-report">
          Sağlık raporunuzu 30 gün içerisinde sistemimize yüklemeniz
          gerekmektedir.
        </div>
      </RegisterFileUpload>
    </>
  );
};

export default HealthReportStep;
