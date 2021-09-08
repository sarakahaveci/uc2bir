import React, { useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Password from 'components/ProfileSettings/Forms/tabs/Password';
import SettingsForm from 'components/ProfileSettings/Forms/SettingsForm';
import CompanyInf from 'components/ProfileSettings/Forms/CompanyInf';
import Phone from 'components/ProfileSettings/Forms/tabs/Phone';
import ComputedTest from 'components/ProfileSettings/Forms/tabs/ComputedTest';
import Address from 'components/ProfileSettings/Address';
import About from 'components/ProfileSettings/About';
import ShowPersonalInfo from 'components/ProfileSettings/ShowPersonalInfo';
import AllowPackage from 'components/ProfileSettings/AllowPackage';

import { Link } from 'react-router-dom';
import VKI from 'components/ProfileSettings/Forms/VKI';
import {
  Accordion,
  Text,
  Box,
  Svg,
  Files,
  Modal,
  CancellationDismissInfo,
  pulse,
} from 'components';
import ProfileCancellation from 'components/ProfileSettings/ProfileCancellation/ProfileCancellation';
import {
  USER,
  PERSONAL_TRAINER,
  WORK_PLACE,
  DIETITIAN,
} from '../../../constants';
import Notifications from 'components/ProfileSettings/Notifications';

const { t } = useTranslation();

const trainerAndDietitanData = [
  {
    settingsName: t('Profile'),
    body: <SettingsForm />,
  },
  {
    settingsName: t('About me'),
    body: <About />,
  },
  {
    settingsName: t('contact'),
    body: <Phone />,
  },
  {
    settingsName: t('password operations'),
    body: <Password />,
  },
  {
    settingsName: t('documents'),
    body: <Files />,
    pulse: true,
  },
  {
    settingsName: t('My address'),
    body: <Address />,
  },
  {
    settingsName: t('Blocked Users'),
    route: '/myprofile/settings/blocked',
  },
  {
    settingsName: t('Company information'),
    body: <CompanyInf />,
  },
  {
    settingsName: t('Package Reservation'),
    body: <AllowPackage />,
  },
];

const regularUserTabs = [
  {
    settingsName: t('Profile'),
    body: <SettingsForm />,
  },
  {
    settingsName: t('contact'),
    body: <Phone />,
  },
  {
    settingsName: t('password operations'),
    body: <Password />,
  },
  {
    settingsName: t('Your Height & Weight & BMI Information'),
    body: <VKI />,
  },
  {
    settingsName: t('Completed Tests'),
    body: <ComputedTest />,
  },
  {
    settingsName: t('Blocked Users'),
    route: '/myprofile/settings/blocked',
  },
  {
    settingsName: t('My address'),
    body: <Address locationDisable />,
  },
  {
    settingsName: t('privacy'),
    body: <ShowPersonalInfo />,
  },
];

const workPlaceData = [
  {
    settingsName: t('Workplace Profile'),
    body: <SettingsForm />,
  },
  {
    settingsName: t('About the Workplace'),
    body: <About />,
  },
  {
    settingsName: t('contact'),
    body: <Phone />,
  },
  {
    settingsName: t('Workplace Information'),
    body: <CompanyInf />,
  },
  {
    settingsName: t('password operations'),
    body: <Password />,
  },
  {
    settingsName: t('Workplace Documents'),
    body: <Files />,
    pulse: true,
  },
  {
    settingsName: t('Blocked Users'),
    route: '/myprofile/settings/blocked',
  },
  {
    settingsName: t('Work Place Address'),
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

  const settings = tabData?.map((item, index) =>
    item.route ? (
      <Link style={{ color: 'black' }} to={item?.route}>
        <ButtonWrapper>
          <SettingsRow pulse={item.pulse}>
            <Box col>
              <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                {item.settingsName}
              </Text>
            </Box>

            <Svg.ArrowRightIcon />
          </SettingsRow>
        </ButtonWrapper>{' '}
      </Link>
    ) : (
      <Wrapper key={'wrapper' + index}>
        <Accordion.Item>
          <Accordion.Toggle>
            <SettingsRow pulse={item.pulse}>
              <Box col>
                <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                  {item.settingsName}
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
    )
  );

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

  width: 622px;
  @media (max-width: 768px) {
    margin-left: 10px;
    width: 375px;
  }
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid transparent;
  border-bottom: ${(p) => p.isActive && `1px solid ${p.theme.colors.gray5}`};
  padding: 10px 15px;

  ${(p) =>
    p.pulse &&
    css`
      animation: pulse 1s;
      animation-iteration-count: 2;
      border-radius: 20px;
      ${pulse}
    `}

  svg {
    transition: all 0.5s;
    transform: ${(p) => p.isActive && 'rotate(180deg)'};
  }
`;

const BodyWrapper = styled.div`
  padding: 10px 15px;
`;
const ButtonWrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 3px 18px rgb(0 0 0 / 9%);
  margin-bottom: 25px;
  width: 622px;
  cursor: pointer;
`;
