import React from 'react';
import styled from 'styled-components/macro';
import { Text, Svg } from 'components';
import { Link } from 'react-router-dom';
import { device } from 'utils';
import { useSelector } from 'react-redux';

const CreateCalenderModal = ({ open, approve = () => {}, cancel = () => {} }) => {
  const { name: name } = useSelector((state) => state.auth.user);
  return (
    <Root style={{ display: open ? 'flex' : 'none' }}>
      <MainContainer>
        <ContextContainer>
          <Svg.SmileyFaceIcon />
          <Text
            variant="h2"
            fontSize="1.2rem"
            color="dark"
            fontWeight="500"
            textAlign="center"
          >
            Merhaba {name}
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
           Lütfen Vermek İstediğiniz Ders Tipini Seçiniz
          </Text>
        </ContextContainer>

        <div className="modal-footer" closeIcon={false}>
          <StyledButton
            approve
            onClick={() => {
              approve();
            }}
          >
            ÖZEL DERS OLUŞTUR
          </StyledButton>
        </div>
        <div className="modal-footer" closeIcon={false}>
          <StyledButton
            approve
            onClick={() => {
              cancel();
            }}
          >
            GRUP DERSİ OLUŞTUR
          </StyledButton>
        </div>
      </MainContainer>
    </Root>
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
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 20px;
  width: 35vw;
  @media ${device.sm} {
    width: 55vw;
    height: 55vh;
    overflow: scroll;
  }
`;
const StyledButton = styled(Link)`
  font-size: 1.2rem;
  color: ${(p) => (p.approve ? 'var(--blue)' : 'black')};
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
  width: 50vw;
  justify-content: center;
  align-items: center;
  padding: 60px 110px 30px;
  svg {
    margin-bottom: 15px;
  }
  @media ${device.sm} {
    padding: 20px 0;
    width: 80vw;
  }
`;

export default CreateCalenderModal;
