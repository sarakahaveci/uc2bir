import React from 'react';
// @ts-ignore
import { default as NativeFluidBanner } from "../../components/banner/fluid-banner";
import Title from '../../components/typography/title';
import Text from '../../components/typography/text';

// @ts-ignore
import backgroundImage from '../../statics/background/images/fluid-banner.jpg';
import { Container } from 'react-bootstrap';
import BgSoftButton from '../../components/buttons/bg-soft-button';

const FluidBanner = (props) => {
    return (
        <NativeFluidBanner className={props.className} backgroundImage={backgroundImage}>
            <Container>
                <Text textAlign="center" white>
                    <Title variant="h5" component="h5" style={{maxWidth: "50%", marginLeft: "auto", marginRight: "auto"}} lineDisable>İSTEDİĞİN EĞİTMEN İLE İSTEDİĞİN SALONDA HEMEN DERSLERE BAŞLA</Title>
                    <Text white textAlign="center">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation</Text>
                    <BgSoftButton text="REZERVAZYON YAP"/>
                </Text>
            </Container>
        </NativeFluidBanner>
    );
};

export default FluidBanner;