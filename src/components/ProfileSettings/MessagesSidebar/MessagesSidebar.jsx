import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import MessageSearch from './MessageSearch';
import MessageInfoRow from './MessageInfoRow';
import { getRooms } from 'actions';

const mockData = [
  {
    id: 1,
    user_id: 942,
    room_name: '6e35959904830c7682d1e664b0693105',
    receiver_id: 943,
    created_at: null,
    updated_at: null,
    last_message: {
      id: 1,
      message: 'aswdaswdaswdaswdaswdaswdaswdaswdaswdaswd',
      sender_id: 942,
      receiver_id: 943,
      sender_name: 'Nazlı Ulu',
      sender_image: 'blabla',
      unread_notifications: 2,
      user_active: true,
      room_name: '6e35959904830c7682d1e664b0693105',
      deleted_at: null,
      created_at: '2021-03-11T07:26:44.000000Z',
      updated_at: '2021-03-11T07:26:44.000000Z',
    },
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
    <Sidebar>
      <MessageSearch />

      {mockData.map((data) => (
        <MessageInfoRow data={data.last_message} />
      ))}
    </Sidebar>
  );
};

export default MessageSidebar;

const Sidebar = styled.div`
  max-width: 350px;
`;
