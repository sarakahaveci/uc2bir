import React from 'react';
import styled from 'styled-components/macro';

import ChatBox from './ChatBox';
import { Title } from 'components';

export default function MessageRow({
  time = '20:10',
  isMyMessage = false,
  message,
  senderProfileAvatar,
  file,
}) {
  const wrapperClass = isMyMessage
    ? 'message-row__wrapper__home'
    : 'message-row__wrapper__away';

  const timeAlignClass = isMyMessage ? 'right' : 'left';

  return (
    <div className={wrapperClass}>
      {!isMyMessage && <Avatar src={senderProfileAvatar} alt="" />}
      <div>
        <ChatBox isMyMessage={isMyMessage} message={message} file={file} />
        <div>
          <Title
            fontSize="0.8rem"
            fontWeight="400"
            color="gray1"
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
  object-fit: contain;
`;
