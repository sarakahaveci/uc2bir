/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../../components/Main';
import Banner from './Banner';
import TopPromotion from './TopPromotion';
import Categories from './Categories';
import PT from './PT';
import FluidBanner from './FluidBanner';
import FluidBannerBottom from './FluidBannerBottom';
import Living from './Living';
import Packet from './Packet';
import GroupLesson from './GroupLesson';
import Dietitians from './Dietitians';
import VKI from './VKI';
import Blog from './Blog';
import { getHomeContent, getHomeTags } from 'actions';

import Comments from './Comments';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeContent());
  }, []);

  return (
    <Main>
      <Banner />
      <Categories />
      <TopPromotion background />
      <PT />
      {isAuthenticated ? '' : <FluidBanner />}
      <Living />
      {process.env.REACT_APP_PACKAGE_ENABLE =='true' && <Packet />}
      <GroupLesson />
      <Dietitians />
      <VKI />
      <Blog />
      <Comments />
      {isAuthenticated ? '' : <FluidBannerBottom />}
    </Main>
  );
};

export default Home;
