import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import MessageSearch from './MessageSearch';
import MessageInfoRow from './MessageInfoRow';
import { scrollbar } from 'components';
import { device } from 'utils';

const MessageSidebar = () => {
  const { data: allRooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );

  const { searched, foundRooms } = useSelector(
    (state) => state.profileSettings2.messages.messageSearch
  );
  const { messageSideBarOpen } = useSelector(
    (state) => state.profileSettings2.messages
  );

  const rooms = searched ? foundRooms : allRooms;

  return (
    <Sidebar open={messageSideBarOpen}>
      <MessageSearch />

      <MessagesInfoWrapper>
        {rooms?.map((data, index) => (
          <MessageInfoRow
            key={index + 'message'}
            messageData={data.last_message}
            userData={data.user_meta}
            unreadMessages={data.unread_messages}
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
  position: relative;

  @media ${device.sm} {
    ${(props) => (props.open ? '' : 'height:0;width:0;overflow:hidden;')}
    max-width: 80vw;

    transition: all 0.3s ease-out;
  }
`;
