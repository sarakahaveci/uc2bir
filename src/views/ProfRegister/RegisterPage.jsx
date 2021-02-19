import React from 'react';

import StepOne from './UserSteps/StepOne';
import StepThree from './UserSteps/StepThree';
import CertificateStep from './UserSteps/CertificateStep';
import CriminalRecordStep from './UserSteps/CriminalRecordStep';
import IdentityCardStep from './UserSteps/IdentityCardStep';
import HealthReportStep from './UserSteps/HealthReportStep';
import FacePictureStep from './UserSteps/FacePictureStep';
import DegreeStep from './UserSteps/DegreeStep';
import WorkPlaceCriminalRecordStep from './WorkPlaceSteps/WorkPlaceCriminalRecordStep';
import WorkPlaceContractStep from './WorkPlaceSteps/WorkPlaceContractStep';
import WorkPlaceLicenseStep from './WorkPlaceSteps/WorkPlaceLicenseStep';
import WorkPlaceHirePlaceStep from './WorkPlaceSteps/WorkPlaceHirePlaceStep';
import { WORK_PLACE, DIETITIAN } from '../../constants';

const RegisterPage = ({ stepNumber, setUserTypeId, userTypeId }) => {
  let page;

  if (stepNumber === 1 || stepNumber === 2) {
    page = <StepOne setUserTypeId={setUserTypeId} userTypeId={userTypeId} />;
  }

  if (stepNumber === 3) {
    page = <StepThree />;
  }

  if (userTypeId === WORK_PLACE) {
    if (stepNumber === 4 ||stepNumber === 5  ) {
      page = <StepThree />;
    }
    
    if (stepNumber === 6) {
      page = <WorkPlaceCriminalRecordStep />;
    }

    if (stepNumber === 7) {
      page = <WorkPlaceContractStep />;
    }

    if (stepNumber === 8) {
      page = <WorkPlaceLicenseStep />;
    }

    if (stepNumber === 9 || stepNumber === 10) {
      page = <WorkPlaceHirePlaceStep />;
    }
  } else if (userTypeId === DIETITIAN) {
  

    if (stepNumber === 4) {
      page = <CertificateStep />;
    }

    if (stepNumber === 5) {
      page = <DegreeStep />;
    }

    if (stepNumber === 6) {
      page = <CriminalRecordStep />;
    }

    if (stepNumber ===7) {
      page = <IdentityCardStep />;
    }

    if (stepNumber === 8 || stepNumber === 9) {
      page = <FacePictureStep />;
    }
  } else {
    if (stepNumber === 4) {
      page = <StepThree />;
    }

    if (stepNumber === 5) {
      page = <CertificateStep />;
    }

    if (stepNumber === 6) {
      page = <CriminalRecordStep />;
    }

    if (stepNumber === 7) {
      page = <IdentityCardStep />;
    }

    if (stepNumber === 8) {
      page = <HealthReportStep />;
    }

    if (stepNumber === 9 || stepNumber === 10) {
      page = <FacePictureStep />;
    }
  }

  return <> {page} </>;
};

export default React.memo(RegisterPage);
