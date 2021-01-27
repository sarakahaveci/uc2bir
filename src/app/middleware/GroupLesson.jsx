import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/title';
import Text from '../../components/typography/text';
import PacketSlider from '../../components/sliders/PacketSlider';

const GroupLesson = (props) => {
    return (
        <section className={`pt ${props.className}`}>
            <Container>
                <Title variant="h3" component="h3">
                    GRUP DERSLERİ
                </Title>
                <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
                    ARKADAŞLARINLA BERABER, İSTEDİĞİN SALONDA, İSTEDİĞİN EĞİTMENDEN DERS ALMA FIRSATI
                </Title>
            </Container>
            <PacketSlider/>
        </section>
    );
};

export default GroupLesson;