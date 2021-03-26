import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getRooms, resetSelectedRoom } from 'actions';
import MessagesSidebar from './MessagesSidebar/MessagesSidebar';
import MessageChatArea from './MessageChatArea';

export default function Message() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isFirstTime = true;

    dispatch(getRooms(isFirstTime));

    return () => dispatch(resetSelectedRoom());
  }, []);

  return (
    <div className="w-100  d-flex message-page__wrapper">
      <MessagesSidebar />
      <MessageChatArea />
    </div>
  );
}
