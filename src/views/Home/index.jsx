/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
import { getHomeContent } from 'actions';

const Home = () => {
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
      <FluidBanner />
      <Living />
      <Packet />
      {/*  <GroupLesson /> */}
      <Dietitians />
      <VKI />
      <Blog />
      {/* <Comments /> */}
      <FluidBannerBottom />
    </Main>
  );
};

export default Home;
