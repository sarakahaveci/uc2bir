// @ts-nocheck
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Main from '../../components/Main';
import {
  Accordion,
  Text,
  Box,
  Svg,
  pulse,
  GoogleMapClusterer,
} from 'components';
import { useTranslation } from 'react-i18next';

import { getSearchResults } from 'actions';
import PtPackagesTab from '../../components/HeaderSearchResults/PtPackagesTab';
import DtPackagesTab from '../../components/HeaderSearchResults/DtPackagesTab';
import PTTab from '../../components/HeaderSearchResults/PTTab';
import GymTab from '../../components/HeaderSearchResults/GymTab';
import DietitiansTab from '../../components/HeaderSearchResults/DietitiansTab';
import BlogsTab from '../../components/HeaderSearchResults/BlogsTab';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components/macro';
import { useHistory, useParams } from 'react-router-dom';

const HeaderSearchResults = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchResults.data);
  const pts = data?.users?.data?.filter((item) => item.type == 'pt');
  const dts = data?.users?.data?.filter((item) => item.type == 'dt');
  const gyms = data?.users?.data?.filter((item) => item.type == 'bs');

  const ptPackages = data?.packages?.data?.filter(
    (item) => item.type == 'pt-package'
  );
  const dtPackages = data?.packages?.data?.filter(
    (item) => item.type == 'dt-package'
  );
  const blogs = data?.blogs?.data;
  const history = useHistory();
  const { keyword } = useParams();

  const Tabs = [];
  useEffect(() => {
    dispatch(getSearchResults(keyword, () => {}));
  }, [keyword]);

  if (pts?.length > 0) {
    Tabs.push({
      settingsName: t('trainers') + '(' + pts?.length + ')',
      body: <PTTab pts={pts} />,
      size: pts?.length,
      type: 'pt',
    });
  }

  if (gyms?.length > 0) {
    Tabs.push({
      settingsName: t('Gyms') + '(' + gyms?.length + ')',
      body: <GymTab gyms={gyms} />,
      size: gyms?.length,
      type: 'gym',
    });
  }

  if (dts?.length > 0) {
    Tabs.push({
      settingsName: t('dietitiansCapitalize') + '(' + dts?.length + ')',
      body: <DietitiansTab dts={dts} />,
      size: dts?.length,
      type: 'dt',
    });
  }

  if (ptPackages?.length) {
    Tabs.push({
      settingsName: t('Trainer Package') + ptPackages?.length + ')',
      body: <PtPackagesTab packages={ptPackages} />,
      size: ptPackages?.length,
      type: 'packets',
    });
  }
  if (dtPackages?.length > 0) {
    Tabs.push({
      settingsName: t('Dietitian Package') + dtPackages?.length + ')',
      body: <DtPackagesTab packages={dtPackages} />,
      size: dtPackages?.length,
      type: 'packets',
    });
  }

  if (blogs?.length > 0) {
    Tabs.push({
      settingsName: t('Blogs') + blogs?.length + ')',
      body: <BlogsTab blogs={blogs} />,
      size: blogs?.length,
      type: 'blog-list',
    });
  }

  Tabs.sort((a, b) => (a.size > b.size ? -1 : b.size > a.size ? 1 : 0));

  const go = (type) => {
    if (type === 'blog-list') {
      return history.push('/blog-list');
    } else {
      return history.push('/find?type=' + type + '&title=' + keyword);
    }
  };

  const results = Tabs?.map(
    (item, index) =>
      item.settingsName && (
        <Wrapper key={'wrapper' + index}>
          <Accordion.Item defaultOpen={index === 0}>
            <Accordion.Toggle>
              <SettingsRow pulse={item.pulse}>
                <Box col>
                  <Text color="dark" textAlign="left" fontWeight="500" p="12px">
                    {item.settingsName}
                  </Text>
                </Box>

                <div style={{ display: 'flex' }}>
                  {item?.size > 5 && (
                    <LinkText
                      onClick={() => {
                        go(item.type);
                      }}
                    >
                      {t('See All')}
                    </LinkText>
                  )}
                  <Svg.ArrowUpIcon />
                </div>
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
    <Main>
      <div style={{ marginTop: 0 }} className="basic-info">
        <Container className="content">
          <Text
            textAlign="start"
            fontSize="14pt"
            color="#00b2a9"
            style={{
              marginTop: 15,
              marginBottom: 15,
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            {t('Your search results')},
          </Text>
          {data && <GoogleMapClusterer data={data?.users?.data} />}

          <Accordion>{results}</Accordion>
        </Container>
      </div>
    </Main>
  );
};

export default HeaderSearchResults;

const Wrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  margin-bottom: 25px;
  padding: 5px;

  width: 100%;
  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

const LinkText = styled.text`
  cursor: pointer;
  font-weight: bold;
  margin-right: 15px;
  &:hover {
    color: var(--blue);
  }
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid transparent;
  border-bottom: ${(p) => p.isActive && `1px solid ${p.theme.colors.gray5}`};

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

const BodyWrapper = styled.div``;
