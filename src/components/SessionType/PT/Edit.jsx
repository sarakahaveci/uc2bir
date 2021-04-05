import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { Button, Box, Svg, Spinner, Span } from 'components';
import { deleteAddressList, getAddressList } from 'actions';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BackLink from 'components/common/BackLink';

const Edit = ({ setSubPage }) => {
  const dispatch = useDispatch();

  const { getAddress } = useSelector(
    (state) => state.profileSettings2.sessionType
  );

  useEffect(() => {
    dispatch(getAddressList());
  }, []);

  const deleted = (id) => {
    dispatch(
      deleteAddressList(
        id,
        () => {
          dispatch(getAddressList());
          toast.success('Adres başarı ile silindi.', {
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
      <BackLink text="Geri" onClick={() => setSubPage('Adds')} />

      {!getAddress?.isLoading ? (
        <>
          <div className="d-flex flex-wrap">
            <List>
              {getAddress?.data.length > 0 ? (
                getAddress.data.map((val) => (
                  <>
                    <Item>
                      <div className="line-left">
                        <BoldText>{val?.title}</BoldText>
                        <Line></Line>
                        <Box row>
                          <Svg.LocationIcon />

                          <Span ml="5px">
                            {val?.address_detail + '/' + val?.city?.name}
                          </Span>
                        </Box>
                      </div>

                      <Button
                        className="cencel"
                        icon={Svg.CencelIcon}
                        onClick={() => deleted(val?.id)}
                      />
                    </Item>
                  </>
                ))
              ) : (
                <strong>
                  Girilmiş herhangi bir adresiniz bulunmamaktadır.
                </strong>
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
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
export default Edit;
