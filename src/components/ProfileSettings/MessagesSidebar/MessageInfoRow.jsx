import React, { useMemo } from 'react';
import styled, { css } from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';

import Facility from 'assets/facility.png';
import { Text, Box } from 'components';
import { ISOToTimeConverter, ISOToDateConverter } from 'utils';

const MessageInfoRow = ({ messageData, senderData, unreadMessages }) => {
  const myProfileId = useSelector((state) => state.auth.user.id);

  const isLastSenderMe = myProfileId === messageData.sender_id;

  const isCardActive = true;

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
    >
      <AvatarWrapper>
        <Avatar src={Facility} showBorder>
          {messageData.user_active && <ActiveCircle />}
        </Avatar>
      </AvatarWrapper>

      <Box col flex={1}>
        <Box row justifyContent="space-between" mb="8px" alignItems="center">
          <Text p="0" color="blue" fontSize="0.9rem" fontWeight="600">
            {senderData.name}
          </Text>

          <MessageDate fontSize="0.9rem" color="dark">
            {messageDate}
          </MessageDate>
        </Box>

        <Box row alignItems="center">
          <Box row alignItems="center" pr="5px" flex={1}>
            {isLastSenderMe && <Avatar src={Facility} small />}

            <Box height="14px" flex={1} overflow="hidden" position="relative">
              <Message isLastSenderMe={isLastSenderMe}>
                {messageData.message}
              </Message>
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
