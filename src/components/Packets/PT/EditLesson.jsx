// @ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress, Title } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import { device } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { getPackageClass,getPackageClassDetail } from '../../../actions';
import Card  from '../../banner/profile-banner/Card';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});

const EditLesson = ({ setBannerActive = () => {}, setPage = () => {}, packageData }) => {
  const dispatch = useDispatch();
  const [testName, setTestName] = useState('');
  const fullWidth = true;
  const maxWidth = 'sm';
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setBannerActive(false);
  }, []);

  const { classDetail } = useSelector(
    (state) => state.professionalReservation.ptReservation
  );

  useEffect(() => {
    dispatch(getPackageClass({package_uuid:packageData?.package_uuid, appointment_id:packageData?.appointment_id}));
  },[]);


  function onClickLesson(id, title, package_uuid, appointment_id) {

    // setPage('Exercises');
    dispatch(getPackageClassDetail({package_uuid, appointment_id, lesson_id:id, type:'parq'}));
    // setModal(true)
    setTestName(title)
  }
  const classes = useStyles();
  function locationSelector(index) {
    if (index % 3 === 0) {
      return 'start';
    } else if (index % 3 === 2) {
      return 'end';
    } else {
      return 'mid';
    }
  }
  function _renderLessons() {
    return classDetail?.lessons.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress location={classDetail?.lessons.length - 1 === index ? 'end' : locationSelector(index)} active='true' />
        <LessonCardContainer onClick={()=>onClickLesson(elm?.id,elm?.title, classDetail?.package_uuid, classDetail?.appointment_id)}>
          <MainField>
            <HeaderArea>
              {
                elm?.type === 'lesson'?
                  <Number>
                    <BoldText color={'#C5C4C4'}>{elm?.lesson + '.' }</BoldText>
                    <BoldText style={{ marginLeft: '9px' }}>{'Ders' }</BoldText>
                  </Number>:
                  <div style={{display:'flex'}}>
                    {elm?.is_completed === true ? <Svg.TickLesson /> : <Svg.TickLessonDisable />}
                    <BoldText style={{ marginLeft: '9px' }}>{elm.title}</BoldText>
                  </div>
              }

            </HeaderArea>
            <DescArea>
              <IconArea/>
              {
                elm?.type === 'lesson'?
                  elm?.is_completed === true?
                    <div style={{display:'flex'}}>
                      <Svg.TickLesson />
                      <DescText> Tamamlandı </DescText>
                    </div>
                 :
                    <div style={{display:'flex'}}>
                      <Svg.TickLessonDisable />
                      <DescText>Devam Ediyor... </DescText>
                    </div>
                  :
                  <DescText>{elm?.description?.substr(0, 70)}</DescText>
              }
            </DescArea>
          </MainField>
          <RightSideField>
            <Svg.ArrowRightIcon/>
          </RightSideField>
        </LessonCardContainer>
      </Col>
    ));
  }
  return (
    <Row>
      <Containers>
        <Rows>
          <Col lg={4}>
            <Card img={classDetail?.package?.photo}>
              <span className="team">{classDetail?.package?.classification}</span>
            </Card>
          </Col>
          <Col lg={3}>
            <Title
              variant={'h4'}
              component={'h4'}
              textAlign="left"
              fontWeight="bold"
              margin="0"
              lineDisable>
              {classDetail?.package?.title}
            </Title>
            <div className="proficiency-row__left-wrapper">
              <div className="proficiency-row__left-wrapper">
                <img src={classDetail?.package?.branch.icon} alt={classDetail?.package?.branch.name} className="proficiency-row__img" />
                <Title
                  variant={'h7'}
                  component={'h7'}
                  textAlign="left"
                  fontWeight="normal"
                  lineDisable
                  style={{marginTop:'5px', marginLeft:'5px'}}
                >
                  {classDetail?.package?.branch.name}
                </Title>
              </div>
              <div className="proficiency-row__left-wrapper">
                <ClockMediumIcon/>
                <Title
                  variant={'h7'}
                  component={'h7'}
                  textAlign="left"
                  fontWeight="normal"
                  lineDisable
                  style={{marginTop:'7px', marginLeft:'5px'}}>
                  {classDetail?.package?.lesson_amount}  Ders
                </Title>
              </div>
            </div>
          </Col>

          <Col lg={5} style={{display:'flex'}}>
            <Line style={{marginRight:'10px'}}/>
            {ReactHtmlParser(
              decode(classDetail?.package?.detail)
            )}
          </Col>
        </Rows>
      </Containers>
      <Wrapper>
        <Title
          style={{ cursor: 'pointer', padding: 15 }}
          fontSize="14pt"
          textAlign="left"
          onClick={() => {
            setPage('Home');
            setBannerActive(true);
          }}
        >
          {`< Geri`}
        </Title>
        <StyledRow header style={{}}>
          <Col lg="12" style={{ padding: 0 }}>
            <HeaderText>Dersler</HeaderText>
            <LinearProgress
              classes={{ barColorPrimary: classes.barColorPrimary }}
              variant="determinate"
              value={20}
            />
          </Col>
        </StyledRow>
        <StyledRow style={{}}>{_renderLessons()}</StyledRow>
      </Wrapper>

      <React.Fragment>
        <Dialog
          className="material-dialog"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={modal}>
          <DialogTitle className="text-center">
            <Title textAlign="left" variant="h5" component="h5">
              {testName}
            </Title>
            <span
              style={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: '5px 15px',
              }}
              onClick={() => setModal(false)}>
              x
            </span>
          </DialogTitle>
          <DialogContent>
            <Table>
              <table>
                <tbody>
                {/*{testDetail?.data?.map((val) => {*/}
                {/*  return (*/}
                {/*    <>*/}
                {/*      <tr>*/}
                {/*        <th>{val.title}</th>*/}
                {/*      </tr>*/}
                {/*      <tr>*/}
                {/*        <td>*/}
                {/*          {val.answer}*/}
                {/*        </td>*/}
                {/*      </tr>*/}
                {/*    </>*/}
                {/*  );*/}
                {/*})}*/}
                </tbody>
              </table>
            </Table>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </Row>
  );
};



