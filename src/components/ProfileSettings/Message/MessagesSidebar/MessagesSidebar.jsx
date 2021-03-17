import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import MessageSearch from './MessageSearch';
import MessageInfoRow from './MessageInfoRow';
import { scrollbar } from 'components';
import { getRooms } from 'actions';

const MessageSidebar = () => {
  const { data: allRooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );

  const { searched, foundRooms } = useSelector(
    (state) => state.profileSettings2.messages.messageSearch
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  const rooms = searched ? foundRooms : allRooms;

  return (
    <Sidebar>
      <MessageSearch />

      <MessagesInfoWrapper>
        {rooms.map((data) => (
          <MessageInfoRow
            messageData={data.last_message}
            senderData={data.user_meta}
          />
        ))}
      </MessagesInfoWrapper>
    </Sidebar>
  );
};

export default MessageSidebar;

const MessagesInfoWrapper = styled.div`
  overflow: auto;
  max-height: 500px;
  ${scrollbar}
`;

const Sidebar = styled.div`
  max-width: 350px;
`;
