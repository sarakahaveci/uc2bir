import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { Material, FileUpload } from 'components';
import { useSelector } from 'react-redux';
import { default as MaterialButton } from '@material-ui/core/Button';

import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RateModal = ({
  appointmentAll,
  open,
  rate,
  cancel,
  headerText = '',
  descText = '',
  cancelLabel = '',
  rateLabel = '',
}) => {
  const [selectedPage, setSelectedPage] = useState('start');
  const [toBeRatedUserType, setToBeRatedUserType] = useState(null);
  const [star, setStar] = useState(undefined);
  const [comment, setComment] = useState(undefined);
  const auth = useSelector((state) => state.auth)
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileTypeId, setFileTypeId] = useState(null);

  useEffect(() => {
    if (open == false) {
      setStar(undefined);
      setComment(undefined);
      setSelectedPage('start');
    }
  }, [open]);
  let content;
useEffect(()=>{console.log('uploaded',uploadedFiles)},[uploadedFiles])

  const getCommentedId = () => {
    if (toBeRatedUserType == 'pt') return appointmentAll.pt.id;
    if (toBeRatedUserType == 'dt') return appointmentAll.dt.id;
    if (toBeRatedUserType == 'st') return appointmentAll.student_id;
    if (toBeRatedUserType == 'bs') return appointmentAll.bs.id;

  }
  switch (selectedPage) {
    case 'start':
      content = (
        <MainContainer>
          <Svg.CloseIcon
            className="close-icon"
            onClick={() => {
              setToBeRatedUserType(null)
              cancel();
            }}
          />
          <ContextContainer>
            <IconContainer>
              <Svg.Approve />
            </IconContainer>

            <Text
              variant="h2"
              fontSize="1.2rem"
              color="dark"
              fontWeight="500"
              textAlign="center"
            >
              {headerText}
            </Text>

            <Text textAlign="center" fontSize="1rem" color="dark">
              {descText}
            </Text>
          </ContextContainer>

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
                setToBeRatedUserType(null)
                cancel();
              }}
            >
              {cancelLabel}
            </StyledButton>
          </div>
        </MainContainer>
      );
      break;
    case 'second':
      content = (
        <MainContainer>
          <>
            <ReasonContextContainer>
              <TextContainer>
                <StyledText>{toBeRatedUserType ? "Puan & Yorum" : "Bu rezervasyon ile ilgili kimi puanlamak istersiniz?"}</StyledText>
              </TextContainer>
              {!toBeRatedUserType &&
                <>
                  {(appointmentAll?.pt && appointmentAll?.pt.id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('pt') }} >  Eğitmeni Puanla</span> : null}
                  {(appointmentAll?.dt && appointmentAll?.dt.id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('dt') }}>Diyetisyeni Puanla</span> : null}
                  {(appointmentAll?.student_id && appointmentAll?.student_id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('st') }} >Öğrenciyi Puanla</span> : null}
                  {(appointmentAll?.bs && appointmentAll?.bs.id !== auth.user?.id) ? <span className="choose-type-span" onClick={() => { setToBeRatedUserType('bs') }} >Spor Salonunu Puanla</span> : null}
                  <span className="choose-type-span" onClick={() => { setToBeRatedUserType('session') }}>Dersi Puanla</span>

                </>
              }
              {toBeRatedUserType && toBeRatedUserType !== 'session' &&
                <>
                  <StarContainer>
                    Yıldız Veriniz :{' '}
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
                    label="Yorumnuzu giriniz..."
                    type="text"
                    name="comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </>
              }
              {toBeRatedUserType && toBeRatedUserType == 'session' &&
                <>
                  <StarContainer>
                    Yıldız Veriniz :{' '}
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
                    label="Yorumnuzu giriniz..."
                    type="text"
                    name="comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
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
                   {/** Dosya Yükle
                    <FileUpload
                      style={{display:'none'}}
                      showRegisterInfo={false}
                      uploadedFiles={uploadedFiles}
                      setUploadedFiles={setUploadedFiles}
                      fileTypeId={10}
                      
                    /> */}
                  </MaterialButton>

                </>
              }
            </ReasonContextContainer>


            <ModalFooter>
              <FooterButton
                onClick={() => {
                  cancel();
                  setToBeRatedUserType(null)
                }}
              >
                VAZGEÇ
              </FooterButton>
              {toBeRatedUserType && <FooterButton
                rate
                onClick={() => {
                  setToBeRatedUserType(null)
                  rate({ rate: star, comment: comment, commented_id: getCommentedId(), rateType: toBeRatedUserType });
                }}
              >
                GÖNDER
              </FooterButton>}
            </ModalFooter>
          </>
        </MainContainer >
      );
      break;
    default:
      break;
  }

  return <Root style={{ display: open ? 'flex' : 'none' }}>{content}</Root>;
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
`;
const MainContainer = styled.div`
  display: flex;
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
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 200px;
  background: var(--blue);
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
  flex-direction: column;
  width: 30vw;
  justify-content: center;
  align-items: center;
  padding: 50px 70px 30px;

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

  .choose-type-span{
    cursor:pointer;
    margin: 5px auto 5px auto;
    padding:10px;
    line-height: 25px;
    font-weight: 300;
    font-size: 20px;
    color:black;
    border:1px solid var(--blue);
    border-radius:9px;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const StyledText = styled.text`
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color: var(--blue);
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
`;
const StarContainer = styled.div`
  display: flex;
`;
export default RateModal;
