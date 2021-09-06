import React from 'react';
import { useSelector } from 'react-redux';

import styled, { css } from 'styled-components/macro';
import { Svg, AwesomeIcon, Box } from 'components';
import { DIETITIAN, WORK_PLACE } from '../../constants';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const BranchRowToggler = ({ isActive, data, typeId }) => {
  const { t } = useTranslation();

  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  return (
    <StyledCardHeader isActive={isActive}>
      {typeId === DIETITIAN ? (
        <StyledRow center className="first">
          <Title>{moment(data).format('DD MMMM dddd')}</Title>
        </StyledRow>
      ) : (
        <StyledRow center className="first">
          {data.icon && <Avatar src={data.icon} alt={data.name} />}
          <Title>{data.name}</Title>
        </StyledRow>
      )}

      {userInfo?.type_id !== DIETITIAN && userInfo?.type_id !== WORK_PLACE ? (
        <Box row>
          <RightCell>
            {data.classification} {t('Level')}
          </RightCell>
          <RightCell className="mid">
            <span>{data.price}</span>
            <AwesomeIcon.Tl />
          </RightCell>
          <RightCell className="last">
            <Svg.ArrowRightIcon />
          </RightCell>
        </Box>
      ) : (
        <Box row>
          <RightCell className="last">
            <Svg.ArrowRightIcon />
          </RightCell>
        </Box>
      )}
    </StyledCardHeader>
  );
};

export default BranchRowToggler;

const StyledRow = styled(Box)`
  .yoga {
    svg {
      width: 22px;
      height: 22px;
      margin-right: 15px;
      margin-bottom: 2px;
    }
  }
`;

const RightCell = styled.div`
  border-left: 1px solid #d3d3d3;
  padding: 0 10px;

  &:last-child {
    padding-right: 0;
  }

  &.first {
    font-size: 0.9rem;
    line-height: 17px;
    color: ${(p) => p.theme.colors.dark};
  }

  &.mid {
    color: ${(p) => p.theme.colors.blue};

    svg {
      margin-left: 5px;
    }
  }
`;

const Title = styled.h4`
  font-size: 1.1rem;
  letter-spacing: 0.21em;
  color: ${(p) => p.theme.colors.blue};
  font-weight: 600;
  margin-left: 5px;
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 15px 20px;
  border-radius: 10px;
  background: #fcfcfc;
  border-bottom: 0.5px solid transparent;

  .last {
    svg {
      transition: all 0.5s;
      transform: ${(p) => p.isActive && 'rotate(90deg)'};
    }
  }

  ${(p) =>
    p.isActive &&
    css`
      border-bottom: 0.5px solid rgba(197, 196, 196, 0.6);
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    `}
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
