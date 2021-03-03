import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';

import Password from 'components/ProfileSettings/Forms/tabs/Password';
import SettingsForm from 'components/ProfileSettings/Forms/SettingsForm';
import Address from 'components/ProfileSettings/Address';
import About from 'components/ProfileSettings/About';
import {
  Accordion,
  Text,
  Box,
  Svg,
  Files,
  Modal,
  CancellationDismissInfo,
  CancellationReason,
} from 'components';
import ProfileCancellation from 'components/ProfileSettings/ProfileCancellation/ProfileCancellation';

const SettingsData = [
  {
    settingsName: 'Profil',
    settingsDetails:
      'Adınız soyadınız, ünvanınız ve diğer bilgilerinizi güncel tutun',
    body: <SettingsForm />,
  },
  {
    settingsName: 'Hakkımda',
    settingsDetails: 'Hakkımda yazınızı düzenleyin, güncelleyin',
    body: <About />,
  },
  {
    settingsName: 'Şifre İşlemleri',
    settingsDetails: 'Şifrenizi buradan güncelleyebilirsiniz',
    body: <Password />,
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
    body: <Address />,
  },
];

const Profile = () => {
  const [isProfileCancellationPage, setIsProfileCancellationPage] = useState(
    false
  );
  const cancellationDismissModalRef = useRef();

  const checkIsValidCancellation = () => {
    if (true) {
      setIsProfileCancellationPage(true);
    } else {
      cancellationDismissModalRef.current.openModal();
    }
  };

  const settings = SettingsData.map((item) => (
    <Wrapper>
      <Accordion.Item>
        <Accordion.Toggle>
          <SettingsRow>
            <Box col>
              <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                {item.settingsName}
              </Text>

              <Text color="gray4" fontSize="0.8rem" fontWeight="300">
                {item.settingsDetails}
              </Text>
            </Box>

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
      {isProfileCancellationPage ? (
        <CancellationReason
          setIsProfileCancellationPage={setIsProfileCancellationPage}
        />
      ) : (
        <>
          <Accordion>{settings}</Accordion>

          <ProfileCancellation
            checkIsValidCancellation={checkIsValidCancellation}
          />
        </>
      )}

      <Modal ref={cancellationDismissModalRef}>
        <CancellationDismissInfo />
      </Modal>
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
