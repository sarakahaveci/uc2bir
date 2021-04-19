import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';


import { Box, Button, Span, Svg, Text, Title } from 'components';
import image from '../../../../assets/wave-background.png';
import { device } from '../../../../utils';

export default function ReservationCreatedTemplate() {

  const {
    myTemplates: { data: myTemplates },
  } = useSelector((state) => state.profileSettings2.reservationTemplate);


  return (
    <div>
      <BackLink to="/myprofile/settings/profile">
        <Svg.ArrowLeftIcon />

        <span>Şablonlar</span>
      </BackLink>

      <Row>
        <Col lg={6}>
          {myTemplates?.map((item, index) => (
            <div key={index}>
              <BoxContainer >
                <Box row >
                  <Text color="dark" fontWeight="500">
                    {item.name}
                  </Text>
                  <Svg.ArrowRightIcon />
                </Box>
              </BoxContainer>
              {!item.is_default&&
                <Text
                  style={{ marginLeft:'15px', display:'flex'}}
                  textAlign="left"
                  fontWeight="500"
                  fontSize='13px'
                  color={'blue'}>
                  <Span underline lineWidth={'100%'} > Varsayılan Şablon Olarak Seç </Span>
                  <Span
                    style={{marginBottom:'-10px'}}
                    cursor="pointer"
                    fontSize="1.5rem"
                    marginLeft="10px">
                    {`>`}
                  </Span>
              </Text> }

            </div>
          ))}

        </Col>

        <Col lg={6}>

          <DateContainer>
            <AppointmentDate>
              <Row>
                <Title
                  style={{ marginLeft:'15px', display:'flex'}}
                  textAlign="left"
                  fontWeight="500">
                  <Span underline lineWidth={'100%'} > Şablon Hakkında </Span>
                </Title>

                <Text  style={{ margin:'15px', display:'flex'}} fontWeight="300" color={'grey'}>
                  Merhaba Zeynep, rezervasyon takvimini tamamlamak için oluşturduğun şablonalardan birini kullanabilirsin
                </Text>

              </Row>


            </AppointmentDate>

            <AcceptButton src={image}>
              <Button
                onClick={()=>setOpenApprove(true)}
                text="Haftalık Rezervasyon Takvimimi Oluştur"
                className="blue"
                width={'496px'}
                height={'66px'}
              />

              <Button
                blueBorder
                onClick={()=>setOpenApprove(true)}
                text="Yeni Şablon Oluşturmak İstiyorum"
                width={'496px'}
                height={'66px'}
                style={{marginTop:'15px'}}
              />
            </AcceptButton>

          </DateContainer>
        </Col>
      </Row>
    </div>
  );
}

const BoxContainer = styled(Container)`
  background-color: var(--white) !important;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  margin-top: 30px;
`;

const DateContainer = styled.div`
  width: 586px;
  height: 326px;
  margin-left: 25px;
  background: #F8F8F8;
  border-radius: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  @media ${device.sm}  {
    height: 190px;
    width: 310px;
  }
`;

const AppointmentDate = styled.div`
  margin: 30px;
  flex-direction: column;
  @media ${device.sm}  {
    height: 95px;
    width: 290px;
  }
`;


const AcceptButton = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #FFFFFF;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  @media ${device.sm}  {
    height: 95px;
    width: 310px;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 2px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.softDark};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
