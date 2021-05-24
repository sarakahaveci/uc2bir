import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
          <InputLabel>Sınıfları Seçiniz</InputLabel>

          <Select
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
          <InputLabel>Branşları Seçiniz</InputLabel>

          <Select
            multiple
            value={branchSelection}
            input={<Input />}
            onChange={(e) => setBranchSelection(e.target.value)}
          >
            {myBranches.map((branch) => (
              <MenuItem key={branch.id} value={branch}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {userTypeId !== WORK_PLACE && (
        <FormControl>
          <InputLabel>Oturum Türlerini Seçiniz</InputLabel>

          <Select
            multiple
            value={sessionSelection}
            input={<Input />}
            onChange={(e) => setSessionSelection(e.target.value)}
          >
            {sessionTypes?.data?.data?.map((sessionType) => (
              <MenuItem key={sessionType.id} value={sessionType}>
                {sessionType.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {showSessionDependentInputs('clinic') && (
        <FormControl>
          <InputLabel>Klinik Seçiniz</InputLabel>

          <Select
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
          <InputLabel>Ev / Park Seçiniz</InputLabel>

          <Select
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
