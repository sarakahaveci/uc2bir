import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Button, Box, Svg, Spinner, Span } from 'components';
import { deleteAddressList, getPtWorkingHomePlace } from 'actions';
import { device } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BackLink from 'components/common/BackLink';

const Edit = ({ setSubPage }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  // const { getAddress } = useSelector(
  //   (state) => state.profileSettings2.sessionType
  // );

  const { data } = useSelector(
    (state) => state.userProfile.workPlace.ptHomePlace
  );

  useEffect(() => {
    dispatch(getPtWorkingHomePlace());
  }, []);

  const deleted = (id) => {
    dispatch(
      deleteAddressList(
        id,
        () => {
          dispatch(getPtWorkingHomePlace());
          toast.success(t('Address deleted successfully'), {
            position: 'bottom-right',
            autoClose: 2000,
          });
        },
        () => {}
      )
    );
  };

  return (
    <>
      <BackLink text={t('< Back')} onClick={() => setSubPage('Adds')} />

      {!data?.isLoading ? (
        <>
          <div className="d-flex flex-wrap">
            <List>
              {data?.home_park?.length > 0 ? (
                data?.home_park?.map((val) => (
                  <>
                    <Item>
                      <div className="line-left">
                        <BoldText>{val?.title}</BoldText>
                        <Line></Line>
                        <Box row>
                          <Svg.LocationIcon />

                          <Span ml="5px">
                            {val?.address_detail + '/' + val?.city}
                          </Span>
                        </Box>
                      </div>

                      <Button
                        className="cancel"
                        icon={Svg.CencelIcon}
                        onClick={() => deleted(val?.id)}
                      />
                    </Item>
                  </>
                ))
              ) : (
                <strong>{t('You do not have any address entered')}</strong>
              )}
            </List>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const List = styled.ul`
  width: 100%;
  height: auto;
`;

const Item = styled.li`
  border-radius: 15px;
  box-shadow: 4px 6px 15px -5px rgba(0, 0, 0, 0.35);
  padding: 30px;
  margin-bottom: 15px;
  margin-left: -15px;
  position: relative;

  button {
    position: absolute;
    right: -60px;
    top: 0;

    @media (max-width: 720px) {
      right: -45px;
    }

    span {
      display: none;
    }
  }

  button.cencel {
    top: 50px;
  }

  button.edit {
    top: 0px;
  }

  .line-left {
    border-left: 4px solid #9d9d9d;
    padding-left: 10px;
  }
`;
const Line = styled.div`
  width: 63px;
  height: 3px;
  background: #00b2a9;
  margin: 1px 0 1px 0;
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
export default Edit;
