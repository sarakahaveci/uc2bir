import React, { useState } from 'react';

import MessageRow from './MessageChatArea/MessageRow';
import { splitDateFromIsoDate } from 'utils';

const mockData = [
  {
    id: 10,
    message: "Merhabalar Furkan bey Astral seyehat'a hoş geldiniz",
    sender_id: 933,
    receiver_id: 945,
    room_name: 'ffc7f07dbdf500008bcbbe75ad519e36',
    deleted_at: null,
    created_at: '2021-03-11T08:40:59.000000Z',
    updated_at: '2021-03-11T08:40:59.000000Z',
  },
  {
    id: 10,
    message:
      'Merhabalar Mustafa Bey, İlginiz için teşekkür ederim. Teklif edilen iş remote çalışmaya uygun mudur?',
    sender_id: 945,
    receiver_id: 933,
    room_name: 'ffc7f07dbdf500008bcbbe75ad519e36',
    deleted_at: null,
    created_at: '2021-03-11T08:42:59.000000Z',
    updated_at: '2021-03-11T08:40:59.000000Z',
  },
  {
    id: 10,
    message: 'Pandemi döneminde remote çalışıyoruz. Furkan Bey',
    sender_id: 933,
    receiver_id: 945,
    room_name: 'ffc7f07dbdf500008bcbbe75ad519e36',
    deleted_at: null,
    created_at: '2021-03-11T08:43:59.000000Z',
    updated_at: '2021-03-11T08:40:59.000000Z',
  },
  {
    id: 10,
    message:
      'Çok iyi o zaman görüşebiliriz. Telefon numaram : 05000030102. Saat 3 gibi arayabilirsiniz.',
    sender_id: 945,
    receiver_id: 933,
    room_name: 'ffc7f07dbdf500008bcbbe75ad519e36',
    deleted_at: null,
    created_at: '2021-03-11T08:45:59.000000Z',
    updated_at: '2021-03-11T08:40:59.000000Z',
  },
];

export default function MessageArea() {
  const [message, setMessage] = useState(null);

  const handleSubmitMessage = (event) => {
    if (event.key === 'Enter') {
      console.log('yes');
    }
  };

  return (
    <div className="w-100 bg-white">
      {mockData?.reverse()?.map((message) => {
        var { hour, minute } = splitDateFromIsoDate(message.created_at);

        return (
          <MessageRow
            time={hour + ':' + minute}
            message={message?.message}
            isMyMessage={message?.receiver_id === 945}
          />
        );
      })}
      <input
        placeholder="Mesaj yaz"
        className="message-input w-100 mt-2"
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={handleSubmitMessage}
      />
    </div>
  );
}
