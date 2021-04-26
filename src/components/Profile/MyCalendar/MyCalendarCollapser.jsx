import React from 'react';
import { Box, CalendarCell } from '../../index';
import { setGroupSelectionData } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function MyCalendarCollapser({data, setSelectedHour = () => {}}) {
  const {
    selectedHour,
  } = useSelector((state) => state.profileSettings2.reservationGroupSlot);
  const dispatch = useDispatch();
  const selectDataHandler = (name, value) => {
    setSelectedHour(value)
    dispatch(setGroupSelectionData(name, value));
  }
  return <Box row flexWrap="wrap" style={{justifyContent:'center', paddingBottom:'10px'}}>
    {data?.slots?.map((item, index) => (
      <CalendarCell
        key={index}
        type="time"
        size="large"
        isActive={selectedHour === item}
        onClick={() => selectDataHandler('selectedHour', item)}
      >
        {item}
      </CalendarCell>
    ))}
  </Box>;
}
