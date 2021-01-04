import React from 'react';
import Button from '../../components/buttons/button';
import AsNavFor from '../../components/sliders/AsNavFor';
import Text from '../../components/typography/Text';
import Title from '../../components/typography/title';

const TopPromotion = (props) => {
    return (
        <section className={`top-promotion ${props.className}`}>
            <div className="row">
                <div className="col-lg-6">
                    <Title variant="h3" component="h3" lineDisable textLeft>..VE YENİ BİR SEN</Title>
                    <Title fontWeight="normal" variant="h4" component="h4" textLeft>Salon VE/Veya Pt Video Alanı</Title>
                    <Text blue>Your body hears everything that your mind says. You have to have a positive attitude if you want to achieve your goals.</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo cons  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui….
                        <br/>
                        <Button className="p-0" variant="link" text="İNCELE"/>
                    </Text>
                </div>
                <div className="col-lg-6 d-flex">
                    <AsNavFor/>
                </div>
            </div>
            {props.children}
        </section>
    );
};

export default TopPromotion;