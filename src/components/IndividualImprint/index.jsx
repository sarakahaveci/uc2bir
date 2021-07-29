import React from 'react';
import styled, { css } from 'styled-components/macro';

import {
    Accordion,
    Text,
    Box,
    Svg,
    pulse,
} from 'components';

import { Link } from 'react-router-dom'
export default function IndividualImprint({ userInfo }) {




    const regularTabs = [
        {
            settingsName: 'Boy & Ağırlık & VKİ Bilgileri',
            body: <SomeInfoContainer>
                <div className="some-info" >
                    {userInfo?.age && userInfo?.height && userInfo?.weight && userInfo?.vki ?
                        <div style={{ display: "flex", flexDirection: "row", width: '100%', justifyContent: "space-evenly" }} >
                            <span style={{ margin: 10 }}>Yaş: <span style={{ color: "var(--blue)" }}>{userInfo?.age}</span></span>
                            <br />
                            <span style={{ margin: 10 }}>Boy: <span style={{ color: "var(--blue)" }}>{userInfo?.height}cm</span></span>
                            <br />
                            <span style={{ margin: 10 }}>Kilo: <span style={{ color: "var(--blue)" }}>{userInfo?.weight}kg</span></span>
                            <br />
                            <span style={{ margin: 10 }}>VKİ: <span style={{ color: "var(--blue)" }}>{userInfo?.vki}</span></span>
                        </div>
                        :
                        <span style={{ width: "100%", color: "var(--blue)", fontWeight: 500 }} >Boy kilo bilgisi gösterilememektedir.</span>
                    }
                </div>
            </SomeInfoContainer>,
        },
        {
            settingsName: 'Tamamlanmış Testler',
            body: <PARQContainer>
                {userInfo?.parq?.length > 0 ?
                    (userInfo?.parq?.map((item, key) => {
                        return (
                            <PARQCard key={key}>
                                <span className="name" >{item?.title}</span>
                                <span className="count" >{item?.answer}</span>
                            </PARQCard>
                        )
                    }))
                    :
                    <span style={{ width: "100%", textAlign: "center", margin: 10, color: "var(--blue)", fontWeight: 500 }} >Henüz bu kullanıcı PARQ testini çözmemiş durumdadır.</span>
                }
            </PARQContainer>,
        },
        {
            settingsName: 'Tamamlanan Dersler',
            body: <Appointments>
                {userInfo?.appointments?.counts?.branches?.length > 0 ?
                    <>
                        <div className="static-heads">
                            <span className="head">Branş</span>
                            <span className="head">Tamamlanan Ders Sayısı</span>
                        </div>
                        {userInfo?.appointments?.counts?.branches?.map((item, key) => {
                            return (
                                <AppointCard key={key}>
                                    <span className="name" >{item?.name}</span>
                                    <span className="count" >{item?.count}</span>
                                </AppointCard>
                            )
                        })}
                    </>
                    :
                    <span style={{ width: "100%", textAlign: "center", margin: 10, color: "var(--blue)", fontWeight: 500 }} >Henüz bu kullanıcı 321 sisteminde hiç ders tamamlamamıştır.</span>
                }
            </Appointments>,
        },
    ];

    let tabData = regularTabs;


    const settings = tabData?.map((item, index) => (
        item.route ? <Link style={{ color: 'black' }} to={item?.route}>
            <ButtonWrapper>
                <SettingsRow pulse={item.pulse}>
                    <Box col>
                        <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                            {item.settingsName}
                        </Text>
                    </Box>

                    <Svg.ArrowRightIcon />
                </SettingsRow>
            </ButtonWrapper>             </Link>
            : <Wrapper key={'wrapper' + index}>
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
        <div>

            <>
                <Accordion>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                        {settings}
                    </div>
                </Accordion>


            </>


            {/* <SomeInfoContainer>
                <div className="some-info" >
                    {userInfo?.age &&
                        <span >Yaş: <span style={{ color: "var(--blue)" }}>{userInfo?.age}</span></span>
                    }
                    {userInfo?.height &&
                        <span >Boy: <span style={{ color: "var(--blue)" }}>{userInfo?.height}cm</span></span>
                    }
                    {userInfo?.weight &&
                        <span >Kilo: <span style={{ color: "var(--blue)" }}>{userInfo?.weight}kg</span></span>
                    }
                    {userInfo?.vki &&
                        <span >VKİ: <span style={{ color: "var(--blue)" }}>{userInfo?.vki}</span></span>
                    }
                </div>
            </SomeInfoContainer>
            <HeadContainer  >
                <Head choosenHead={choosenHead == 0} onClick={() => { changeHead(0) }} className="head">GEÇMİŞ RANDEVULAR</Head>
                <Head choosenHead={choosenHead == 1} onClick={() => { changeHead(1) }} className="head">PARQ TESTİ</Head>
            </HeadContainer> */}
            {/* {choosenHead == 0 &&
                <Appointments>
                    {userInfo?.appointments?.counts?.branches?.length > 0 ?
                        <>
                            <div className="static-heads">
                                <span className="head">Branş</span>
                                <span className="head">Tamamlanan Ders Sayısı</span>
                            </div>
                            {userInfo?.appointments?.counts?.branches?.map((item, key) => {
                                return (
                                    <AppointCard key={key}>
                                        <span className="name" >{item?.name}</span>
                                        <span className="count" >{item?.count}</span>
                                    </AppointCard>
                                )
                            })}
                        </>
                        :
                        <span style={{ width: "100%", textAlign: "center", margin: 10, backgroundColor: "red", color: "var(--blue)", fontWeight: 500 }} >Henüz bu kullanıcı 321 sisteminde hiç ders tamamlamamıştır.</span>
                    }
                </Appointments>
            }

            {choosenHead == 1 &&
                <PARQContainer>
                    {userInfo?.parq?.length > 0 ?
                        (userInfo?.parq?.map((item, key) => {
                            return (
                                <PARQCard key={key}>
                                    <span className="name" >{item?.title}</span>
                                    <span className="count" >{item?.answer}</span>
                                </PARQCard>
                            )
                        }))
                        :
                        <span >Henüz bu kullanıcı PARQ testini çözmemiş durumdadır.</span>
                    }
                </PARQContainer>
            } */}
        </div>
    );
}


const Wrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  margin-bottom: 25px;

  width: 100%;
  
  @media (max-width: 768px) {
    margin-left: 10px;
    width: 375px;
  }
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid transparent;
  border-bottom: ${(p) => p.isActive && `1px solid ${p.theme.colors.gray5}`};
  padding: 10px 15px;

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
  padding: 10px 15px;
`;
const ButtonWrapper = styled.div`
border-radius: 15px;
background: #fff;
box-shadow: 2px 3px 18px rgb(0 0 0 / 9%);
margin-bottom: 25px;
width: 622px;
cursor:pointer;
`;


////////////////////
const SomeInfoContainer = styled.div`
   display: flex;  
   width: 100%;
   height: auto;  
    .some-info{
        display: flex; 
     width: 100%;
   height: auto;  
   padding: 10px;
 
    }
`;

const Appointments = styled.div`
 
width: 100%;
height: 100%;
 margin-top:10px;
.static-heads{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
     .head{
        font-weight: 400;
        font-size: 16px;
        width: 100%;
        text-align: center; 
    }
}

`;

const AppointCard = styled.div`
 
width: 100%;
height: 50px;   
display: flex;
justify-content: space-between;
align-items: center;
color: var(--blue);
border-radius: 18px;
-webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  
  margin: 13px 0px 13px 0px ;
.name{
    text-align: center;
    width: 100%;
     
}
.count{
    text-align: center;
    width: 100%;
 
}
`;


const PARQContainer = styled.div`
 
width: 100%;
height: 100%;
 margin-top:10px;
.static-heads{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
     .head{
        font-weight: 400;
        font-size: 16px;
        width: 100%;
        text-align: center; 
    }
}

`;



const PARQCard = styled.div`
 
width: 100%;
height: 100%;   
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
color: var(--blue);
padding: 10px;
-webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
border-radius: 18px;

margin: 13px 0px 13px 0px ;
.name{
    color: black; 
    text-align: start;
    margin-left: 20px;
    width: 100%;
    
}
.count{
    margin-left: 20px;
    text-align: start;
    width: 100%;
 
}
`;