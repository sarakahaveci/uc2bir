import React from 'react';

import FileUpload from './FileUpload';
import { HEALTH_REPORT } from '../../../constants';

const HealthReportStep = () => {
  return (
    <>
      <FileUpload
        fileTypeId={HEALTH_REPORT}
        title="İlgili kurumlardan aldığınız sağlık raporunuzu ekleyin."
        showPassButton
      >
        <div className="health-report">
          Sağlık raporunuzu 30 gün içerisinde sistemimize yüklemeniz
          gerekmektedir.
        </div>
      </FileUpload>
    </>
  );
};

export default HealthReportStep;
