// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react';

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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from '../../../redux/reducers/login';

import FormData from 'form-data';

/**
 * @param {{ children: React.ReactNode; }} props
 */
const Home = props => {
    const { loginReducers, login } = props;
    const data = new FormData();

    data.append('email', 'omer_dogan@outlook.com');
    data.append('password', '123456');

    useEffect(() => {
        login(data);
    }, []);

    return (
        <Master>
            {loginReducers.isSuccess && !loginReducers.loading && loginReducers.error && alert(loginReducers.error)}
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

const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      ...bindActionCreators({ login }, dispatch),
    }
}
  
const mapStateToProps = ({ loginReducers }) => ({ loginReducers })
  
export default connect(mapStateToProps, mapDispatchToProps)(Home)