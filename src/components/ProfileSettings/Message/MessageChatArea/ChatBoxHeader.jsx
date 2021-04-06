import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { Title, Box } from 'components';
import DefaultProfileImg from 'assets/default-profile.jpg';
import { setMessageSideBarOpen } from 'actions';
import Svg from 'components/statics/svg';

const ChatBoxHeader = () => {
  const dispatch = useDispatch();

  const { selectedRoomUser } = useSelector(
    (state) => state.profileSettings2.messages.selectedRoom
  );
  const { messageSideBarOpen } = useSelector(
    (state) => state.profileSettings2.messages
  );
  const photo = selectedRoomUser?.photo || DefaultProfileImg;

  return (
    <Wrapper>
      <InnerWrapper>
        <Box row>
          <IconWrapper>
            {messageSideBarOpen ? (
              <Svg.CloseIcon
                onClick={() => {
                  dispatch(setMessageSideBarOpen(!messageSideBarOpen));
                }}
                src={photo}
              />
            ) : (
              <Svg.HamburgerMenu
                onClick={() => {
                  dispatch(setMessageSideBarOpen(!messageSideBarOpen));
                }}
                src={photo}
              />
            )}
          </IconWrapper>

          <Avatar src={photo} />
          <Title
            className="ml-2 mt-auto mb-auto"
            fontSize="15px"
            fontWeight="400"
            textAlign="left"
            color="#2c2c2c"
          >
            {selectedRoomUser?.name ?? 'Müşteri temsilcisi'}
          </Title>
        </Box>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChatBoxHeader;

const Wrapper = styled.div`
  border-bottom: 0.5px solid ${(p) => p.theme.colors.gray7};
  padding: 10px 20px 10px 15px;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const IconWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin 0 10px 0 10px;
  @media (max-width: 768px) {
    display: flex;
  }
`;
