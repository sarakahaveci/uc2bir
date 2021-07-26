import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { CircleProfileCard, Spinner } from 'components';
import DefaultProfilePicture from 'assets/pt-groups/item-1/04.jpg';
import ProfileSettingsList from './ProfileSettingsList';

export default function ProfileInfoSetting() {
  const { isLoading } = useSelector(
    (state) => state.profileSettings2.profileDetail
  );

  return isLoading ? (
    <Spinner size="md" />
  ) : (
    <Row>
      <Col md={4} sm={12} style={{ paddingLeft: '30px', marginBottom: '20px',display:'flex',alignItems: 'center',flexDirection: 'column'}}>
        {/*<ProfileCard img={DefaultProfilePicture} />*/}
        <h3 style={{width:'180px',marginBottom:'20px'}}>Profil</h3>
        <CircleProfileCard img={DefaultProfilePicture} />
      </Col>
      <Col md={8} sm={12}>
        <ProfileSettingsList />
      </Col>
    </Row>
  );
}
