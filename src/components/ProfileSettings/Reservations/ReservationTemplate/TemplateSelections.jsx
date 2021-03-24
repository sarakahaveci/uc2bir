import React from 'react';
import styled from 'styled-components/macro';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default function TemplateSelections({ selectionData }) {
  return (
    <FormControlWrapper>
      <FormControl>
        <InputLabel>Branşları Seçiniz</InputLabel>

        <Select
          multiple
          value={selectionData}
          input={<Input />}
          style={{ width: '100%' }}
          name="branch"
        >
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          {/* {subBranches.map((branch) => (
          <MenuItem key={branch.id} value={branch.id}>
            {branch.name}
          </MenuItem>
        ))} */}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Oturum Türlerini Seçiniz</InputLabel>

        <Select
          name=""
          multiple
          value={selectionData}
          input={<Input />}
          style={{ width: '100%' }}
        >
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          {/* {subBranches.map((branch) => (
          <MenuItem key={branch.id} value={branch.id}>
            {branch.name}
          </MenuItem>
        ))} */}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Spor Alanları Ekleyin</InputLabel>

        <Select
          name="workplaces"
          multiple
          value={selectionData}
          input={<Input />}
          style={{ width: '100%' }}
        >
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          {/* {subBranches.map((branch) => (
          <MenuItem key={branch.id} value={branch.id}>
            {branch.name}
          </MenuItem>
        ))} */}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Ev / Park Ekleyin</InputLabel>

        <Select
          name="parks"
          multiple
          value={selectionData}
          input={<Input />}
          style={{ width: '100%' }}
        >
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          <MenuItem>deneme</MenuItem>
          {/* {subBranches.map((branch) => (
          <MenuItem key={branch.id} value={branch.id}>
            {branch.name}
          </MenuItem>
        ))} */}
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
