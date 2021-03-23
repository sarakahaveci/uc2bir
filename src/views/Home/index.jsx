import React from 'react';
import Main from '../../components/Main';

import Banner from './Banner';
import Categories from './Categories';
import TopPromotion from './TopPromotion';
import PT from './PT';
import FluidBanner from './FluidBanner';
import FluidBannerBottom from './FluidBannerBottom';
import Living from './Living';
import Packet from './Packet';
import GroupLesson from './GroupLesson';
import Dietitians from './Dietitians';
import VKI from './VKI';
import Blog from './Blog';

const Home = () => {
	return (
		<Main>
			<Banner />
			<Categories />
			<TopPromotion background />
			<PT />
			<FluidBanner />
			<Living />
			<Packet />
			<GroupLesson />
			<Dietitians />
			<VKI />
			<Blog />
			{/* <Comments /> */}
			<FluidBannerBottom />
		</Main>
	)
}

export default Home
