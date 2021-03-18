import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Spinner } from 'components';
import { splitDateFromIsoDate } from 'utils';
import { getRoomMessages, sendMessageToRoom } from 'actions';
import MessageRow from './MessageRow';
import ChatBoxHeader from './ChatBoxHeader';
import DefaultProfileImg from 'assets/default-profile.jpg';

export default function MessageArea() {
  const dispatch = useDispatch();

  const { data: allMessages, isLoading: messagesLoading } = useSelector(
    (state) => state.profileSettings2.messages.messages
  );
  const { user } = useSelector((state) => state.auth);

  const { selectedRoomName, selectedRoomUser } = useSelector(
    (state) => state.profileSettings2.messages.selectedRoom
  );

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (selectedRoomName) {
      dispatch(getRoomMessages(selectedRoomName));
    }
  }, [selectedRoomName]);

  const handleSubmitMessage = (event) => {
    if (event.key === 'Enter' && !!message) {
      dispatch(
        sendMessageToRoom(
          message,
          () => {
            setMessage('');
            dispatch(getRoomMessages(selectedRoomName));
          },
          (message) => toast.error(message)
        )
      );
    }
  };

  return (
    <div className="message-page__right">
      <ChatBoxHeader />
      <div className="message-page__message__wrapper">
        {messagesLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="message-page__chat__row">
              {allMessages?.map((message) => {
                const { hour, minute } = splitDateFromIsoDate(
                  message.created_at
                );
                const photo = selectedRoomUser?.photo || DefaultProfileImg;

                return (
                  <MessageRow
                    key={'message' + hour + minute}
                    time={hour + ':' + minute}
                    message={message?.message}
                    isMyMessage={message?.sender_id === user?.id}
                    senderProfileAvatar={photo}
                  />
                );
              })}
            </div>
            <input
              placeholder="Mesaj yaz"
              className="message-input w-100 mt-2"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={handleSubmitMessage}
            />
          </>
        )}
      </div>
    </div>
  );
}
