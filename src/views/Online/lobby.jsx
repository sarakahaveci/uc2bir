import React from 'react';
import { useTranslation } from 'react-i18next';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t('Enter a room')}</h2>
      <div>
        <label htmlFor="name">{t('name')}:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">{t('Room name')}:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      <button type="submit">{t('Submit')}</button>
    </form>
  );
};

export default Lobby;
