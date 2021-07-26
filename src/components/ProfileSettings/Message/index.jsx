import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRooms, resetSelectedRoom,setRoomName } from 'actions';
import MessagesSidebar from './MessagesSidebar/MessagesSidebar';
import MessageChatArea from './MessageChatArea';

export default function Message() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isFirstTime = true;

    dispatch(getRooms((data) => {
      if (isFirstTime) {
        const allRooms = data.data;
        dispatch(
          setRoomName(allRooms?.[0]?.room_name, data.data?.[0]?.user_meta)
        );
      }
    },));

    return () => dispatch(resetSelectedRoom());
  }, []);
  //
  function onClickHandle() {
    setOpen(!open);
  }
  return (
    <div className="w-100  d-flex message-page__wrapper">
      <MessagesSidebar onClickHandle={onClickHandle} />
      <MessageChatArea open={open} />
    </div>
  );
}
