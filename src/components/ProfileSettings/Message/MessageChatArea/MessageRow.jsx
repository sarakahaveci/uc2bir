import React from 'react';
import styled from 'styled-components/macro';

import ChatBox from './ChatBox';
import { Title } from 'components';

export default function MessageRow({
  time = '20:10',
  isMyMessage = false,
  message,
  senderProfileAvatar,
}) {
  const wrapperClass = isMyMessage
    ? 'message-row__wrapper__home'
    : 'message-row__wrapper__away';

  const timeAlignClass = isMyMessage ? 'right' : 'left';

  return (
    <div className={wrapperClass}>
      {!isMyMessage && <Avatar src={senderProfileAvatar} alt="" />}
      <div>
        <ChatBox isMyMessage={isMyMessage} message={message} />
        <div>
          <Title
            fontSize="11px"
            fontWeight="400"
            color="#909090"
            textAlign={timeAlignClass}
          >
            {time}
          </Title>
        </div>
      </div>
    </div>
  );
}

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
`;
