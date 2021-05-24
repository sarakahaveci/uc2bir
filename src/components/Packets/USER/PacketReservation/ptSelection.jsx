import { Svg } from 'components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';
import Trainers from 'components/ProfileSettings/WorkPlace/Trainers/Trainers';
import { setReservation,setPacketReservation } from 'actions';

const PtSelection = ({
  setField = () => {},
}) => {
  //Local States
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservation);
  function setTrainer(data) {
    dispatch(setReservation({ selectedPt: data }));
    setField('main');
  }
  return (
    <Main>
      <BackLink onClick={() => setField('main')}>
        <Svg.ArrowLeftIcon />

        <span>Eğitmen Arayın</span>
      </BackLink>
      <Trainers
        type="selection"
        branch={reservation?.data?.packetInfo?.branch_id}
        level={reservation?.data?.packetInfo?.classification}
        onClickHover={(e) => {
          setTrainer(e);
        }}
        onClickUpgrageClass={(level) => {
          setField('upgradeClass');
          dispatch(setPacketReservation({level:level}))
        }}
      />
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

export default PtSelection;
