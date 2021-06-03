import React, { useState } from 'react';

import { CalendarCell, Box } from 'components';
import { HOURS } from '../../../../constants';

export default function SelectHourCells({
  selectedDayHours,
  setSelectedDayHours,
}) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState();

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
    <Box row flexWrap="wrap" mb="10px">
      {HOURS.map((item, index) => (
        <CalendarCell
          key={index}
          onClick={() => (selectedDayHours.length == 2) ? setSelectedDayHours([]) : setSelectedDayHours([...selectedDayHours, index])}
          isActive={activeCellHandler(index)}
          halfActive={halfActiveCellHandler(index)}
          disabled={selectedDayHours.length === 4}
          onMouseEnter={() => setHoveredItemIndex(index)}
          type="time"
        >
          {item}
        </CalendarCell>
      ))}
    </Box>
  );
}
