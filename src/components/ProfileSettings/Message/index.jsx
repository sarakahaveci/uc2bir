import React from 'react';

import MessagesSidebar from './MessagesSidebar/MessagesSidebar';
import MessageChatArea from './MessageChatArea';

export default function Message() {
  return (
    <div className="w-100  d-flex message-page__wrapper">
      <MessagesSidebar />
      <MessageChatArea />
    </div>
  );
}
