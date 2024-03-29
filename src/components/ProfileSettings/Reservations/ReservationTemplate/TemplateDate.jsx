import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CalendarCell, Box, Title, Text } from 'components';
import { setSelectedDay } from 'actions';
import { theme } from 'utils';
import { DAYS } from '../../../../constants';
import SelectHourCells from './SelectHourCells';
import { useTranslation } from 'react-i18next';

export default function TemplateDate({
  selectedDayHours,
  setSelectedDayHours,
}) {
  const { t } = useTranslation();

  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDayHours([]);
  }, [selectedDay.day]);

  return (
    <div>
      <Box row mb="30px" alignItems="center">
        {DAYS.map((day, index) => (
          <CalendarCell
            isActive={selectedDay.day === index}
            key={index}
            type="day"
            onClick={() => dispatch(setSelectedDay(index))}
          >
            {day}
          </CalendarCell>
        ))}
      </Box>

      <Box row justifyContent="space-between">
        <Title color={theme.colors.gray10} component="h5" textAlign="left">
          {t('Select Time Range')}
        </Title>

        <Text
          color="gray2"
          fontWeight="700"
          textAlign="right"
          cursor="pointer"
          p="0"
          onClick={() => setSelectedDayHours([])}
        >
          {t('clear')}
        </Text>
      </Box>

      <SelectHourCells
        selectedDayHours={selectedDayHours}
        setSelectedDayHours={setSelectedDayHours}
      />
    </div>
  );
}
