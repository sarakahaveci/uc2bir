import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import MessageSearch from './MessagesSearch';
import MessageInfoRow from './MessageInfoRow';
import { getRooms } from 'actions';

const mockData = [
  {
    imgUrl: '',
    name: 'Nazlı Ulu',
    time: '20:19',
    lastMessage: 'Teşekkürler.',
  },
];

const MessageSidebar = () => {
  const { isLoading, data: rooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  return (
    <div>
      <MessageSearch />

      {mockData.map((data) => (
        <MessageInfoRow data={data} />
      ))}
    </div>
  );
};

export default MessageSidebar;
