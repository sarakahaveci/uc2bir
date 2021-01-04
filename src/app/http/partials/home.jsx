// @ts-nocheck
import React from 'react';

import Main from '../../../components/Main';
import Header from '../../../components/Header';
import Master from '../master';
import Root from '../../middleware/Root';
import Banner from '../../../components/sliders/Banner';
import { Container } from 'react-bootstrap';
import Categories from '../../middleware/Categories';
import TopPromotion from '../../middleware/TopPromotion';
import PT from '../../middleware/PT';

/**
 * @param {{ children: React.ReactNode; }} props
 */
const Home = props => {
    return (
        <Master>
            <Main className="main">
                <Header />
                <Root>
                    <Banner/>
                    <Categories/>
                    <TopPromotion background/>
                    <PT/>
                    <Container>
                        <pre>FluidBanner => extends FluidText</pre>
                        <pre>LivingSlider => extends SliderTexts, Slider</pre>
                        <pre>PacketSlider => extends SliderTexts, CenterSlider</pre>
                        <pre>GroupLessonSlider => extends SliderTexts, CenterSlider</pre>
                        <pre>FluidExtendBanner => extends FluidText</pre>
                        <pre>BlogBanner</pre>
                        <pre>Comments</pre>
                        <pre>FluidBanner => extends FluidText</pre>
                        <pre>Footer</pre>
                    </Container>
                </Root>
            </Main>
        </Master>
    )
};

export default Home;