/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../../components/Main';
const Banner = React.lazy(() => import('./Banner'))
const TopPromotion = React.lazy(() => import('./TopPromotion'))
const Categories = React.lazy(() => import('./Categories'))
const PT = React.lazy(() => import('./PT'))
const FluidBanner = React.lazy(() => import('./FluidBanner'))
const FluidBannerBottom = React.lazy(() => import('./FluidBannerBottom'))
const Living = React.lazy(() => import('./Living'))
const Packet = React.lazy(() => import('./Packet'))
const GroupLesson = React.lazy(() => import('./GroupLesson'))
const Dietitians = React.lazy(() => import('./Dietitians'))
const VKI = React.lazy(() => import('./VKI'))
const Blog = React.lazy(() => import('./Blog'))

import { getHomeContent, getHomeTags } from 'actions';

import Comments from './Comments';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  function _fallback(){ 
    return (<div></div>)
  }
  useEffect(() => {
    dispatch(getHomeContent());
  }, []);

  return (
    <Main>
      <Suspense fallback={_fallback()}>
        <Banner />
      </Suspense>
      <Suspense fallback={_fallback()}>
      <Categories />
      </Suspense>
      <Suspense fallback={_fallback()}>
        <TopPromotion background  />
      </Suspense>
      <Suspense fallback={_fallback()}>
        <PT />
      </Suspense>

      {isAuthenticated ? '' :

        <Suspense fallback={_fallback()}>
          <FluidBanner />
        </Suspense>
      }
      <Suspense fallback={_fallback()}>
        <Living />
      </Suspense>
      <Suspense fallback={_fallback()}>
        <Packet />
      </Suspense>
      <Suspense fallback={_fallback()}>
        <GroupLesson />
      </Suspense>
      <Suspense fallback={_fallback()}>
        <Dietitians />
      </Suspense>
      <Suspense fallback={_fallback()}>
        <VKI />
      </Suspense>
      <Suspense fallback={_fallback()}>
        <Blog />

      </Suspense>
      <Suspense fallback={_fallback()}>
        <Comments />

      </Suspense>
      {isAuthenticated ? '' :
        <Suspense fallback={_fallback()}>
          <FluidBannerBottom />
        </Suspense>
      }
    </Main>
  );
};

export default Home;
