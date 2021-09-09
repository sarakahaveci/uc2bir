import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from './RegisterFileUpload';
import { HEALTH_REPORT } from '../../../constants';

const HealthReportStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <RegisterFileUpload
        fileTypeId={HEALTH_REPORT}
        title="İlgili kurumlardan aldığınız sağlık raporunuzu ekleyin."
      >
        <div className="health-report">
          {t('You must upload your health report to our system within 30 days')}
        </div>
      </RegisterFileUpload>
    </>
  );
};

export default HealthReportStep;
