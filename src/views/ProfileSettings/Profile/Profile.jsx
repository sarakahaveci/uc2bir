import React from 'react';
import styled from 'styled-components/macro';

import { Accordion, Text, Col, Svg, ProfileFormCollections } from 'components';
import Files from '../../../components/ProfileSettings/Files/Files';

const SettingsData = [
  {
    settingsName: 'Profil',
    settingsDetails:
      'Adınız soyadınız, ünvanınız ve diğer bilgilerinizi güncel tutun',
    body: <div><ProfileFormCollections tab="profile"/></div>,
  },
  {
    settingsName: 'Hakkımda',
    settingsDetails: 'Hakkımda yazınızı düzenleyin, güncelleyin',
    body: <div>Component</div>,
  },
  {
    settingsName: 'Belgeler',
    settingsDetails:
      'Sistemimize yüklediğiniz belgelerinize göz atın; eksik belgelerinizi yükleyin, güncelleyin',
    body: <Files />,
  },
  {
    settingsName: 'Adresim',
    settingsDetails:
      'Güncel tuttuğunuz adres bilgileriniz ile sporseverler size daha kolay ulaşır.',
    body: <div>Component</div>,
  },
  {
    settingsName: 'Üyelik İptali',
    settingsDetails: 'Üyelik iptali durumunda kişiler size ulaşamayacaklardır.',
    body: <div>Component</div>,
  },
];

const Profile = () => {
  const settings = SettingsData.map((item) => (
    <Wrapper>
      <Accordion.Item>
        <Accordion.Toggle>
          <SettingsRow>
            <Col>
              <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                {item.settingsName}
              </Text>

              <Text color="gray4" fontSize="0.8rem" fontWeight="300">
                {item.settingsDetails}
              </Text>
            </Col>

            <Svg.ArrowUpIcon />
          </SettingsRow>
        </Accordion.Toggle>
        <Accordion.Collapse>
          <BodyWrapper>{item.body}</BodyWrapper>
        </Accordion.Collapse>
      </Accordion.Item>
    </Wrapper>
  ));

  return (
    <>
      <Accordion>{settings}</Accordion>
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  margin-bottom: 25px;
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid transparent;
  border-bottom: ${(p) => p.isActive && `1px solid ${p.theme.colors.gray5}`};
  padding: 10px 15px;

  svg {
    transition: all 0.5s;
    transform: ${(p) => p.isActive && 'rotate(180deg)'};
  }
`;

const BodyWrapper = styled.div`
  padding: 10px 15px;
`;
