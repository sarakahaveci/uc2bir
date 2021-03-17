import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import { Title } from 'components';
import Facility from 'assets/facility.png';

const ChatBoxHeader = () => {
  const { selectedRoomUser } = useSelector(
    (state) => state.profileSettings2.messages.selectedRoom
  );

  const photo = selectedRoomUser?.photo || Facility;

  return (
    <Wrapper>
      <InnerWrapper>
        <Avatar src={photo} />
        <Title
          className="ml-2 mt-auto mb-auto"
          fontSize="15px"
          fontWeight="400"
          textAlign="left"
          color="#2c2c2c"
        >
          {selectedRoomUser?.name}
        </Title>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChatBoxHeader;

const Wrapper = styled.div`
  border-bottom: 0.5px solid ${(p) => p.theme.colors.gray7};
  padding: 10px 0px 10px 15px;
`;

const InnerWrapper = styled.div`
  display: flex;
  border-right: 0.5px solid #afafaf;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
`;
