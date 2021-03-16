import React from 'react';
import styled from 'styled-components/macro';
import { Row, Col, Form } from 'react-bootstrap';

import { Title, Text, Main, Switch, Span, Svg, Button } from 'components';

const mockData = [
  {
    date: '6.11.2020 - 15:00',
    note: 'Öğrenciniz ile randevunuz onaylandı',
  },
  {
    date: '6.11.2020 - 15:00',
    note: 'Öğrenciniz ile randevunuz onaylandı',
  },
  {
    date: '6.11.2020 - 15:00',
    note: 'Öğrenciniz ile randevunuz onaylandı',
  },
  {
    date: '6.11.2020 - 15:00',
    note: 'Öğrenciniz ile randevunuz onaylandı',
  },
];

const notificationSettings = [
  'Sms almak istiyorum',
  'E-posta almak istiyorum',
  'Uygulama içi bildirimler',
];

const Notifications = () => {
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
        {notificationSettings.map((item) => (
          <Col lg={4}>
            <SwitchRow>
              <Text color="dark" fontWeight="500" fontSize="0.9rem">
                {item}
              </Text>

              <Switch />
            </SwitchRow>
          </Col>
        ))}
      </SwitchRowWrapper>

      <SortRow>
        <Col lg={6} />

        <Col lg={3}>
          <Form.Control as="select">
            <option>Son 7 Gün</option>
          </Form.Control>
        </Col>

        <Col lg={3}>
          <Button
            fontWeight="bold"
            width="110px"
            className="blue"
            text="Listele"
          />
        </Col>
      </SortRow>

      <Table>
        <tr>
          <Th>
            Tarih <Svg.UpDownIcon />
          </Th>
        </tr>

        {mockData.map((item) => (
          <tr>
            <Td>
              <Span color="dark" fontWeight="500" fontSize="0.9rem">
                {item.date}
              </Span>

              <Span color="dark" fontWeight="500" ml="20px" fontSize="0.9rem">
                {item.note}
              </Span>
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default Notifications;

const SortRow = styled(Row)`
  margin-bottom: 20px;
`;

const SwitchRowWrapper = styled(Row)`
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 17px;
  margin-bottom: 20px;
`;

const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-right: 1px solid #e3e3e3;

  .MuiSwitch-root {
    margin: 0 15px 0 0;
  }
`;

const Table = styled.table`
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
`;
