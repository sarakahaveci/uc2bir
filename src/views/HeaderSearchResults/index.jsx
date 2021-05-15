// @ts-nocheck
import React from 'react';
import { Container } from 'react-bootstrap';
import Main from '../../components/Main';
import {
    Accordion,
    Text,
    Box,
    Svg, 
    pulse,
} from 'components';
import PackagesTab from '../../components/HeaderSearchResults/PackagesTab'
import PTTab from '../../components/HeaderSearchResults/PTTab'
import GymTab from '../../components/HeaderSearchResults/GymTab'
import DietitiansTab from '../../components/HeaderSearchResults/DietitiansTab'
import BlogsTab from '../../components/HeaderSearchResults/BlogsTab'

import styled, { css } from 'styled-components/macro';
/* images */
import img from '../../assets/info/banner/info-img.png';

const dummyData = {
    pts: [
        {
            city: "Isparta",
            classification: "A",
            distance: 0,
            district: "Gelendost",
            has_favorite_count: 0,
            lat: 42.37700,
            lat: -71.11666,
            name: "Cakir 2",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: null,
            user_id: 1395,
        },
        {
            city: "İstanbul",
            classification: "A",
            distance: 0,
            district: "Beşiktaş",
            has_favorite_count: 0,
            lat: 0,
            lat: 0,
            name: "Hüseyin Test",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Fitness Eğitmeni",
            user_id: 1388,
        },
        {
            city: "Ankara",
            classification: "A",
            distance: 0,
            district: "Çankaya",
            has_favorite_count: 0,
            lat: 39.92700,
            lat: 32.85666,
            name: "iosegitmen",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "eğitmen",
            user_id: 1450,
        },
        {
            city: "İstanbul",
            classification: "A",
            distance: 0,
            district: "Şişli",
            has_favorite_count: 0,
            lat: 41.37700,
            lat: 29.11666,
            name: "Ayşe Altın",
            photo: "https://file.321.4alabs.com/uploads/pt-points/images/fGRoJsatWOFwAqi9Ex1QUuK8ZT4mLlYD.JPEG",
            price: 100,
            rating: 0,
            srcset: null,
            title: "test",
            user_id: 1258,
        },
        {
            city: "Isparta",
            classification: "A",
            distance: 0,
            district: "Gelendost",
            has_favorite_count: 0,
            lat: 42.37700,
            lat: -71.11666,
            name: "Cakir 2",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: null,
            user_id: 1395,
        },
        {
            city: "İstanbul",
            classification: "A",
            distance: 0,
            district: "Beşiktaş",
            has_favorite_count: 0,
            lat: 0,
            lat: 0,
            name: "Hüseyin Test",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Fitness Eğitmeni",
            user_id: 1388,
        },
        {
            city: "Ankara",
            classification: "A",
            distance: 0,
            district: "Çankaya",
            has_favorite_count: 0,
            lat: 39.92700,
            lat: 32.85666,
            name: "iosegitmen",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "eğitmen",
            user_id: 1450,
        },
        {
            city: "İstanbul",
            classification: "A",
            distance: 0,
            district: "Şişli",
            has_favorite_count: 0,
            lat: 41.37700,
            lat: 29.11666,
            name: "Ayşe Altın",
            photo: "https://file.321.4alabs.com/uploads/pt-points/images/fGRoJsatWOFwAqi9Ex1QUuK8ZT4mLlYD.JPEG",
            price: 100,
            rating: 0,
            srcset: null,
            title: "test",
            user_id: 1258,
        },
    ],
    dts: [
        {
            city: "Isparta",
            distance: 0,
            district: "Gelendost",
            has_favorite_count: 0,
            lat: 42.37700,
            lat: -71.11666,
            name: "Deneme Cakir1",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: null,
            user_id: 1373,
        },
        {
            city: "Isparta",
            distance: 0,
            district: "Gelendost",
            has_favorite_count: 0,
            lat: 42.37700,
            lat: -71.11666,
            name: "Deneme Cakir1",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: null,
            user_id: 1373,
        },
        {
            city: "Isparta",
            distance: 0,
            district: "Gelendost",
            has_favorite_count: 0,
            lat: 42.37700,
            lat: -71.11666,
            name: "Deneme Cakir1",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: null,
            user_id: 1373,
        },
        {
            city: "Isparta",
            distance: 0,
            district: "Gelendost",
            has_favorite_count: 0,
            lat: 42.37700,
            lat: -71.11666,
            name: "Deneme Cakir1",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: null,
            user_id: 1373,
        },
        {
            city: "Isparta",
            distance: 0,
            district: "Gelendost",
            has_favorite_count: 0,
            lat: 42.37700,
            lat: -71.11666,
            name: "Deneme Cakir1",
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: null,
            user_id: 1373,
        },
    ],
    gyms: [
        {
            about: null,
            address_detail: "Atatürk, Yavuz Cd. No:36, 35030 Bornova",
            apt_no: "12",
            build_no: "2",
            city: "İzmir",
            distance: 0,
            district: "Bornova",
            has_favorite_count: 0,
            has_working_count: 0,
            lat: 38.47213321,
            lng: 27.20413321,
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Cord35",
            town: "Atatürk mah",
            user_id: 1264,
        },
        {
            about: null,
            address_detail: "Atatürk, Yavuz Cd. No:36, 35030 Bornova",
            apt_no: "12",
            build_no: "2",
            city: "İzmir",
            distance: 0,
            district: "Bornova",
            has_favorite_count: 0,
            has_working_count: 0,
            lat: 38.47213321,
            lng: 27.20413321,
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Cord35",
            town: "Atatürk mah",
            user_id: 1264,
        },
        {
            about: null,
            address_detail: "Atatürk, Yavuz Cd. No:36, 35030 Bornova",
            apt_no: "12",
            build_no: "2",
            city: "İzmir",
            distance: 0,
            district: "Bornova",
            has_favorite_count: 0,
            has_working_count: 0,
            lat: 38.47213321,
            lng: 27.20413321,
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Cord35",
            town: "Atatürk mah",
            user_id: 1264,
        },
        {
            about: null,
            address_detail: "Atatürk, Yavuz Cd. No:36, 35030 Bornova",
            apt_no: "12",
            build_no: "2",
            city: "İzmir",
            distance: 0,
            district: "Bornova",
            has_favorite_count: 0,
            has_working_count: 0,
            lat: 38.47213321,
            lng: 27.20413321,
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Cord35",
            town: "Atatürk mah",
            user_id: 1264,
        },
        {
            about: null,
            address_detail: "Atatürk, Yavuz Cd. No:36, 35030 Bornova",
            apt_no: "12",
            build_no: "2",
            city: "İzmir",
            distance: 0,
            district: "Bornova",
            has_favorite_count: 0,
            has_working_count: 0,
            lat: 38.47213321,
            lng: 27.20413321,
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Cord35",
            town: "Atatürk mah",
            user_id: 1264,
        }, {
            about: null,
            address_detail: "Atatürk, Yavuz Cd. No:36, 35030 Bornova",
            apt_no: "12",
            build_no: "2",
            city: "İzmir",
            distance: 0,
            district: "Bornova",
            has_favorite_count: 0,
            has_working_count: 0,
            lat: 38.47213321,
            lng: 27.20413321,
            photo: null,
            price: 0,
            rating: 0,
            srcset: null,
            title: "Cord35",
            town: "Atatürk mah",
            user_id: 1264,
        },
    ],
    packages: [
        {
            branch: "Fitness",
            branch_id: 1,
            detail: "Kas görünümü oranını arttırmak isteyen üyelere,  Vücutta sarkma şikayeti olup sıkılaşma talebi olan üyelere, veya hacim kazanmayı hedefleyen üyelere yönelik hazırlanmıştır.",
            id: 5,
            lesson_amount: 10,
            name: "Fit Ol",
            photo: "",
            price: 80,
            price_a: 120,
            price_b: 100,
            price_c: 80,
            srcset: "",
        },
        {
            branch: "Fitness",
            branch_id: 1,
            detail: "Kas görünümü oranını arttırmak isteyen üyelere,  Vücutta sarkma şikayeti olup sıkılaşma talebi olan üyelere, veya hacim kazanmayı hedefleyen üyelere yönelik hazırlanmıştır.",
            id: 5,
            lesson_amount: 10,
            name: "Fit Ol",
            photo: "",
            price: 80,
            price_a: 120,
            price_b: 100,
            price_c: 80,
            srcset: "",
        },
        {
            branch: "Fitness",
            branch_id: 1,
            detail: "Kas görünümü oranını arttırmak isteyen üyelere,  Vücutta sarkma şikayeti olup sıkılaşma talebi olan üyelere, veya hacim kazanmayı hedefleyen üyelere yönelik hazırlanmıştır.",
            id: 5,
            lesson_amount: 10,
            name: "Fit Ol",
            photo: "",
            price: 80,
            price_a: 120,
            price_b: 100,
            price_c: 80,
            srcset: "",
        },
    ],
    blogs: [
        {
            category: "Blog",
            category_id: 1,
            created_at: "13.05.2021 14:24",
            detail: "merhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100...",
            id: 126,
            photo: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav.jpg",
            seo_friendly_url: "zaman-geciyor-calisalim",
            srcset: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-192.jpg 192w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-384.jpg 384w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-768.jpg 768w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1152.jpg 1152w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1920.jpg 1920w",
            status: "active",
            title: "zaman geçiyor çalışalım",
        }, {
            category: "Blog",
            category_id: 1,
            created_at: "13.05.2021 14:24",
            detail: "merhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100...",
            id: 126,
            photo: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav.jpg",
            seo_friendly_url: "zaman-geciyor-calisalim",
            srcset: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-192.jpg 192w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-384.jpg 384w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-768.jpg 768w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1152.jpg 1152w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1920.jpg 1920w",
            status: "active",
            title: "zaman geçiyor çalışalım",
        },
        {
            category: "Blog",
            category_id: 1,
            created_at: "13.05.2021 14:24",
            detail: "merhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100...",
            id: 126,
            photo: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav.jpg",
            seo_friendly_url: "zaman-geciyor-calisalim",
            srcset: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-192.jpg 192w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-384.jpg 384w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-768.jpg 768w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1152.jpg 1152w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1920.jpg 1920w",
            status: "active",
            title: "zaman geçiyor çalışalım",
        },
        {
            category: "Blog",
            category_id: 1,
            created_at: "13.05.2021 14:24",
            detail: "merhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100...",
            id: 126,
            photo: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav.jpg",
            seo_friendly_url: "zaman-geciyor-calisalim",
            srcset: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-192.jpg 192w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-384.jpg 384w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-768.jpg 768w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1152.jpg 1152w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1920.jpg 1920w",
            status: "active",
            title: "zaman geçiyor çalışalım",
        },
        {
            category: "Blog",
            category_id: 1,
            created_at: "13.05.2021 14:24",
            detail: "merhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100 karakter gireceğiz. hgdyuhgff jhgyhjhjkouyh kougfreruuhh hfdddrıokn jgfddeerdfrfmerhaba 100...",
            id: 126,
            photo: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav.jpg",
            seo_friendly_url: "zaman-geciyor-calisalim",
            srcset: "https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-192.jpg 192w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-384.jpg 384w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-768.jpg 768w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1152.jpg 1152w,https://file.321.4alabs.com/uploads/pt-points/images/qoXrdyVWu47kc6EnxD3l0QLgCARIiUav-1920.jpg 1920w",
            status: "active",
            title: "zaman geçiyor çalışalım",
        },

    ]
}

