import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CalendarCell, Box, Text, Title } from 'components';
import { setSelectedDay } from 'actions';
import { theme } from 'utils';
import { toast } from 'react-toastify';
import { HOURS, DAYS } from '../../../../constants';

export default function TemplateDate({ listedDayHours, setListedDayHours }) {
  const dispatch = useDispatch();

  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );
  const [selectedDayHours, setSelectedDayHours] = useState([]);
  const [hoveredItemIndex, setHoveredItemIndex] = useState();

  // [[3,5], [6,7]]
  // Seçilen gündeki bütün saat aralığı tek bir array haline getirildi.
  const allSelectedHours = selectedDay?.dates?.map((item) => item.hours);

  useEffect(() => {
    setSelectedDayHours([]);
    setListedDayHours([]);
  }, [selectedDay]);

  useLayoutEffect(() => {
    if (selectedDayHours.length === 2) {
      setListedDayHours([...listedDayHours, selectedDayHours]);

      setSelectedDayHours([]);
    }
  }, [selectedDayHours]);

  const isActiveCellHandler = (index) => {
    if (listedDayHours.some((item) => item.includes(index))) {
      return true;
    }

    return selectedDayHours.includes(index);
  };

  const halfActiveCellHandler = (index) => {
    if (selectedDayHours.length === 1 && index < hoveredItemIndex) {
      return true;
    }

    if (listedDayHours.some((item) => item[0] < index && item[1] > index)) {
      return true;
    }
  };

  // Seçilen gündeki dolu olan saatler disabled yapıldı.
  // [[3,5], [6,7]] her bir arrayde dolaşıldıktan sonra arraylerin
  // arasındaki ve kendi değerleri disable edildi.
  const disabledCell = (index) =>
    allSelectedHours.some(
      (item) => item.includes(index) || (item[0] < index && item[1] > index)
    );

  const selectTimeHandler = (index) => {
    if (
      selectedDayHours.length === 1 &&
      (allSelectedHours.some(
        (item) => item[0] > selectedDayHours[0] && item[1] < index
      ) ||
        allSelectedHours.some(
          (item) => item[1] < selectedDayHours[0] && item[0] > index
        ))
    ) {
      toast.error('Arasında saat olan alanlar girilemez.', {
        position: 'bottom-right',
      });

      return;
    }

    if (selectedDayHours.length < 3) {
      setSelectedDayHours([...selectedDayHours, index]);
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
          color="dark"
          fontWeight="500"
          textAlign="right"
          cursor="pointer"
          p="0"
          onClick={() => {
            setSelectedDayHours([]);
            setListedDayHours([]);
          }}
        >
          Temizle
        </Text>
      </Box>

      <Box row flexWrap="wrap" mb="10px">
        {HOURS.map((item, index) => (
          <CalendarCell
            onClick={() => selectTimeHandler(index)}
            isActive={isActiveCellHandler(index)}
            halfActive={halfActiveCellHandler(index)}
            disabled={disabledCell(index)}
            onMouseEnter={() => setHoveredItemIndex(index)}
            key={index}
            type="time"
          >
            {item}
          </CalendarCell>
        ))}
      </Box>
    </div>
  );
}
