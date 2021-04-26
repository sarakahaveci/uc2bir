import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { subDays } from 'date-fns';
import { subMonths } from 'date-fns';
import {
  getNotifications,
  readNotifications,
  updateNotificationSettings,
} from 'actions';
import {
  Title,
  Text,
  Switch,
  Span,
  Svg,
  Button,
  Pagination,
  Box,
  Spinner,
  Select,
} from 'components';

const notificationSettingsTypes = [
  {
    key: 'sms',
    title: 'Sms almak istiyorum',
  },
  {
    key: 'email',
    title: 'E-posta almak istiyorum',
  },
  {
    key: 'push',
    title: 'Uygulama içi bildirimler',
  },
];

const Notifications = () => {
  const {
    notifications: { data: notifications, isLoading: notificationsLoading, types:notificationSettings },
  } = useSelector((state) => state.profileSettings2.notifications);

  const [pageNumber, setPageNumber] = useState(1);
  const [date, setDate] = useState(7);

  const dispatch = useDispatch();

  const [settings, setSettings] = useState({
    sms: false,
    email: false,
    push: false,
  });

  const substractDateHandler = () => {
    if (date < 7) {
      return subMonths(new Date(), date).getTime();
    } else {
      return subDays(new Date(), date).getTime();
    }
  };

  const notificationsSuccessHandler = (pageNumber) => setPageNumber(pageNumber);

  useEffect(() => {
    dispatch(readNotifications());
  }, []);

  useEffect(() => {
    dispatch(
      getNotifications(
        pageNumber,
        substractDateHandler(),
        notificationsSuccessHandler
      )
    );
  }, [pageNumber]);

  useEffect(() => {
    setSettings({
      sms: notificationSettings.sms === '1',
      email: notificationSettings.email === '1',
      push: notificationSettings.push === '1',
    });
  }, [notificationSettings]);

  const updateNotificationSettingsHandler = (key) => {
    const changedSettings = { ...settings, [key]: !settings[key] };

    setSettings(changedSettings);

    dispatch(updateNotificationSettings(changedSettings));
  };

  const pageChangeHandler = (event, value) => setPageNumber(value);

  const listHandler = () => {
    setPageNumber(1);

    dispatch(
      getNotifications(1, substractDateHandler(), notificationsSuccessHandler)
    );
  };

  const tableContent = notifications?.data?.length ? (
    notifications?.data?.map((item, index) => (
      <tr key={'noti' + index}>
        <Td>
          <Text
            color="dark"
            fontWeight="500"
            fontSize="0.9rem"
            minWidth="165px"
            width="auto"
          >
            {item.created_at}
          </Text>

          <Span color="dark" fontWeight="500" ml="5px" fontSize="0.9rem">
            {JSON.parse(item.payload)?.payload}
          </Span>
        </Td>
      </tr>
    ))
  ) : (
    <Box mt="15px"> Bildirim bulunmamaktadır.</Box>
  );

  return (
    <div>
      <Title component="h5" textAlign="left">
        Bildirimlerim
      </Title>

      <Text color="dark" fontSize="0.9rem" fontWeight="500" mb="15px">
        Tüm bildirimlerinizi görüntüleyebilir, ayarlarınızı
        güncelleyebilirsiniz.
      </Text>

      <SwitchRowWrapper>
        {notificationSettingsTypes.map((item, index) => (
          <Col key={index} lg={4}>
            <SwitchRow
              lastChild={notificationSettingsTypes.length - 1 === index}
            >
              <Text color="dark" fontWeight="500" fontSize="0.9rem">
                {item.title}
              </Text>

              <Switch
                checked={settings[item.key]}
                onChange={() => updateNotificationSettingsHandler(item.key)}
              />
            </SwitchRow>
          </Col>
        ))}
      </SwitchRowWrapper>

      <SortRow>
        <Col lg={6} />

        <Col lg={4}>
          <Select
            className="notification__date"
            onChange={(e) => setDate(e.target.value)}
          >
            <option value={7}>Son 7 Gün</option>
            <option value={15}>Son 15 Gün</option>
            <option value={1}>Son 1 Ay</option>
            <option value={3}>Son 3 Ay</option>
          </Select>
        </Col>

        <DateCol lg={2}>
          <Button
            fontWeight="bold"
            width="110px"
            className="blue"
            text="Listele"
            onClick={listHandler}
          />
        </DateCol>
      </SortRow>

      <Table>
        <thead>
          <tr>
            <Th>
              Tarih <Svg.UpDownIcon />
            </Th>
          </tr>
        </thead>

        <tbody>{notificationsLoading ? <Spinner /> : tableContent}</tbody>
      </Table>

      <Pagination
        mt="100px"
        page={pageNumber}
        onChange={pageChangeHandler}
        count={notifications.total}
      />
    </div>
  );
};

export default Notifications;

const DateCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

const SortRow = styled(Row)`
  margin-bottom: 20px;

  .notification__date {
    height: 100%;
  }
`;

const SwitchRowWrapper = styled(Row)`
  padding-bottom: 17px;
  margin-bottom: 20px;
`;

const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: ${(p) => (p.lastChild ? null : '1px solid #e3e3e3')};

  .MuiSwitch-root {
    margin: 0 15px 0 0;
  }
`;

const Table = styled.table`
  min-height: 100px;

  tbody {
    position: relative;
  }

  tr {
    &:nth-child(even) {
      background-color: ${(p) => p.theme.colors.gray6};
    }
  }
`;

const Th = styled.th`
  padding: 5px 15px;
  font-size: 0.9rem;
  display: flex;
  background-color: rgba(0, 178, 169, 0.2);

  svg {
    width: 13px;
    height: 13px;
    margin-left: 10px;
  }
`;

const Td = styled.td`
  padding: 15px;
  display: flex;
  align-items: center;
`;