const Tabs = [
    {
        settingsName: 'Eğitmenler (' + dummyData.pts.length + ')',
        body: <PTTab pts={dummyData.pts} />,
    },
    {
        settingsName: 'Spor Salonları (' + dummyData.gyms.length + ')',
        body: <GymTab gyms={dummyData.gyms} />,
    },
    {
        settingsName: 'Diyetisyenler (' + dummyData.dts.length + ')',
        body: <DietitiansTab dts={dummyData.dts} />,
    },
    {
        settingsName: 'Paketler (' + dummyData.packages.length + ')',
        body: <PackagesTab packages={dummyData.packages} />,
    }, ,
    {
        settingsName: 'Bloglar (' + dummyData.blogs.length + ')',
        body: <BlogsTab blogs={dummyData.blogs} />,
    },
];


const HeaderSearchResults = () => {

    const results = Tabs?.map((item, index) => (
        <Wrapper key={'wrapper' + index}>
            <Accordion.Item>
                <Accordion.Toggle>
                    <SettingsRow pulse={item.pulse}>
                        <Box col>
                            <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                                {item.settingsName}
                            </Text>
                        </Box>
                        <Svg.ArrowUpIcon />
                    </SettingsRow>
                </Accordion.Toggle>
                <Accordion.Collapse>
                    <BodyWrapper>{item.body}</BodyWrapper>
                </Accordion.Collapse>
            </Accordion.Item>
        </Wrapper>
    )); 
    return (
        <Main>
            <div style={{ marginTop: 0 }} className="basic-info">
                <div className="starter">
                    <img src={img} alt="" />
                </div>
                <Container className="content">
                    <Text
                        textAlign="start"
                        fontSize="14pt"
                        color="#00b2a9"
                        style={{
                            marginTop: 15,
                            marginBottom: 15,
                            paddingLeft: 30,
                            paddingRight: 30,
                        }}
                    >
                        xxx için arama sonuçlarınız,
            </Text>
                    <Accordion>{results}</Accordion>
                </Container>
            </div>
        </Main>
    );
};

export default HeaderSearchResults;

const Wrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  margin-bottom: 25px;

  width: 100%;
  @media (max-width: 768px) {
    margin-left: 10px; 
  }
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid transparent;
  border-bottom: ${(p) => p.isActive && `1px solid ${p.theme.colors.gray5}`};
  

  ${(p) =>
        p.pulse &&
        css`
      animation: pulse 1s;
      animation-iteration-count: 2;
      border-radius: 20px;
      ${pulse}
    `}

  svg {
    transition: all 0.5s;
    transform: ${(p) => p.isActive && 'rotate(180deg)'};
  }
`;

const BodyWrapper = styled.div`
  
`;
