// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/title';
import Text from '../../components/typography/text';
import SliderFocus from '../../components/sliders/SliderFocus';

const PT = (props) => {
    return (
        <section className={`pt ${props.className}`}>
            <Container>
                <Title variant="h3" component="h3">
                    EĞİTMENLER
                </Title>
                <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
                    EN İYİ EĞİTMENLER İLE ÇALIŞMA FIRSATI
                </Title>
            </Container>
            <SliderFocus/>
        </section>
    );
};

export default PT;