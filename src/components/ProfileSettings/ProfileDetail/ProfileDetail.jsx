import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DIETITIAN } from '../../../constants';

import { getUserInfo } from 'actions';
import profileImg from 'assets/default-profile.jpg';
import styled from 'styled-components/macro';

import {Tabbar} from 'components';
import ProfileBanner from 'components/banner/profile-banner';
import Branch from 'components/Profile/Branch';
import ProfileCertificate from 'components/Profile/ProfileCertificate';
import Comment from 'components/Profile/Comment';
import Place from 'components/Profile/Place';
import DietitionPlace from 'components/Profile/Dietition/DietitionPlace';
import DietitionSpeciality from 'components/Profile/Dietition/DietitionSpeciality';
import Blog from 'components/Profile/Blog';
import Galery from 'components/Profile/Galery';
import ProfileReservation from 'components/ProfileReservation';

import MyCalendar from 'components/Profile/MyCalendar/MyCalendar';


export default function Profile( ) {
  const dispatch = useDispatch();
  const [page, setPage] = useState('Start');
  const [tab, setTab] = useState('Awaitings');
  const { userInfo, isLoading } = useSelector(
    (state) => state.userProfile.userInfo
  );
  const { id:id} = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, [id]);

  // const trainerAndDitetionTabs = [
  //   {
  //     eventKey: 'branch',
  //     title: 'BRANŞLAR',
  //     component:
  //       userInfo?.type_id === DIETITIAN ? (
  //         <DietitionSpeciality userId={id} />
  //       ) : (
  //         <Branch userId={id} />
  //       ),
  //   },
  //   {
  //     eventKey: 'certificate',
  //     title: 'SERTİFİKALAR',
  //     component: <ProfileCertificate userId={id} />,
  //   },
  //   {
  //     eventKey: 'workplace',
  //     title: 'ÇALIŞTIĞI YERLER',
  //     component:
  //       userInfo?.type_id === DIETITIAN ? (
  //         <DietitionPlace userId={id} />
  //       ) : (
  //         <Place userId={id} />
  //       ),
  //   },
  //   {
  //     eventKey: 'calendar',
  //     title: 'TAKVİM',
  //     component: <MyCalendar userId={id} typeId={userInfo?.type_id} setPage={setPage}/>,
  //   },
  //   {
  //     eventKey: 'comments',
  //     title: 'YORUMLAR',
  //     component: <Comment userId={id} />,
  //   },
  //   {
  //     eventKey: 'gallery',
  //     title: 'GALERİ',
  //     component: <Galery userId={id} />,
  //   },
  //   {
  //     eventKey: 'blog',
  //     title: 'BLOG',
  //     component: <Blog userId={id} userName={userInfo?.name} />,
  //   },
  // ];

  // const workPlaceTabs = [
  //   {
  //     eventKey: 'facility',
  //     title: 'OLANAKLAR',
  //     component: <FacilityList userId={id} />,
  //   },
  //   {
  //     eventKey: 'certificate',
  //     title: 'SERTİFİKALAR',
  //     component: <ProfileCertificate userId={id} />,
  //   },
  //   {
  //     eventKey: 'workplace',
  //     title: 'SINIFLAR',
  //     component: <Classes userId={id} />,
  //   },
  //
  //   {
  //     eventKey: 'trainers',
  //     title: 'EĞİTMENLER',
  //     component: <FindPt userId={id} />,
  //   },
  //   /*  {
  //     eventKey: 'calendar',
  //     title: 'TAKVİM',
  //     component: <MyCalendar userId={id} />,
  //   }, */
  //   /*   {
  //     eventKey: 'comments',
  //     title: 'YORUMLAR',
  //     component: <Comment userId={id} />,
  //   }, */
  //   {
  //     eventKey: 'gallery',
  //     title: 'GALERİ',
  //     component: <Galery userId={id} />,
  //   },
  //   {
  //     eventKey: 'location',
  //     title: 'KONUM',
  //     component: <GymLocation />,
  //   },
  // ];

  // let tabData;
  //
  // switch (userInfo?.type_id) {
  //   case PERSONAL_TRAINER:
  //     tabData = trainerAndDitetionTabs;
  //     break;
  //   case WORK_PLACE:
  //     tabData = workPlaceTabs;
  //     break;
  //   case DIETITIAN:
  //     tabData = trainerAndDitetionTabs;
  //     break;
  //   default:
  //     break;
  // }
  let content;
  switch (tab) {
    case 'Awaitings':
      content =   userInfo?.type_id === DIETITIAN ? (
        <DietitionSpeciality userId={id} />
      ) : (
        <Branch userId={id} />
      );
      break;
    case 'Certificates':
      content = <ProfileCertificate userId={id} />;
      break;
    case 'WorkPlace':
      content =  userInfo?.type_id === DIETITIAN ? (
        <DietitionPlace userId={id} />
      ) : (
        <Place userId={id} />
      );
      break;
    case 'Calendar':
      content =  <MyCalendar userId={id} typeId={userInfo?.type_id} setPage={setPage}/>;
      break;
    case 'Comments':
      content = <Comment userId={id} />;
      break;
    case 'Gallery':
      content = <Galery userId={id} />;
      break;
    case 'Blog':
      content = <Blog userId={id} userName={userInfo?.name} />;
      break;
    default:
      return <></>;
  }
  switch (page) {
    case 'Start':
      content = (
        <>
          {' '}
          <Container>
            <Row>
              <ProfileBanner
                isUserDetail={true}
                setPage={setPage}
                info={{
                  team: userInfo?.classification,
                  img: userInfo?.photo || profileImg,
                  name: userInfo?.name,
                  category: userInfo?.title,
                  price: userInfo?.price,
                  stars: userInfo?.rating,
                  location: `${userInfo?.district},${userInfo?.city}`,
                  comment: '/',
                  type_id: userInfo?.type_id,
                  id:userInfo?.id,
                  has_favorite:userInfo?.has_favorite
                }}
                categories={userInfo?.session || userInfo?.branch}
                about={
                  userInfo?.about ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”'
                }
              />
            </Row>
            <TabContainers>
              <>
                <Tabbar
                  defaultSelected="Awaitings"
                  onSelect={(value) => {
                    setTab(value);
                  }}
                  tabs={[
                    { text: 'BRANŞLAR', value: 'Awaitings' },
                    { text: 'SERTİFİKALAR', value: 'Certificates' },
                    { text: 'ÇALIŞTIĞI YERLER', value: 'WorkPlace' },
                    { text: 'TAKVİM', value: 'Calendar' },
                    { text: 'YORUMLAR', value: 'Comments' },
                    { text: 'GALERİ', value: 'Gallery' },
                    { text: 'BLOG', value: 'Blog' },
                  ]}
                />
                {content}
              </>
              {/*<Tab*/}
              {/*  baseUrl={`/myprofile/settings/profile/`}*/}
              {/*  tabData={tabData}*/}
              {/*  defaultActiveKey={*/}
              {/*    match?.params?.activeTabKey || tabData?.[0]?.eventKey*/}
              {/*  }*/}
              {/*/>*/}
            </TabContainers>
          </Container>
        </>
      );
      break;
    case 'Reservation':
      content = <ProfileReservation setPage={setPage} />;
      break;
  }
  return isLoading ? (
    <div>Yükleniyor</div>
  ) : (
    <>
      {content}
    </>
  );
}

const TabContainers = styled.div`
  min-height: 550px;
  padding: 30px;
`;
