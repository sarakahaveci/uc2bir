// @ts-nocheck
import React from 'react';

import Main from '../../../components/Main';
import Master from '../master';
import Root from '../../middleware/Root';
import Banner from '../../../components/sliders/Banner';
import Categories from '../../middleware/Categories';
import TopPromotion from '../../middleware/TopPromotion';
import PT from '../../middleware/PT';
import FluidBanner from '../../middleware/FluidBanner';
import FluidBannerBottom from '../../middleware/FluidBannerBottom';
import Living from '../../middleware/Living';
import Packet from '../../middleware/Packet';
import GroupLesson from '../../middleware/GroupLesson';
import Dietitians from '../../middleware/Dietitians';
import VKI from '../../middleware/VKI';
import Blog from '../../middleware/Blog';
import Comments from '../../middleware/Comments';

/**
 * @param {{ children: React.ReactNode; }} props
 */
const Home = props => {
    return (
        <Master>
            <Main className="main">
                <Root>
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
                </Root>
            </Main>
        </Master>
    )
};
  
export default Home;