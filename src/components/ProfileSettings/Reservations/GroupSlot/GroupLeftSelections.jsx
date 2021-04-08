import React from 'react';
import styled from 'styled-components/macro';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { Svg, Text, Box } from 'components';
import SelectHoursCell from '../SelectHourCells';

export default function GroupLeftSelections({
  selectedDayHours,
  setSelectedDayHours,
}) {
  return (
    <div>
      <Box row justifyContent="center">
        <UploadPic>
          <Svg.MockImageIcon />

          <Text textAlign="center" color="gray8" fontWeight="300" mt="15px">
            FOTOĞRAF SEÇİNİZ
          </Text>
        </UploadPic>
      </Box>

      <Text color="gray10" fontWeight="600" fontSize="1.1rem" mt="20px">
        Saat Seçiniz
      </Text>

      <SelectHoursCell
        selectedDayHours={selectedDayHours}
        setSelectedDayHours={setSelectedDayHours}
      />

      <FormControl>
        <InputLabel>Branş Seçiniz</InputLabel>

        <Select multiple input={<Input />} style={{ width: '100%' }}></Select>
      </FormControl>

      <Text color="gray10" fontWeight="600" fontSize="1.1rem" mt="20px">
        Ders İçeriği Giriniz
      </Text>

      <textarea rows={6} />

      <FormControl>
        <InputLabel>Oturum Türü Seçiniz</InputLabel>

        <Select multiple input={<Input />} style={{ width: '100%' }}></Select>
      </FormControl>

      <FormControl>
        <InputLabel>Spor Alanı Seçiniz</InputLabel>

        <Select multiple input={<Input />} style={{ width: '100%' }}></Select>
      </FormControl>
    </div>
  );
}

const UploadPic = styled.div`
  width: 250px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #363636;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
