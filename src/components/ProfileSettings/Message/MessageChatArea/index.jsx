import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { ISOToTimeConverter } from 'utils';
import {
  getRoomMessages,
  sendMessageToRoom,
  getRooms,
  sendFileToRoom,
} from 'actions';
import MessageRow from './MessageRow';
import ChatBoxHeader from './ChatBoxHeader';
import DefaultProfileImg from 'assets/default-profile.jpg';
import { PlusButton } from 'components';

export default function MessageArea() {
  // eslint-disable-next-line
  const [file, setFile] = useState();
  const [message, setMessage] = useState(null);

  const fileInputRef = useRef();

  const { data: allMessages } = useSelector(
    (state) => state.profileSettings2.messages.messages
  );
  const { user } = useSelector((state) => state.auth);

  const { selectedRoomName, selectedRoomUser } = useSelector(
    (state) => state.profileSettings2.messages.selectedRoom
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRoomName) {
      dispatch(getRoomMessages(selectedRoomName));
    }
  }, [selectedRoomName]);

  const successMessageCallback = () => {
    setMessage('');
    dispatch(getRoomMessages(selectedRoomName));
    dispatch(getRooms());
    setFile();
  };

  const handleSubmitMessage = (event) => {
    if (event.key === 'Enter' && !!message) {
      dispatch(sendMessageToRoom(message, successMessageCallback));
    }
  };

  const fileChangeHandler = (e) => {
    const targetFile = e.target.files[0];

    setFile(targetFile);

    dispatch(sendFileToRoom(targetFile), successMessageCallback);
  };

  return (
    <div className="message-page__right">
      <ChatBoxHeader />
      <div className="message-page__message__wrapper">
        <div className="message-page__chat__row">
          {allMessages?.map((message, index) => {
            const time = ISOToTimeConverter(message.created_at);
            const photo = selectedRoomUser?.photo || DefaultProfileImg;

            return (
              <MessageRow
                key={index}
                time={time}
                message={message?.message}
                isMyMessage={message?.sender_id === user?.id}
                senderProfileAvatar={photo}
                file={message?.file}
              />
            );
          })}
        </div>
        <InputWrapper>
          <input
            placeholder="Mesaj yaz"
            className="message-input w-100 mt-2"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={handleSubmitMessage}
          />

          <PlusButton
            className="plus-button"
            onClick={() => fileInputRef.current.click()}
          />
        </InputWrapper>

        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={fileChangeHandler}
        />
      </div>
    </div>
  );
}

const InputWrapper = styled.div`
  position: relative;

  .plus-button {
    position: absolute;
    right: 7px;
    bottom: 2px;
    width: 24px;
    height: 24px;
  }
`;

const FileInput = styled.input`
  display: none;
`;
