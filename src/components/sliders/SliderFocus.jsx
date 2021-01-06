// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/title';
import Text from '../../components/typography/text';

import { default as SlickSlider } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AwesomeIcon from '../../statics/icon';
import Button from '../../components/buttons/button';
import IconLabel from '../../components/buttons/icon-label';

import efe from "../../images/slider/04.jpg";
import hazal from "../../images/slider/05.jpg";

const SliderFocus = (props) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    let slider1;
    let slider2;

    useLayoutEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, []);

    return (
        <>
            <div className={`slider-focus ${props.className}`}>
                <div className="slick-slider-buttons">
                    <a className="slick-button next" onClick={() => slider1.slickNext()}><AwesomeIcon.Next/></a>
                </div>
                <Container>
                    <div className="row">
                        <div className="col-4 left">
                            <div className="slick-slider-buttons">
                                <a className="slick-button prev" onClick={() => slider1.slickPrev()}><AwesomeIcon.Prev/></a>
                            </div>
                            <SlickSlider
                                asNavFor={nav2}
                                ref={slider => (slider1 = slider)}
                            >
                                <div className="slider-item">
                                    <div className="slider-item-content">
                                        <Title textLeft lineDisable variant="h5" component="h5" children="Efe PARLAK" />
                                        <Title lineDisable fontWeight="lighter" textLeft variant="h6" component="h6" children="Fitnes Eğitmeni" />
                                        <Title textLeft variant="h4" component="h4"><span>300 <AwesomeIcon.Tl /></span></Title>
                                        <Text fontWeight="lighter" fontSize="10pt">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla pariatur.
                                            </Text>
                                        <ul className="row">
                                            <li><Button text="Meditasyon" /></li>
                                            <li><Button text="Plates" /></li>
                                            <li><Button text="Fitnes" /></li>
                                        </ul>
                                        <div style={{ width: "100%", margin: "15px 0" }}>
                                            <IconLabel text="İstanbul, Beşiktaş" icon={AwesomeIcon.Map} />
                                        </div>
                                    </div>
                                </div>
                                <div className="slider-item">
                                    <div className="slider-item-content">
                                        <Title textLeft lineDisable variant="h5" component="h5" children="Hazal PARLAK" />
                                        <Title lineDisable fontWeight="lighter" textLeft variant="h6" component="h6" children="Fitnes Eğitmeni" />
                                        <Title textLeft variant="h4" component="h4"><span>300 <AwesomeIcon.Tl /></span></Title>
                                        <Text fontWeight="lighter" fontSize="10pt">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla pariatur.
                                            </Text>
                                        <ul className="row">
                                            <li><Button text="Meditasyon" /></li>
                                            <li><Button text="Plates" /></li>
                                            <li><Button text="Fitnes" /></li>
                                        </ul>
                                        <div style={{ width: "100%", margin: "15px 0" }}>
                                            <IconLabel text="İstanbul, Beşiktaş" icon={AwesomeIcon.Map} />
                                        </div>
                                    </div>
                                </div>
                                <div className="slider-item">
                                    <div className="slider-item-content">
                                        <Title textLeft lineDisable variant="h5" component="h5" children="Efe PARLAK" />
                                        <Title lineDisable fontWeight="lighter" textLeft variant="h6" component="h6" children="Fitnes Eğitmeni" />
                                        <Title textLeft variant="h4" component="h4"><span>300 <AwesomeIcon.Tl /></span></Title>
                                        <Text fontWeight="lighter" fontSize="10pt">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla pariatur.
                                            </Text>
                                        <ul className="row">
                                            <li><Button text="Meditasyon" /></li>
                                            <li><Button text="Plates" /></li>
                                            <li><Button text="Fitnes" /></li>
                                        </ul>
                                        <div style={{ width: "100%", margin: "15px 0" }}>
                                            <IconLabel text="İstanbul, Beşiktaş" icon={AwesomeIcon.Map} />
                                        </div>
                                    </div>
                                </div>
                                <div className="slider-item">
                                    <div className="slider-item-content">
                                        <Title textLeft lineDisable variant="h5" component="h5" children="Hazal PARLAK" />
                                        <Title lineDisable fontWeight="lighter" textLeft variant="h6" component="h6" children="Fitnes Eğitmeni" />
                                        <Title textLeft variant="h4" component="h4"><span>300 <AwesomeIcon.Tl /></span></Title>
                                        <Text fontWeight="lighter" fontSize="10pt">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla pariatur.
                                            </Text>
                                        <ul className="row">
                                            <li><Button text="Meditasyon" /></li>
                                            <li><Button text="Plates" /></li>
                                            <li><Button text="Fitnes" /></li>
                                        </ul>
                                        <div style={{ width: "100%", margin: "15px 0" }}>
                                            <IconLabel text="İstanbul, Beşiktaş" icon={AwesomeIcon.Map} />
                                        </div>
                                    </div>
                                </div>
                            </SlickSlider>
                        </div>
                        <div className="col right">
                            <div className="item-right">
                                <SlickSlider
                                    asNavFor={nav1}
                                    ref={slider => (slider2 = slider)}
                                    slidesToShow={3}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                >
                                    <div className="slider-item">
                                        <div className="img" style={{ backgroundImage: `url(${efe})` }}>
                                            <ul className="points">
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                            </ul>
                                            <div className="team">A</div>
                                        </div>
                                    </div>
                                    <div className="slider-item">
                                        <div className="img item-two" style={{ backgroundImage: `url(${hazal})` }}>
                                            <ul className="points">
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                            </ul>
                                            <div className="team">C</div>
                                        </div>
                                    </div>
                                    <div className="slider-item">
                                        <div className="img item-three" style={{ backgroundImage: `url(${efe})` }}>
                                            <ul className="points">
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                            </ul>
                                            <div className="team">A</div>
                                        </div>
                                    </div>
                                    <div className="slider-item">
                                        <div className="img item-three" style={{ backgroundImage: `url(${hazal})` }}>
                                            <ul className="points">
                                                <li className="active"><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                                <li><AwesomeIcon.StarSolid /></li>
                                            </ul>
                                            <div className="team">D</div>
                                        </div>
                                    </div>
                                </SlickSlider>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Button text="Tümün Gör" blue />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SliderFocus;