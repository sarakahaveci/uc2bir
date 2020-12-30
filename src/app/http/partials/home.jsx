// @ts-nocheck
import React from 'react';

import Main from '../../../components/Main';
import Header from '../../../components/Header';
import Master from '../master';

/**
 * @param {{ children: React.ReactNode; }} props
 */
const Home = props => {
    return (
        <Master>
            <Main className="main">
                <pre>Header</pre>
                <Header/>
                <pre>Banner</pre>
                <pre>Category</pre>
                <pre>TopPromotion => extends VerticalSlider</pre>
                <pre>PT => extends SliderTexts, Slider</pre>
                <pre>FluidBanner => extends FluidText</pre>
                <pre>LivingSlider => extends SliderTexts, Slider</pre>
                <pre>PacketSlider => extends SliderTexts, CenterSlider</pre>
                <pre>GroupLessonSlider => extends SliderTexts, CenterSlider</pre>
                <pre>FluidExtendBanner => extends FluidText</pre>
                <pre>BlogBanner</pre>
                <pre>Comments</pre>
                <pre>FluidBanner => extends FluidText</pre>
                <pre>Footer</pre>
            </Main>
        </Master>
    )
};

export default Home;