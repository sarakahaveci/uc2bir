import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

export default function ProfileTab({ tabData, defaultActiveKey, baseUrl }) {
  const history = useHistory();

  return (
    <StyledTabs
      activeKey={defaultActiveKey ?? null}
      transition={false}
      id="profile-tab"
      unmountOnExit
      onSelect={(key) => history.push(`${baseUrl}${key}`)}
    >
      {tabData.map((tab) => (
        <Tab eventKey={tab.eventKey} title={tab.title} key={tab.eventKey}>
          {tab.component}
        </Tab>
      ))}
    </StyledTabs>
  );
}

const StyledTabs = styled(Tabs)`
  padding: 5px 20px 0;
  margin-bottom: 40px;

  .active {
    color: ${(p) => p.theme.colors.blue} !important;
  }

  .nav-link {
    &:not(:last-child) {
      border-right: 1px solid #e8f0f8 !important;
      border-radius: unset;
    }
  }
`;

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
