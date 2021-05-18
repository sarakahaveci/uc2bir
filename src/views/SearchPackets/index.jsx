import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchPackets from 'components/SearchPackets/SearchPackets';
import { Main } from 'components';
import { clearPacketReservation } from 'actions';
function SearcPackets() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearPacketReservation());
  }, []);
  return (
    <Main>
      <SearchPackets />
    </Main>
  );
}

export default SearcPackets;
