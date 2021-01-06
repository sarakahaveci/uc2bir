import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/title';
import Text from '../../components/typography/text';
import PacketSlider from '../../components/sliders/PacketSlider';

const Packet = (props) => {
    return (
        <section className={`pt ${props.className}`}>
            <Container>
                <Title variant="h3" component="h3">
                    PAKETLER
                </Title>
                <Title variant="h5" component="h5" fontWeight="lighter" lineDisable>
                    SANA UYGUN OLAN PAKETİ SEÇ, HEMEN ÇALIŞMAYA BAŞLA
                </Title>
                <Text textAlign="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                </Text>
            </Container>
            <PacketSlider/>
        </section>
    );
};

export default Packet;