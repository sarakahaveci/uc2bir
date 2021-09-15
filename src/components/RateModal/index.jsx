import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { Material } from 'components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { default as MaterialButton } from '@material-ui/core/Button';

import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RateModal = ({
  //appointmentAll,
  appointment_id,
  open,
  rate,
  cancel,
  cancelLabel = '',
  rateLabel = '',
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState('');

  const [selectedPage, setSelectedPage] = useState('start');
  // eslint-disable-next-line
  const [toBeRatedUserType, setToBeRatedUserType] = useState('session');
  const [star, setStar] = useState(undefined);
  const [comment, setComment] = useState(undefined);
  const sessionComment = useSelector(
    (state) => state.userProfile?.sessionComment
  );
  useEffect(() => {
    if (!open) {
      setStar(undefined);
      setComment(undefined);
      setFile(undefined);

      setSelectedPage('start');
    }
  }, [open]);
  let content;

  // const getCommentedId = () => {
  //   if (toBeRatedUserType == 'pt') return appointmentAll.pt.id;
  //   if (toBeRatedUserType == 'dt') return appointmentAll.dt.id;
  //   if (toBeRatedUserType == 'st') return appointmentAll.student_id;
  //   if (toBeRatedUserType == 'bs') return appointmentAll.bs.id;
  // };
  switch (selectedPage) {
    case 'start':
      content = (
        <MainContainer>
          <Svg.CloseIcon
            className="close-icon"
            onClick={() => {
              cancel();
            }}
          />
          <ContextContainer>
            <Text
              variant="h2"
              fontSize="1.2rem"
              color="dark"
              fontWeight="500"
              textAlign="center"
              style={{ marginBottom: '25px' }}
            >
              {t('Course Evaluation')}
            </Text>

            {!sessionComment?.isLoading &&
              sessionComment?.data?.length > 0 &&
              sessionComment?.data?.map((comment, key) => (
                <CommentCard key={key}>
                  <CommenterPhoto
                    src={comment?.commenter?.photo}
                  ></CommenterPhoto>
                  <CommentBody>
                    <Rating
                      name="customized-empty"
                      defaultValue={comment?.rating}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      readOnly
                    />
                    <CommentText>{comment?.comment}</CommentText>
                    <AttachList>
                      {comment?.session_file?.length > 0 &&
                        comment?.session_file?.map((file, key) => (
                          <Attach
                            key={key}
                            onClick={() => {
                              setSelectedItem(file);
                            }}
                          >
                            <div
                              style={{
                                height: '20px',
                                width: '20px',
                                marginRight: '5px',
                              }}
                            >
                              <Svg.PaperClip />
                            </div>
                            {file?.file?.slice(-15)}
                          </Attach>
                        ))}
                    </AttachList>
                  </CommentBody>
                </CommentCard>
              ))}
            {sessionComment?.isLoading && <Text>{t('Loading')}...</Text>}
          </ContextContainer>

          <div style={{ display: 'flex' }}>
            <div className="modal-footer" closeIcon={false}>
              <StyledButton
                rate
                onClick={() => {
                  setSelectedPage('second');
                }}
              >
                {rateLabel}
              </StyledButton>
            </div>
            <div className="modal-footer" closeIcon={false}>
              <StyledButton
                onClick={() => {
                  cancel();
                }}
              >
                {cancelLabel}
              </StyledButton>
            </div>
          </div>
        </MainContainer>
      );
      break;
    case 'second':
      content = (
        <MainContainer>
          <>
            <ReasonContextContainer>
              {/* <TextContainer>
                <StyledText>{toBeRatedUserType ? "Puan & Yorum" : "Bu rezervasyon ile ilgili kimi puanlamak istersiniz?"}</StyledText>
              </TextContainer>
              {!toBeRatedUserType &&
                <>
                  {(appointmentAll?.pt && appointmentAll?.pt.id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('pt') }} >  Eğitmeni Puanla</span> : null}
                  {(appointmentAll?.dt && appointmentAll?.dt.id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('dt') }}>Diyetisyeni Puanla</span> : null}
                  {(appointmentAll?.student_id && appointmentAll?.student_id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('st') }} >Öğrenciyi Puanla</span> : null}
                  {(appointmentAll?.bs && appointmentAll?.bs.id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('bs') }} >Spor Salonunu Puanla</span> : null}
                  <span className="choose-type-span" onClick={() => { setToBeRatedUserType('session') }}>Dersi Değerlendir</span>

                </>
              } */}
              {toBeRatedUserType && toBeRatedUserType !== 'session' && (
                <>
                  <StarContainer>
                    {t('Give Stars')} :{' '}
                    <Rating
                      name="customized-empty"
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setStar(newValue);
                      }}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
                  </StarContainer>

                  <Material.TextField
                    style={{ margin: '20px 0' }}
                    label={t('Enter your comment...')}
                    type="text"
                    name="comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </>
              )}
              {toBeRatedUserType && toBeRatedUserType == 'session' && (
                <>
                  <StarContainer>
                    {t('Give Stars')} :
                    <Rating
                      name="customized-empty"
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setStar(newValue);
                      }}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
                  </StarContainer>

                  <Material.TextField
                    style={{ margin: '20px 0' }}
                    label={t('Enter your comment...')}
                    type="text"
                    name="comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />

                  <div>
                    {file ? (
                      <ImageShow image={file} />
                    ) : (
                      <MaterialButton
                        style={{
                          marginRight: 15,
                          width: 192,
                          height: 120,
                        }}
                        variant="contained"
                        color="default"
                        component="label"
                        startIcon={<Svg.Pencil />}
                      >
                        {t('Upload Photo')}
                        <input
                          type="file"
                          hidden
                          onChange={(event) => {
                            setFile(event.target.files[0]);

                          }}
                        />
                      </MaterialButton>
                    )}

                  </div>
                </>
              )}
            </ReasonContextContainer>

            <ModalFooter>
              <FooterButton
                onClick={() => {
                  cancel();
                }}
              >
                {t('Give Up')}
              </FooterButton>
              {toBeRatedUserType && (
                <FooterButton
                  rate
                  onClick={() => {
                    const createData = new FormData();
                    createData.append('type', 'appointment');
                    createData.append('appointment_id', appointment_id);
                    createData.append('comment', comment);
                    createData.append('rating', star);
                    createData.append('files[]', file);
                    //createData.append('detail', '');
                    rate(createData);
                  }}
                >
                  {t('send')}
                </FooterButton>
              )}
            </ModalFooter>
          </>
        </MainContainer>
      );
      break;
    default:
      break;
  }

  return (
    <Root style={{ display: open !== null ? 'flex' : 'none' }}>{content}</Root>
  );
};

