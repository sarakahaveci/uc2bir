import { Svg } from 'components';
import React, { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';

const UpgradeClass = ({ setField = () => {}, globalState }) => {
  //Local States
  //const reservation = useSelector((state) => state.reservation);

  useEffect(() => {
    alert(globalState?.level);
  }, [globalState]);
  return (
    <Main>
      <BackLink onClick={() => setField('main')}>
        <Svg.ArrowLeftIcon />

        <span>Eğitmen Arayın</span>
      </BackLink>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Text = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const BackLink = styled(Text)`
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

export default UpgradeClass;
