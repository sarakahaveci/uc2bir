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
import PtPackagesTab from '../../components/HeaderSearchResults/PtPackagesTab'
import DtPackagesTab from '../../components/HeaderSearchResults/DtPackagesTab'
import PTTab from '../../components/HeaderSearchResults/PTTab'
import GymTab from '../../components/HeaderSearchResults/GymTab'
import DietitiansTab from '../../components/HeaderSearchResults/DietitiansTab'
import BlogsTab from '../../components/HeaderSearchResults/BlogsTab'
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components/macro';
/* images */
import img from '../../assets/info/banner/info-img.png';


const HeaderSearchResults = () => {
    const data = useSelector((state) => state.searchResults.data);
    const pts = data?.pt;
    const dts = data?.dt;
    const gyms = data?.gym;
    const ptPackages = data?.pt_package;
    const dtPackages = data?.dt_package;
    const blogs = data?.blog;

    const Tabs = [
        {
            settingsName: 'Eğitmenler (' + pts?.length + ')',
            body: <PTTab pts={pts} />,
        },
        {
            settingsName: 'Spor Salonları (' + gyms?.length + ')',
            body: <GymTab gyms={gyms} />,
        },
        {
            settingsName: 'Diyetisyenler (' + dts?.length + ')',
            body: <DietitiansTab dts={dts} />,
        },
        {
            settingsName: 'Eğitmen Paketleri (' + ptPackages?.length + ')',
            body: <PtPackagesTab packages={ptPackages} />,
        },
        {
            settingsName: 'Diyetisyen Paketleri (' + dtPackages?.length + ')',
            body: <DtPackagesTab packages={dtPackages} />,
        },
        {
            settingsName: 'Bloglar (' + blogs?.length + ')',
            body: <BlogsTab blogs={blogs} />,
        },
    ];

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
                        Arama sonuçlarınız,
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
