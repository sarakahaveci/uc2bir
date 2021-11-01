import React from 'react';

import StepOne from './UserSteps/StepOne';
import StepThree from './UserSteps/StepThree';
import CertificateStep from './UserSteps/CertificateStep';
import CvStep from './UserSteps/CvStep';

import CriminalRecordStep from './UserSteps/CriminalRecordStep';
import IdentityCardStep from './UserSteps/IdentityCardStep';
import HealthReportStep from './UserSteps/HealthReportStep';
import FacePictureStep from './UserSteps/FacePictureStep';
import DegreeStep from './UserSteps/DegreeStep';
import WorkPlaceContractStep from './WorkPlaceSteps/WorkPlaceContractStep';
import WorkPlaceTaxPlateStep from './WorkPlaceSteps/WorkPlaceTaxPlateStep';

import WorkPlaceLicenseStep from './WorkPlaceSteps/WorkPlaceLicenseStep';
// import WorkPlaceHirePlaceStep from './WorkPlaceSteps/WorkPlaceHirePlaceStep';
import { WORK_PLACE, DIETITIAN } from '../../constants';

const setPageByStepNumber = {
  // 7 Steps + 1 Finish = 8
  workPlace: {
    4: <StepThree />,
    5: <WorkPlaceContractStep />,
    6: <WorkPlaceLicenseStep />,
    7: <WorkPlaceTaxPlateStep />
  },
  //  9 Steps + 1 Finish = 10
  dietitian: {
    4: <StepThree />,
    5: <CertificateStep />,
    6: <DegreeStep />,
    7: <CriminalRecordStep />,
    8: <IdentityCardStep />,
    9: <FacePictureStep />,
    10: <FacePictureStep />,
  },
  // 10 Steps + 1 Finish = 11
  personalTrainer: {
    4: <StepThree />,
    5: <CertificateStep />,
    6: <CvStep />,
    7: <DegreeStep />,
    8: <CriminalRecordStep />,
    9: <IdentityCardStep />,
    10: <HealthReportStep />,
    11: <FacePictureStep />,
    12: <FacePictureStep />,
  },
};

const RegisterPage = ({ stepNumber, setUserTypeId, userTypeId }) => {
  let page;

  if (stepNumber === 1 || stepNumber === 2) {
    return (page = (
      <StepOne setUserTypeId={setUserTypeId} userTypeId={userTypeId} />
    ));
  }

  if (stepNumber === 3) {
    return (page = <StepThree />);
  }

  if (userTypeId === WORK_PLACE) {
    page = setPageByStepNumber['workPlace'][stepNumber];
  } else if (userTypeId === DIETITIAN) {
    page = setPageByStepNumber['dietitian'][stepNumber];
  } else {
    page = setPageByStepNumber['personalTrainer'][stepNumber];
  }

  return <> {page} </>;
};

export default React.memo(RegisterPage);
