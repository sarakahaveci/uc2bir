import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CalendarCell, Box, Span, Title } from 'components';
import { setSelectedDay } from 'actions';
import { theme } from 'utils';
import { HOURS, DAYS } from '../../../../constants';

export default function TemplateDate({
  selectedDayHours,
  setSelectedDayHours,
}) {
  const dispatch = useDispatch();

  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

  useEffect(() => {
    setSelectedDayHours([]);
  }, [selectedDay.day]);

  const allSelectedHours = selectedDay?.slice?.map((item) => item.hour).flat();

  const activeCellHandler = (index) => selectedDayHours.includes(index);

  const disableCellHandler = (index) => allSelectedHours.includes(index);

  const setSelectedHour = (index) =>
    setSelectedDayHours([...selectedDayHours, index]);

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
          Saat Aralığı Seçiniz
        </Title>

        <Span
          color="dark"
          fontWeight="500"
          textAlign="right"
          cursor="pointer"
          p="0"
          onClick={() => setSelectedDayHours([])}
        >
          Temizle
        </Span>
      </Box>

      <Box row flexWrap="wrap" mb="10px">
        {HOURS.map((item, index) => (
          <CalendarCell
            disabled={disableCellHandler(index)}
            isActive={activeCellHandler(index)}
            key={index}
            type="time"
            onClick={() => setSelectedHour(index)}
          >
            {item}
          </CalendarCell>
        ))}
      </Box>
    </div>
  );
}
