import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRooms, resetSelectedRoom } from 'actions';
import MessagesSidebar from './MessagesSidebar/MessagesSidebar';
import MessageChatArea from './MessageChatArea';

export default function Message({ id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isFirstTime = true;

    dispatch(getRooms(isFirstTime));

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
