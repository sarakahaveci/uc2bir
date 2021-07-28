import React, { useState } from 'react';
import styled from 'styled-components/macro';


export default function IndividualImprint({ userInfo }) {


    const [choosenHead, setChoosenHead] = useState(0);



    const changeHead = (id) => {

        setChoosenHead(id)
    }

    return (
        <div>
            <SomeInfoContainer>
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
            </HeadContainer>
            {choosenHead == 0 &&
                <Appointments>
                    {/* <span >Toplam Bitirilen ders sayısı: <span style={{ color: "var(--blue)" }}>125</span></span> */}
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
                </Appointments>
            }

            {choosenHead == 1 &&
                <PARQContainer>
                    {userInfo?.parq?.map((item, key) => {
                        return (
                            <PARQCard key={key}>
                                <span className="name" >{item?.title}</span>
                                <span className="count" >{item?.answer}</span>
                            </PARQCard>
                        )
                    })}
                </PARQContainer>
            }
        </div>
    );
}


const SomeInfoContainer = styled.div`
   display: flex; 
   justify-content: center;
   align-items: center;
   width: 100%;
   height: auto;  
    .some-info{
        display: flex; 
   justify-content: space-evenly;
   align-items: center; 
   width: 100%;
   height: auto;  
   padding: 10px;
   border:1px solid var(--blue);
   border-radius: 18px;
    }
`;
const HeadContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 80px; 
    
`;
const Head = styled.div` 
cursor: pointer;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
border-bottom: ${(props) => (props.choosenHead ? "3px solid var(--blue)" : "unset")}  ;
font-weight: 500;
font-size: 18px; 
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