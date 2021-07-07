import React, { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { differenceInDays } from 'date-fns';

import { Text, Box } from 'components';
import { setRoomName, setMessageSideBarOpen } from 'actions';
import { ISOToTimeConverter, ISOToDateConverter } from 'utils';
import DefaultProfileImg from 'assets/default-profile.jpg';

const MessageInfoRow = ({
  messageData,
  userData,
  unreadMessages,
  isNewMessage,
  isDefaultSelected
}) => {
  const { id: myProfileId, photo: profile_image } = useSelector(
    (state) => state.auth.user
  );

  const selectedRoomName = useSelector(
    (state) => state.profileSettings2.messages.selectedRoom.selectedRoomName
  );

  const dispatch = useDispatch();

  const isLastSenderMe = myProfileId === messageData.sender_id;

  const isCardActive = selectedRoomName === messageData.room_name;

  const setRoomNameHandler = () => {

    dispatch(setRoomName(messageData.room_name, userData));
    dispatch(setMessageSideBarOpen(false));
  };
  useEffect(() => {
   setTimeout(() => {
    if (isDefaultSelected) {
      setRoomNameHandler();
    }
   }, 500);
  }, [messageData])

  const messageDate = useMemo(() => {
    if (differenceInDays(new Date(), new Date(messageData.created_at)) === 0) {
      return ISOToTimeConverter(messageData.created_at);
    } else {
      return ISOToDateConverter(messageData.created_at);
    }
  }, [messageData]);

  return (
    <Wrapper
      row
      p="15px 25px 15px 15px"
      alignItems="center"
      isActive={isCardActive}
      onClick={()=>{setRoomNameHandler()}}
    >
      <AvatarWrapper>
        <Avatar
          src={
            isNewMessage
              ? userData.img
              : userData?.profile_image?.path || DefaultProfileImg
          }
          showBorder
        >
          {messageData?.user_active && <ActiveCircle />}
        </Avatar>
      </AvatarWrapper>

      <Box col flex={1}>
        <Box row justifyContent="space-between" mb="8px" alignItems="center">
          <Text p="0" color="blue" fontSize="0.9rem" fontWeight="600">
            {userData?.name ?? 'Sistem'}
          </Text>

          <MessageDate fontSize="0.9rem" color="dark">
            {messageDate}
          </MessageDate>
        </Box>

        <Box row alignItems="center">
          <Box row alignItems="center" pr="5px" flex={1}>
            {isLastSenderMe && (
              <Avatar src={profile_image || DefaultProfileImg} small />
            )}

            <Box height="14px" flex={1} overflow="hidden" position="relative">
              {messageData.file === 1 ? (
                <div></div>
              ) : (
                <Message isLastSenderMe={isLastSenderMe}>
                  {messageData.message}
                </Message>
              )}
            </Box>
          </Box>

          {!!unreadMessages && (
            <UnReadCount center>{unreadMessages}</UnReadCount>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default MessageInfoRow;

const Wrapper = styled(Box)`
  border-bottom: 0.5px solid ${(p) => p.theme.colors.gray7};
  cursor: pointer;

  ${(p) =>
    p.isActive &&
    css`
      background: #efefef;
    `}

  .typography {
    width: unset;
  }
`;

const MessageDate = styled.span`
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  text-align: right;
  white-space: nowrap;
  font-size: 0.9rem;
`;

const AvatarWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid ${(p) => p.theme.colors.blue};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border: ${(p) => p.showBorder && '2px solid white'};
  border-radius: 50%;
  position: relative;
  object-fit: contain;

  ${(p) =>
    p.small &&
    css`
      width: 24px;
      height: 24px;
    `}
`;

const ActiveCircle = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid white;
  background: ${(p) => p.theme.colors.green};
  border-radius: 50%;
  position: absolute;
  right: -2px;
  bottom: -2px;
`;

const UnReadCount = styled(Box)`
  width: 22px;
  height: 22px;
  background-color: ${(p) => p.theme.colors.blue};
  border-radius: 50%;
  color: white;
  font-size: 0.85rem;
  overflow: hidden;
`;

const Message = styled(Text)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  color: ${(p) => p.theme.colors.dark};
  font-size: 0.9rem;
  margin-left: ${(p) => (p.isLastSenderMe ? '5px' : '0')};
`;
