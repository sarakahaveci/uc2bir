import React from 'react';
import { Box, CalendarCell } from '../../index';
import { setGroupSelectionData } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { DIETITIAN } from '../../../constants';

export default function MyCalendarCollapser({data, setSelectedHour = () => {}, setSelectedBranch = () => {}, typeId}) {
  const {
    selectedHour,
  } = useSelector((state) => state.profileSettings2.reservationGroupSlot);
  const dispatch = useDispatch();
  const selectDataHandler = (name, value) => {
    setSelectedBranch(data.id)
    setSelectedHour(value)
    dispatch(setGroupSelectionData(name, value));
  }
  return <Box row flexWrap="wrap" style={{justifyContent:'center', paddingBottom:'10px'}}>

    {typeId===DIETITIAN?
    (data?.map((item, index) => (
      <CalendarCell
        key={index}
        type="time"
        size="large"
        isActive={selectedHour === item}
        onClick={() => selectDataHandler('selectedHour', item, data)}
      >
        {item}
      </CalendarCell>
    ))):
    (data?.slots?.map((item, index) => (
      <CalendarCell
        key={index}
        type="time"
        size="large"
        isActive={selectedHour === item}
        onClick={() => selectDataHandler('selectedHour', item, data)}
      >
        {item}
      </CalendarCell>
    )))}
  </Box>;
}
