import React from 'react';

import { Title, Text, Main, Switch } from 'components';

const Notifications = () => {
  return (
    <Main>
      <Title component="h5">Bildirimlerim</Title>

      <Text>
        Tüm bildirimlerinizi görüntüleyebilir, ayarlarınızı
        güncelleyebilirsiniz.
      </Text>

      <div>
        <Switch />

        <Switch />

        <Switch />
      </div>
    </Main>
  );
};

export default Notifications;