const Containers = styled(Container)`
  min-height: 340px;
  background: transparent;
`;

const Line = styled.div`
  max-width: 1px;
  height: 285px;
  background: #e5e5e5;
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 100%;
`;

const Rows = styled(Row)`
  align-items: center;
  justify-content: center;
  min-height: 340px;
`;

const Wrapper = styled(Container)`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  padding: 5px;
  @media ${device.sm} {
  }
`;
const StyledRow = styled(Row)`
  margin: ${(props) => (props.header ? '20px' : '50px')};
  @media ${device.sm} {
    margin: ${(props) => (props.header ? '20px' : '5px')};
  }
`;

const ClockMediumIcon = styled(Svg.ClockMediumIcon)`
  svg {
    width: 20px;
    height: 20px;
  }
`;


const HeaderText = styled.text`
  color: #00b2a9;
  font-size: 16px;
`;

const LessonCardContainer = styled.div`
  display: flex;
  width: 365px;
  height: 102px;
  border: #c5c4c4;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  cursor: pointer;
  @media ${device.sm} {
    margin-top: 10px;
    width: 95%;
  }
`;
const MainField = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const RightSideField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 100%;
`;
const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 7px 10px 7px;
  width: 100%;
  height: 40%;
`;
const Number = styled.div`
  width: 26px;
  text-align: center;
`;
const DescArea = styled.div`
  display: flex;
  align-items: center;
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
`;
const IconArea = styled.div`
  width: 26px;
  height: 26px;
`;
const DescText = styled.text`
  overflow: hidden;
  margin-left: 5px;
`;

const Table = styled.div`
  width: 100%;
  height: 450px;
  margin-top: 15px;
  margin-bottom: 30px;
  overflow: hidden auto;
  box-shadow: 5px 5px 11px -5px rgba(0, 0, 0, 0.3);

  table {
    tr {
      th {
        background: var(--gray8);
        padding: 15px;
      }
      td {
        padding: 15px;
        font-size: 11pt;
        font-weight: 500;
      }
    }
  }
`;

export default EditLesson;
