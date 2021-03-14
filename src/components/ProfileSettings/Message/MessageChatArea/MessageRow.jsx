import React from 'react';

import ChatBox from './ChatBox';
import { Title } from 'components';

export default function MessageRow({
  time = '20:10',
  isMyMessage = false,
  message,
  senderProfileAvatar = 'https://i.stack.imgur.com/hdSzv.jpg?s=64&g=1',
}) {
  const wrapperClass = isMyMessage
    ? 'message-row__wrapper__home'
    : 'message-row__wrapper__away';

  const timeAlignClass = isMyMessage ? 'right' : 'left';

  return (
    <div className={wrapperClass}>
      {!isMyMessage && <img alt="" src={senderProfileAvatar} />}
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
