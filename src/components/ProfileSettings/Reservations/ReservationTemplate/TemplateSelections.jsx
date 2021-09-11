import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';

import {
  getMyBranches,
  getGymList,
  getSessionTypes,
  getPtWorkingHomePlace,
  getDietitianClinics,
  getMyClassifications,
} from 'actions';
import { DIETITIAN, PERSONAL_TRAINER, WORK_PLACE } from 'constants/index';

export default function TemplateSelections({
  enable,
  branchSelection,
  setBranchSelection,
  sessionSelection,
  setSessionSelection,
  workPlaceSelection,
  setWorkPlaceSelection,
  locationSelection,
  setLocationSelection,
  classSelection,
  setClassSelection,
}) {
  const { data: myBranches } = useSelector(
    (state) => state.profileSettings2.profileBranches.myBranches
  );

  const { clinics } = useSelector((state) => state.userProfile.dietitianClinic);

  const {
    get: sessionTypes,
    gymList: { data: gymList },
  } = useSelector((state) => state.profileSettings2.sessionType);

  const {
    ptHomePlace: { data: ptHomePlace },
    classifications: { data: classifications },
  } = useSelector((state) => state.userProfile.workPlace);

  const { type_id: userTypeId } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (userTypeId !== WORK_PLACE) {
      dispatch(getSessionTypes());
    }

    if (userTypeId === DIETITIAN) {
      dispatch(getDietitianClinics());
    }

    if (userTypeId === PERSONAL_TRAINER) {
      dispatch(getMyBranches());

      dispatch(getGymList());

      dispatch(getPtWorkingHomePlace());
    }

    if (userTypeId === WORK_PLACE) {
      dispatch(getMyClassifications());
    }
  }, []);

  const showSessionDependentInputs = (sessionType) =>
    sessionSelection.findIndex((session) => session.type === sessionType) !==
    -1;

  return (
    <FormControlWrapper>
      {userTypeId === WORK_PLACE && (
        <FormControl>
          <InputLabel>{t('Select Classes')}</InputLabel>

          <Select
            disabled={!enable}
            multiple
            value={classSelection}
            input={<Input />}
            onChange={(e) => setClassSelection(e.target.value)}
          >
            {classifications?.map((classification) => (
              <MenuItem key={classification.id} value={classification}>
                {classification.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {userTypeId === PERSONAL_TRAINER && (
        <FormControl>
          <InputLabel>{t('Select Branches')}</InputLabel>

          <Select
            disabled={!enable}
            multiple
            value={branchSelection}
            input={<Input />}
            onChange={(e) => setBranchSelection(e.target.value)}
          >
            {(sessionSelection?.filter((item) => item.type == 'online').length >
              0 &&
              myBranches
                .filter((item) => item.id !== 35)
                .map((branch) => (
                  <MenuItem key={branch.id} value={branch}>
                    {branch.name}
                  </MenuItem>
                ))) ||
              myBranches.map((branch) => (
                <MenuItem key={branch.id} value={branch}>
                  {branch.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      {userTypeId !== WORK_PLACE && (
        <FormControl>
          <InputLabel>{t('Select Session Types')}</InputLabel>

          <Select
            disabled={!enable}
            multiple
            value={sessionSelection}
            input={<Input />}
            onChange={(e) => {
              setSessionSelection(e.target.value);
            }}
          >
            {(branchSelection?.filter((item) => item.id == 35).length > 0 &&
              sessionTypes?.data?.data
                ?.filter((item) => item.type !== 'online')
                .map((sessionType) => (
                  <MenuItem key={sessionType.id} value={sessionType}>
                    {sessionType.title}
                  </MenuItem>
                ))) ||
              sessionTypes?.data?.data?.map((sessionType) => (
                <MenuItem key={sessionType.id} value={sessionType}>
                  {sessionType.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      {showSessionDependentInputs('clinic') && (
        <FormControl>
          <InputLabel>{t('Select Clinic')}</InputLabel>

          <Select
            disabled={!enable}
            multiple
            value={workPlaceSelection}
            input={<Input />}
            onChange={(e) => setWorkPlaceSelection(e.target.value)}
          >
            {clinics?.clinic?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {showSessionDependentInputs('gym') && (
        <FormControl>
          <InputLabel>Spor Alanı Seçiniz</InputLabel>

          <Select
            disabled={!enable}
            multiple
            value={workPlaceSelection}
            input={<Input />}
            onChange={(e) => setWorkPlaceSelection(e.target.value)}
          >
            {gymList?.gym?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {showSessionDependentInputs('home_park') && (
        <FormControl>
          <InputLabel>{t('Select Home/Park')}</InputLabel>

          <Select
            disabled={!enable}
            multiple
            value={locationSelection}
            input={<Input />}
            onChange={(e) => setLocationSelection(e.target.value)}
          >
            {ptHomePlace?.home_park?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </FormControlWrapper>
  );
}

const FormControlWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .MuiFormControl-root {
    margin-bottom: 20px;
  }
`;
