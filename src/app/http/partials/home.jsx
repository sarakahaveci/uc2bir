// @ts-nocheck
import React from 'react';

import Layout from '../layout';
import Main from '../../../components/Main';
import SubPages from '../../sub-page/SubPages';

import Banner from '../../../components/sliders/Banner';

import Categories from '../../sub-page/home/Categories';
import TopPromotion from '../../sub-page/home/TopPromotion';
import PT from '../../sub-page/home/PT';
import FluidBanner from '../../sub-page/home/FluidBanner';
import FluidBannerBottom from '../../sub-page/home/FluidBannerBottom';
import Living from '../../sub-page/home/Living';
import Packet from '../../sub-page/home/Packet';
import GroupLesson from '../../sub-page/home/GroupLesson';
import Dietitians from '../../sub-page/home/Dietitians';
import VKI from '../../sub-page/home/VKI';
import Blog from '../../sub-page/home/Blog';
import Comments from '../../sub-page/home/Comments';

/**
 * @param {{ children: React.ReactNode; }} props
 */
const Home = props => {
    return (
        <Layout>
            <Main className="main">
                <SubPages>
                    <Banner/>
                    <Categories/>
                    <TopPromotion background/>
                    <PT/>
                    <FluidBanner/>
                    <Living/>
                    <Packet/>
                    <GroupLesson/>
                    <Dietitians/>
                    <VKI/>
                    <Blog/>
                    <Comments/>
                    <FluidBannerBottom/>
                </SubPages>
            </Main>
        </Layout>
    )
};
  
export default Home;