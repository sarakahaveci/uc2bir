import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

export default function ProfileTab({ tabData, defaultActiveKey }) {
  return (
    <Tabs
      defaultActiveKey={defaultActiveKey ?? null}
      transition={false}
      id="profile-tab"
      unmountOnExit
    >
      {tabData.map((tab) => (
        <Tab eventKey={tab.eventKey} title={tab.title}>
          {tab.component}
        </Tab>
      ))}
    </Tabs>
  );
}

ProfileTab.propTypes = {
  tabData: PropTypes.array.isRequired,
  defaultActiveKey: PropTypes.string,
};

// How to Use
/*   const tabData = [
    {
      eventKey: 'branş',
      title: 'Branşlar',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Branşlar
        </Title>
      ),
    },
    {
      eventKey: 'Sertifika',
      title: 'Sertifika',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Sertifika
        </Title>
      ),
    },
    {
      eventKey: 'konum',
      title: 'Konum',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          konum
        </Title>
      ),
    },
  ];


     <Tab tabData={tabData} defaultActiveKey="branş" />
    Just pass your array with include your title,eventKey,component and defaultactivekey value,
    
  */
