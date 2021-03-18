import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { Button, AwesomeIcon, Svg, Spinner } from 'components';
import { getAddressList } from 'actions';
import { useSelector, useDispatch } from 'react-redux';

const Edit = ({ setSubPage }) => {
  const dispatch = useDispatch();

  const { getAddress } = useSelector(
    (state) => state.profileSettings2.sessionType
  );

  useEffect(() => {
    dispatch(
      getAddressList(
        () => {},
        () => {}
      )
    );
  }, []);

  return (
    <>
      <Button text="< Geri" onClick={() => setSubPage('Adds')} />
      {!getAddress?.isLoading ? (
        <>
          <div className="d-flex flex-wrap">
            <List>
              {getAddress?.data.length > 0 &&
                getAddress.data.map((val) => (
                  <>
                    <Item>
                      <div className="line-left">
                        <div>{val?.city?.name}</div>
                        <div>
                          <span>
                            <AwesomeIcon.Map />
                          </span>{' '}
                          {val?.address_detail}
                        </div>
                      </div>
                      <Button className="edit" icon={Svg.EditIcon} />
                      <Button className="cencel" icon={Svg.CencelIcon} />
                    </Item>
                  </>
                ))}
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

export default Edit;
