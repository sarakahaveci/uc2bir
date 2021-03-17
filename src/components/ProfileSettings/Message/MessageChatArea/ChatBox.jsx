import React from 'react';

import { Title } from 'components';

export default function ChatBox({
  message = 'sevglm var yzma seni vurur',
  isMyMessage,
}) {
  const boxWrapperClass = isMyMessage
    ? 'message-box__wrapper__home'
    : 'message-box__wrapper__away';

  const messageColorClass = isMyMessage ? '#ffffff' : '#181818';

  return (
    <div className={boxWrapperClass}>
      <Title fontSize="14px" fontWeight="400" color={messageColorClass}>
        {message}
      </Title>
    </div>
  );
}
