import React from 'react';

import { Title } from 'components';

export default function ChatBox({ message, isMyMessage, file }) {
  const boxWrapperClass = isMyMessage
    ? 'message-box__wrapper__home'
    : 'message-box__wrapper__away';

  const messageColorClass = isMyMessage ? 'white' : 'softDark';

  return (
    <div className={boxWrapperClass}>
      {file === 0 ? (
        <Title fontSize="14px" fontWeight="400" color={messageColorClass}>
          {message}
        </Title>
      ) : (
        <img src={message} width="200px" height="200px" />
      )}
    </div>
  );
}
