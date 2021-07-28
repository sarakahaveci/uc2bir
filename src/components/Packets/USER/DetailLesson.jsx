// @ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress, Material } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import { device } from 'utils';
import image from '../../../assets/session-type.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMyPacketDetail, getUserTestDetail, setPackageSurvey ,clearReservation,setReservation} from 'actions';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';

import DialogContent from '@material-ui/core/DialogContent';
const fullWidth = true;
const maxWidth = 'sm';
const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const DetailLesson = ({
  setBannerActive = () => {},
  setPage = () => {},
  globalState,
  setGlobalState,
}) => {
  const [question, _question] = useState([]);
  const [answer, _answer] = useState({});
  const dispatch = useDispatch();
  const detailData = useSelector(
    (state) => state.myPackets?.user?.detail?.data
  );
  const [modal, setModal] = useState(false);
  const [changeable, setChangeable] = useState(false);

  const tests = useSelector(
    (state) => state.myPackets?.user?.lessonDetail?.data
  );

  useEffect(() => {
    setChangeable(false); // for eslint
    dispatch(getUserMyPacketDetail(globalState?.package_uuid));
    setBannerActive(false);
  }, []);
  function onClickLesson(elm) {
    setChangeable(elm?.is_changeable);
    if (elm?.type == 'lesson') {
      setGlobalState({ ...globalState, lesson_id: elm?.id });
      setPage('Exercises');
    } else {
      dispatch(getUserTestDetail(elm?.id, globalState?.package_uuid));
      setModal(true);
    }
  }
  const classes = useStyles();
  function locationSelector(index) {
    if (index % 3 == 0) {
      return 'start';
    } else if (index % 3 == 2) {
      return 'end';
    } else {
      return 'mid';
    }
  }
  function handleReservationButton() {
    dispatch(clearReservation());
    dispatch(setReservation({ package_uuid: globalState?.package_uuid }));
    dispatch(setReservation({ packetInfo: globalState }));
    setPage('PacketReservation');
   
  }
  const succsess = () => {
    setModal(false);
    toast.success(`Soru cevapları gönderildi.`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const err = () => {
    setModal(false);
    toast.error(`Soru cevapları gönderilemedi!`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    return dispatch(
      setPackageSurvey(
        {
          answer: answer,
          package_uuid: globalState?.package_uuid,
          appointment_id: globalState?.appointment_id, //çalışmassa kontrol et
          lesson_id: globalState?.lesson_id,
        },
        succsess,
        err
      )
    );
  };

  function _renderLessons() {
    return detailData?.lessons?.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress
          location={
            detailData?.lessons?.length - 1 == index
              ? 'end'
              : locationSelector(index)
          }
          active={elm?.is_completed ? 'true' : 'false'}
        ></CustomProgress>
        <LessonCardContainer
          onClick={() => {
            onClickLesson(elm);
          }}
        >
          <MainField>
            <HeaderArea>
              {elm?.is_completed ? (
                <Svg.TickLesson />
              ) : (
                <>
                  <Number>
                    <BoldText color={'#C5C4C4'}>{index + 1}</BoldText>
                  </Number>
                  <Svg.TickLessonDisable />
                </>
              )}
              <BoldText style={{ marginLeft: '9px', display: 'block' }}>
                {elm?.type == 'lesson' ? elm?.lesson + ' .Ders' : elm?.title}
              </BoldText>
            </HeaderArea>
            <DescArea>
              <IconArea></IconArea>
              <DescText>{elm?.description} </DescText>
            </DescArea>
          </MainField>
          {elm?.type == 'lesson' && (
            <RightSideField>
              <Svg.ArrowRightIcon></Svg.ArrowRightIcon>
            </RightSideField>
          )}
        </LessonCardContainer>
      </Col>
    ));
  }
  return (
    <Main>
      <InfoContainer>
        <Right>
          <ImageContainer>
            <ImageBanner src={image}></ImageBanner>
            <Button onClick={handleReservationButton}>Rezervasyon Yap</Button>
          </ImageContainer>
          <TextContainer>
            <Title>{detailData?.package?.title}</Title>
          </TextContainer>
        </Right>
        <RichTextContainer>
          {' '}
          <RichText>
            {ReactHtmlParser(decode(detailData?.package?.detail))}
          </RichText>
        </RichTextContainer>
      </InfoContainer>
      <Wrapper>
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
          open={modal}
        >
          <DialogTitle className="text-center">
            <Title textAlign="left" variant="h5" component="h5">
              {'Test'}
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
              onClick={() => setModal(false)}
            >
              x
            </span>
          </DialogTitle>
          <DialogContent>
            {!changeable ? (
              <Table>
                <table>
                  <tbody>
                    {tests?.length > 0 &&
                      tests?.map((val) => {
                        return (
                          <>
                            <tr>
                              <th>{val.title}</th>
                            </tr>
                            <tr>
                              <td>{val.answer}</td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </Table>
            ) : (
              <form onSubmit={onSubmit} autoComplete="off">
                {tests?.length &&
                  tests?.map((val, key) => {
                    if (val?.answer_type === 'radio') {
                      return (
                        <Material.RadioButtonsGroup
                          required={val.required}
                          val={val.name}
                          key={key}
                          name={val.name}
                          label={`${++key}. ${val.name}`}
                          items={val.options}
                          onChange={(e) => {
                            _question([...question, val.id]);
                            _answer({ ...answer, [val.id]: [e.target.value] });
                          }}
                        />
                      );
                    } else if (val.answer_type === 'string') {
                      return (
                        <div style={{ marginTop: 15, marginBottom: 30 }}>
                          <div style={{ fontSize: '11pt' }} className="label">
                            {`${++key}. ${val.name}`}
                          </div>
                          <Material.TextField
                            required={val.required}
                            key={key}
                            name={val.name}
                            onChange={(e) => {
                              _question([...question, val.id]);
                              _answer({
                                ...answer,
                                [e.target.name]: [e.target.value],
                              });
                            }}
                          />
                        </div>
                      );
                    } else if (val.answer_type === 'numeric') {
                      return (
                        <div style={{ marginTop: 15, marginBottom: 30 }}>
                          <div style={{ fontSize: '11pt' }} className="label">
                            {`${++key}. ${val.name}`}
                          </div>
                          <Material.TextField
                            required={val.required}
                            type="number"
                            key={key}
                            name={val.name}
                            onChange={(e) => {
                              _question([...question, val.id]);
                              _answer({
                                ...answer,
                                [val.id]: [e.target.value],
                              });
                            }}
                          />
                        </div>
                      );
                    } else if (val.answer_type === 'checkbox') {
                      return (
                        <div style={{ marginTop: 15, marginBottom: 30 }}>
                          <div style={{ fontSize: '11pt' }} className="label">
                            {`${++key}. ${val.text}`}
                          </div>
                          <div style={{ margin: '15px 20px 0' }}>
                            {val.options.map((item, key) => {
                              return (
                                <>
                                  <Material.CheckBoxGroup
                                    style={{ color: 'red' }}
                                    key={`checkbox-key-${key}`}
                                    name={val.name}
                                    label={item.name}
                                    onChange={(e) => {
                                      _question([...question, val.id]);
                                      _answer({
                                        ...answer,
                                        [e.target.name]: [item.id],
                                      });
                                    }}
                                  />
                                </>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  })}
                {true ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flex: '1',
                    }}
                  >
                    <Button
                      type="submit"
                      text={`Testi Tamamla`}
                      className="blue"
                      width={'90%'}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flex: '1',
                    }}
                  >
                    <Button
                      text={`Yükleniyor...`}
                      className="blue"
                      width={'90%'}
                    />
                  </div>
                )}
              </form>
            )}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
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
  padding: 17px 12px 17px 12px;
  width: 100%;
  height: 50%;
`;
const Number = styled.div`
  width: 26px;
  text-align: center;
`;
const DescArea = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 12px 17px 12px;
  height: 50%;
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
  margin-left: 9px;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const ImageBanner = styled.section`
  width: 330px;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;
const Right = styled.div`
  display: flex;
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 300px;
  height: 285px;
  align-items: center;
  padding: 20px;
  @media ${device.sm} {
    width: 150px;
  }
`;
const Title = styled.text`
  font-size: 26px;
`;
const RichText = styled.text`
  font-size: 16px;
  margin-left: 10px;
`;
const RichTextContainer = styled.div`
  display: flex;
  align-self: center;
  border-left: 3px solid #00b2a9;
`;
const ImageContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 180px;
  height: 34px;
  background: var(--blue);
  color: white;
  border-radius: 5px;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }

  position: absolute;
  bottom: -17px;
  right: 20px;
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

export default DetailLesson;
