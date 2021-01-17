// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { default as SlickSlider } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import p1 from "../../images/slider/p1.jpg";
import p2 from "../../images/slider/p2.jpg";
import Title from '../typography/title';
import AwesomeIcon from '../../statics/icon';
import LineButton from '../buttons/line-button';

function PacketSlider(props) {
    let slider;

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 7500,
        speed: 2000,
        pauseOnHover: false,

        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className={`packet-slider ${props.className}`}>
            <Container>
                <div className="slick-slider-buttons">
                    <a className="slick-button next" onClick={() => slider.slickNext()}><AwesomeIcon.Next /></a>
                    <a className="slick-button prev" onClick={() => slider.slickPrev()}><AwesomeIcon.Prev /></a>
                </div>
                <div className="packet-category">
                    <ul>
                        <li className="active"><a href="#">Hepsi</a></li>
                        <li><a href="#">PT Paketleri</a></li>
                        <li><a href="#">Diyetisyenler</a></li>
                    </ul>
                </div>
            </Container>
            <Container fluid>
                <div className="sliders">
                    <SlickSlider ref={c => (slider = c)} {...settings}>
                        <div className="slider-item">
                            <div className="slider-item-content">
                                <div className="img-item">
                                    <div className="img" style={{ backgroundImage: `url(${p1})` }}>
                                        <div className="team">A</div>
                                        <ul className="points">
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li><AwesomeIcon.StarSolid /></li>
                                        </ul>
                                    </div>
                                    <div className="info"><Title lineDisable fontWeight="ligher">GELİN PAKETİ</Title></div>
                                </div>
                                <div className="text-item">
                                    <Title lineDisable fontWeight="bold">30 Günde 8 Kilo Verin</Title>
                                    <div className="row info">
                                        <div className="col">
                                            <ul>
                                                <li>1. Paket İçeriği...</li>
                                                <li>2. Paket İçeriği...</li>
                                            </ul>
                                        </div>
                                        <div className="col-auto">
                                            <span>200 <AwesomeIcon.Tl /> / 30 Gün</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item">
                            <div className="slider-item-content">
                                <div className="img-item">
                                    <div className="img" style={{ backgroundImage: `url(${p2})` }}>
                                        <div className="team">C</div>
                                        <ul className="points">
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li><AwesomeIcon.StarSolid /></li>
                                        </ul>
                                    </div>
                                    <div className="info"><Title lineDisable fontWeight="ligher">ZAYIFLAMA PAKETİ</Title></div>
                                </div>
                                <div className="text-item">
                                    <Title lineDisable fontWeight="bold">30 Günde 8 Kilo Verin</Title>
                                    <div className="row info">
                                        <div className="col">
                                            <ul>
                                                <li>1. Paket İçeriği...</li>
                                                <li>2. Paket İçeriği...</li>
                                            </ul>
                                        </div>
                                        <div className="col-auto">
                                            <span>200 <AwesomeIcon.Tl /> / 30 Gün</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item">
                            <div className="slider-item-content">
                                <div className="img-item">
                                    <div className="img" style={{ backgroundImage: `url(${p1})` }}>
                                        <div className="team">B</div>
                                        <ul className="points">
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li><AwesomeIcon.StarSolid /></li>
                                        </ul>
                                    </div>
                                    <div className="info"><Title lineDisable fontWeight="ligher">GELİN PAKETİ</Title></div>
                                </div>
                                <div className="text-item">
                                    <Title lineDisable fontWeight="bold">30 Günde 8 Kilo Verin</Title>
                                    <div className="row info">
                                        <div className="col">
                                            <ul>
                                                <li>1. Paket İçeriği...</li>
                                                <li>2. Paket İçeriği...</li>
                                            </ul>
                                        </div>
                                        <div className="col-auto">
                                            <span>200 <AwesomeIcon.Tl /> / 30 Gün</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item">
                            <div className="slider-item-content">
                                <div className="img-item">
                                    <div className="img" style={{ backgroundImage: `url(${p2})` }}>
                                        <div className="team">E</div>
                                        <ul className="points">
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li><AwesomeIcon.StarSolid /></li>
                                        </ul>
                                    </div>
                                    <div className="info"><Title lineDisable fontWeight="ligher">GELİN PAKETİ</Title></div>
                                </div>
                                <div className="text-item">
                                    <Title lineDisable fontWeight="bold">30 Günde 8 Kilo Verin</Title>
                                    <div className="row info">
                                        <div className="col">
                                            <ul>
                                                <li>1. Paket İçeriği...</li>
                                                <li>2. Paket İçeriği...</li>
                                            </ul>
                                        </div>
                                        <div className="col-auto">
                                            <span>200 <AwesomeIcon.Tl /> / 30 Gün</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item">
                            <div className="slider-item-content">
                                <div className="img-item">
                                    <div className="img" style={{ backgroundImage: `url(${p1})` }}>
                                        <div className="team">G</div>
                                        <ul className="points">
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li className="active"><AwesomeIcon.StarSolid /></li>
                                            <li><AwesomeIcon.StarSolid /></li>
                                        </ul>
                                    </div>
                                    <div className="info"><Title lineDisable fontWeight="ligher">KAS YAPMA PAKETİ</Title></div>
                                </div>
                                <div className="text-item">
                                    <Title lineDisable fontWeight="bold">30 Günde 8 Kilo Verin</Title>
                                    <div className="row info">
                                        <div className="col">
                                            <ul>
                                                <li>1. Paket İçeriği...</li>
                                                <li>2. Paket İçeriği...</li>
                                            </ul>
                                        </div>
                                        <div className="col-auto">
                                            <span>200 <AwesomeIcon.Tl /> / 30 Gün</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlickSlider>
                </div>
            </Container>
            <Container>
                <div className="row">
                    <div style={{ marginTop: "45px" }} className="col d-flex justify-content-center">
                        <LineButton text="Tümünü Gör" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default PacketSlider;