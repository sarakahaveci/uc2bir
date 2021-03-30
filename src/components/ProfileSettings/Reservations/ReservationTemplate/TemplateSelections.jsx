import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { getMyBranches, getGymList, getSessionTypes } from 'actions';

export default function TemplateSelections({
  branchSelection,
  setBranchSelection,
  sessionSelection,
  setSessionSelection,
  workPlaceSelection,
  setWorkPlaceSelection,
  locationSelection,
  setLocationSelection,
}) {
  const { data: myBranches } = useSelector(
    (state) => state.profileSettings2.profileBranches.myBranches
  );

  const { data: sessionTypes } = useSelector(
    (state) => state.profileSettings2.sessionType.get.data
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBranches());
    dispatch(getGymList());
    dispatch(getSessionTypes());
  }, []);

  return (
    <FormControlWrapper>
      <FormControl>
        <InputLabel>Branşları Seçiniz</InputLabel>

        <Select
          multiple
          value={branchSelection}
          input={<Input />}
          onChange={(e) => setBranchSelection(e.target.value)}
          style={{ width: '100%' }}
        >
          {myBranches.map((branch) => (
            <MenuItem key={branch.id} value={branch}>
              {branch.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Oturum Türlerini Seçiniz</InputLabel>

        <Select
          multiple
          value={sessionSelection}
          input={<Input />}
          style={{ width: '100%' }}
          onChange={(e) => setSessionSelection(e.target.value)}
        >
          {sessionTypes?.map((sessionType) => (
            <MenuItem key={sessionType.id} value={sessionType}>
              {sessionType.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Spor Alanı Seçiniz</InputLabel>

        <Select
          multiple
          value={workPlaceSelection}
          input={<Input />}
          style={{ width: '100%' }}
          onChange={(e) => setWorkPlaceSelection(e.target.value)}
        >
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Ev / Park Seçiniz</InputLabel>

        <Select
          multiple
          value={locationSelection}
          input={<Input />}
          style={{ width: '100%' }}
          onChange={(e) => setLocationSelection(e.target.value)}
        >
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
        </Select>
      </FormControl>
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
