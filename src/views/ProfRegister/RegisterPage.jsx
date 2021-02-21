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

const setPageByStepNumber = {
  // 8 Steps + 1 Finish = 9
  workPlace: {
    4: <StepThree />,
    5: <WorkPlaceCriminalRecordStep />,
    6: <WorkPlaceContractStep />,
    7: <WorkPlaceLicenseStep />,
    8: <WorkPlaceHirePlaceStep />,
    9: <WorkPlaceHirePlaceStep />,
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
    6: <DegreeStep />,
    7: <CriminalRecordStep />,
    8: <IdentityCardStep />,
    9: <HealthReportStep />,
    10: <FacePictureStep />,
    11: <FacePictureStep />,
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
