import React from 'react';

import { CalendarCell, Box, Title } from 'components';
import { theme } from 'utils';

const daysArr = ['P', 'S', 'Ç', 'P', 'C', 'C', 'P'];

const timesArr = [
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

export default function TemplateDate() {
  return (
    <div>
      <Box row mb="30px">
        {daysArr.map((day, index) => (
          <CalendarCell isActive key={index} type="day">
            {day}
          </CalendarCell>
        ))}
      </Box>

      <Title color={theme.colors.gray10} component="h5" textAlign="left">
        Saat Aralığı Seçiniz
      </Title>

      <Box row flexWrap="wrap" mb="10px">
        {timesArr.map((item, index) => (
          <CalendarCell key={index} type="time">
            {item}
          </CalendarCell>
        ))}
      </Box>
    </div>
  );
}
