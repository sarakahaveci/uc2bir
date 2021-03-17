import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import { Title, Box, Svg } from 'components';
import DefaultProfileImg from 'assets/default-profile.jpg';

const ChatBoxHeader = () => {
  const { selectedRoomUser } = useSelector(
    (state) => state.profileSettings2.messages.selectedRoom
  );

  const photo = selectedRoomUser?.photo || DefaultProfileImg;

  return (
    <Wrapper>
      <InnerWrapper>
        <Box row>
          <Avatar src={photo} />

          <Title
            className="ml-2 mt-auto mb-auto"
            fontSize="15px"
            fontWeight="400"
            textAlign="left"
            color="#2c2c2c"
          >
            {selectedRoomUser?.name}
          </Title>
        </Box>

        <ServiceButton>
          <Svg.HeadPhoneIcon />
          Müşteri Hizmetleri
        </ServiceButton>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChatBoxHeader;

const Wrapper = styled.div`
  border-bottom: 0.5px solid ${(p) => p.theme.colors.gray7};
  padding: 10px 20px 10px 15px;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
`;

const ServiceButton = styled.button`
  border-radius: 20px;
  background: #fff;
  border: 1px solid ${(p) => p.theme.colors.blue};
  box-shadow: 0px 3px 6px rgba(0, 177, 168, 0.16);
  padding: 0 15px;
  color: ${(p) => p.theme.colors.blue};
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  height: 40px;

  svg {
    margin-right: 5px;
    margin-bottom: 2px;
  }
`;
