import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Password from 'components/ProfileSettings/Forms/tabs/Password';
import SettingsForm from 'components/ProfileSettings/Forms/SettingsForm';
import CompanyInf from 'components/ProfileSettings/Forms/CompanyInf';
import Phone from 'components/ProfileSettings/Forms/tabs/Phone';
import ComputedTest from 'components/ProfileSettings/Forms/tabs/ComputedTest';
import Address from 'components/ProfileSettings/Address';
import About from 'components/ProfileSettings/About';
import VKI from 'components/ProfileSettings/Forms/VKI';
import {
  Accordion,
  Text,
  Box,
  Svg,
  Files,
  Modal,
  CancellationDismissInfo,
} from 'components';
import ProfileCancellation from 'components/ProfileSettings/ProfileCancellation/ProfileCancellation';
import {
  USER,
  PERSONAL_TRAINER,
  WORK_PLACE,
  DIETITIAN,
} from '../../../constants';
import Notifications from 'views/ProfileSettings/Notifications';

const trainerAndDietitanData = [
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
    settingsName: 'İletişim',
    settingsDetails: 'Telefon numaranızı güncelleyin.',
    body: <Phone />,
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
  {
    settingsName: 'Şirket Bilgileri',
    settingsDetails: 'Şirket bilgilerinizi düzenleyin, güncelleyin',
    body: <CompanyInf />,
  },
];

const regularUserTabs = [
  {
    settingsName: 'Profil',
    settingsDetails:
      'Adınız soyadınız, ünvanınız ve diğer bilgilerinizi güncel tutun',
    body: <SettingsForm />,
  },
  {
    settingsName: 'İletişim',
    settingsDetails: 'Telefon numaranızı güncelleyin.',
    body: <Phone />,
  },
  {
    settingsName: 'Boy & Ağırlık & VKI Bilgineriniz',
    settingsDetails: 'Bilgilerinizi güncel tutun',
    body: <VKI />,
  },
  {
    settingsName: 'Tamamlanmış Testler ',
    settingsDetails: 'Tamamladığınız testlere göz atın',
    body: <ComputedTest />,
  },
  {
    settingsName: 'Adresim',
    settingsDetails:
      'Güncel tuttuğunuz adres bilgileriniz ile sporseverler size daha kolay ulaşır.',
    body: <Address />,
  },
];

const workPlaceData = [
  {
    settingsName: 'İş Yeri Profil',
    settingsDetails: 'İş yerine ait bilgilenirinizi güncel tutun, düzenleyin',
    body: <SettingsForm />,
  },
  {
    settingsName: 'İş Yeri Hakkında',
    settingsDetails: 'İş yeri hakkında yazınızı düzenleyin, güncelleyin',
    body: <About />,
  },
  {
    settingsName: 'İletişim',
    settingsDetails: 'Telefon numaranızı güncelleyin.',
    body: <Phone />,
  },
  {
    settingsName: 'İş Yeri Bilgileri',
    settingsDetails: 'Şirket Bilgilerinizi düzenleyin, güncelleyin',
    body: <CompanyInf />,
  },
  {
    settingsName: 'Şifre İşlemleri',
    settingsDetails: 'Şifrenizi buradan güncelleyebilirsiniz',
    body: <Password />,
  },
  {
    settingsName: 'İş Yeri Belgeler',
    settingsDetails:
      'Sistemimize yüklediğiniz belgelerinize göz atın; eksik belgelerinizi yükleyin, güncelleyin',
    body: <Files />,
  },
  {
    settingsName: 'İş Yeri Adres',
    settingsDetails:
      'Güncel tuttuğunuz adres bilgileriniz ile sporseverler size daha kolay ulaşır.',
    body: <Address />,
  },
];

const ProfileSettingsList = () => {
  const user = useSelector((state) => state.auth.user);

  const { activeTabKey } = useParams();

  const cancellationDismissModalRef = useRef();

  let tabData;

  switch (user?.type_id) {
    case USER:
      tabData = regularUserTabs;
      break;
    case PERSONAL_TRAINER:
      tabData = trainerAndDietitanData;
      break;
    case WORK_PLACE:
      tabData = workPlaceData;
      break;
    case DIETITIAN:
      tabData = trainerAndDietitanData;
      break;
    default:
      tabData = regularUserTabs;
      break;
  }

  const settings = tabData?.map((item, index) => (
    <Wrapper key={'wrapper' + index}>
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
      {activeTabKey !== 'notifications' && (
        <>
          <Accordion>{settings}</Accordion>

          <ProfileCancellation />
        </>
      )}

      {activeTabKey === 'notifications' && <Notifications />}

      {/* <CancellationReason /> */}

      <Modal ref={cancellationDismissModalRef}>
        <CancellationDismissInfo />
      </Modal>
    </>
  );
};

export default ProfileSettingsList;

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
