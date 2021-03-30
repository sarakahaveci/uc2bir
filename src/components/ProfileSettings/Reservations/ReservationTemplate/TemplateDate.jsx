import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CalendarCell, Box, Title, Text } from 'components';
import { setSelectedDay } from 'actions';
import { theme } from 'utils';
import { DAYS, HOURS } from '../../../../constants';

export default function TemplateDate({
  selectedDayHours,
  setSelectedDayHours,
}) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState();

  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDayHours([]);
  }, [selectedDay.day]);

  const activeCellHandler = (index) => selectedDayHours.includes(index);

  const halfActiveCellHandler = (index) => {
    if (selectedDayHours.length === 1) {
      if (
        (selectedDayHours[0] > index && hoveredItemIndex <= index) ||
        (selectedDayHours[0] < index && hoveredItemIndex >= index)
      ) {
        return true;
      }
    }

    if (
      (selectedDayHours[0] < index && selectedDayHours[1] > index) ||
      (selectedDayHours[0] > index && selectedDayHours[1] < index)
    ) {
      return true;
    }
  };

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

        <Text
          color="gray2"
          fontWeight="700"
          textAlign="right"
          cursor="pointer"
          p="0"
          onClick={() => setSelectedDayHours([])}
        >
          Temizle
        </Text>
      </Box>

      <Box row flexWrap="wrap" mb="10px">
        {HOURS.map((item, index) => (
          <CalendarCell
            key={index}
            onClick={() => setSelectedDayHours([...selectedDayHours, index])}
            isActive={activeCellHandler(index)}
            halfActive={halfActiveCellHandler(index)}
            disabled={selectedDayHours.length === 2}
            onMouseEnter={() => setHoveredItemIndex(index)}
            type="time"
          >
            {item}
          </CalendarCell>
        ))}
      </Box>
    </div>
  );
}