const Root = styled.div`
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  overflow-y: scroll;
`;
const MainContainer = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  .close-icon {
    align-self: flex-end;

    svg {
      cursor: pointer;
    }
  }
  @media ${device.sm} {
    width: 95vw;
    height: 95vh;
    overflow: scroll;
  }
`;

const StyledButton = styled(Link)`
  font-size: 1.2rem;
  color: ${(p) => (p.rate ? 'var(--blue)' : 'black')};
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: var(--blue);
  }
`;

const ContextContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;
const ReasonContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  padding: 30px;
  @media ${device.sm} {
    width: 90vw;
  }

  .choose-type-span {
    cursor: pointer;
    margin: 5px auto 5px auto;
    padding: 10px;
    line-height: 25px;
    font-weight: 300;
    font-size: 20px;
    color: black;
    border: 1px solid var(--blue);
    border-radius: 9px;
    text-align: center;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
`;
const FooterButton = styled.button`
  font-size: 1.2rem;
  color: ${(p) => (p.rate ? 'white' : 'black')};
  text-align: center;
  display: block;
  width: 100%;
  background: ${(p) => (p.rate ? 'var(--blue)' : 'white')};
  padding: 10px;
  text-transform: uppercase;
`;
const StarContainer = styled.div`
  display: flex;
`;

const CommentCard = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  background: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
`;
const CommenterPhoto = styled.img`
  height: 200px;
  width: 200px;
`;
const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 10px;
`;
const CommentText = styled.text`
  width: 100%;
  height: 110px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
`;
const Attach = styled.div`
  display: flex;
  height: 20px;
  background: re;
  margin-left: 10px;
  cursor: pointer;
`;
const AttachList = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
`;
const ImageShow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  background-image: url('${(props) => props.image}');
  background-repeat: no-repeat;
  position: relative;
  background-size: contain;
  margin-right: 15px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }
`;
export default RateModal;
