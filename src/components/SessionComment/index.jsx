import Svg from 'components/statics/svg';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionComment } from 'actions'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const SessionComment = ({ session_id, goBack = () => { } }) => {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const sessionComment = useSelector(
    (state) => state.userProfile?.sessionComment
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSessionComment(session_id))
  }, [session_id])
  return (
    <Container>
      <Header>
        <BoldText
          onClick={() => {
            goBack();
          }}
          style={{ cursor: 'pointer' }}
        >
          {'< Oturum Değerlendirme'}
        </BoldText>
      </Header>      <Sections>
        {sessionComment?.data?.length > 0 && sessionComment?.data?.map((comment, key) => (
          <CommentCard key={key}>
            <CommenterPhoto src={comment?.commenter?.photo}></CommenterPhoto>
            <CommentBody>
              <Rating
                name="customized-empty"
                defaultValue={comment?.rating}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                readOnly
              />
              <CommentText>
                {comment?.comment}
              </CommentText>
              <AttachList>
                {comment?.session_file?.length > 0 && comment?.session_file?.map((file, key) => (
                  <Attach key={key} onClick={() => { setSelectedItem(file) }}>
                    <div style={{ height: '20px', width: '20px', marginRight: '5px' }}>
                      <Svg.PaperClip />
                    </div>
                    {file?.file?.slice(-15)}
                  </Attach>
                ))}
              </AttachList>
            </CommentBody>
          </CommentCard>
        ))}
      </Sections>
      {selectedItem && <ModalRoot onClick={() => { setSelectedItem(undefined) }}>
        {selectedItem?.type == 'JPEG' && <img src={selectedItem?.file}></img>}
      </ModalRoot>
      }
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Sections = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media ${device.sm} {
    flex-direction: column;
  }
  padding:80px;
`;
const Header = styled.div`
  width: 100%;
`;

//text
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;


const CommentCard = styled.div`
display:flex;
width: 100%;
height: 200px;
background:white;
border-radius: 10px;
-webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);

`
const CommenterPhoto = styled.img`
height: 200px;
width:200px;


`
const CommentBody = styled.div`
display:flex;
flex-direction:column;
 flex-grow:1;
 height: 100%;
 padding:10px;

`
const CommentText = styled.text`
width: 100%;
height:110px;
border-style:solid;
border-width: 1px;
border-radius: 10px;
margin-top:10px;
padding:10px;

`
const Attach = styled.div`
display:flex;
height:20px;
background:re;
margin-left:10px;
cursor:pointer;
`
const AttachList = styled.div`
display:flex;
width:100%;
margin-top:15px;

`
const ModalRoot = styled.div`
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
`
export default SessionComment;
