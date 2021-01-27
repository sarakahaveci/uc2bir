import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/title';
import Text from '../../components/typography/text';
import SliderFocus from '../../components/sliders/SliderFocus';

const Dietitians = (props) => {
    return (
        <section className={`pt ${props.className}`}>
            <Container>
                <Title variant="h3" component="h3">
                    DİYETİSYENLER
                </Title>
                <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
                    SANA UYGUN DİYET PROGRAMINI, SANA ÖZEL DİYETİSYENLERLE BELİRLE
                </Title>
            </Container>
            <SliderFocus/>
        </section>
    );
};

export default Dietitians;