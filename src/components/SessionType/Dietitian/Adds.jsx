import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { getGeocode } from 'use-places-autocomplete';
import { Svg } from 'components';
import BluePlusIcon from 'assets/blue-plus.svg';

import AddAdress from './AddAdress';
import Edit from './Edit';

const Adds = ({ icons }) => {
  const [subPage, setSubPage] = useState('Adds');

  useEffect(() => {
    getGeocode();
  }, []);

  switch (subPage) {
    case 'Adds':
      return (
        <>
          <CreateList>
            {icons.map((val) => {
              return (
                <>
                  <List key={val.id} className="col-md-3">
                    {val.icon}
                    <Span>{val.name}</Span>
                    {val.create && (
                      <>
                        <Link>
                          <Edits onClick={() => setSubPage(val.create.subPage)}>
                            <Svg.WhitePencil />
                          </Edits>
                        </Link>
                        <Create
                          onClick={() => {
                            setSubPage(val.create.action);
                          }}
                        >
                          {val.create.name}
                          <img
                            src={BluePlusIcon}
                            alt=""
                            width="25px"
                            height="25px"
                            className="ml-2"
                          />
                        </Create>
                      </>
                    )}
                  </List>
                </>
              );
            })}
          </CreateList>
        </>
      );

    case 'home_park':
      return <AddAdress setSubPage={setSubPage} />;

    case 'home-park-edit':
      return <Edit setSubPage={setSubPage} />;

    default:
      return (
        <>
          <CreateList>
            {icons.map((val) => {
              return (
                <>
                  <List key={val.id} className="col-md-3">
                    {val.icon}
                    <Span>{val.name}</Span>
                    {val.create && (
                      <>
                        <Link>
                          <Edits>
                            <Svg.WhitePencil
                              onClick={() => setSubPage(val.create.subPage)}
                            />
                          </Edits>
                        </Link>
                        <Create
                          onClick={() => {
                            setSubPage(val.create.action);
                          }}
                        >
                          {val.create.name}
                        </Create>
                      </>
                    )}
                  </List>
                </>
              );
            })}
          </CreateList>
        </>
      );
  }
};

const CreateList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 15px -15px;
`;

const Edits = styled.span`
  display: flex;
  position: absolute;
  background: var(--blue);
  z-index: 1000;
  bottom: 17px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 5px 30px;
  cursor: pointer;
`;

const Create = styled.span`
  display: flex;
  position: absolute;
  z-index: 1000;
  bottom: -70px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.33);
  flex-wrap: wrap;
  align-content: center;
  margin: 15px;
`;

const Span = styled.span`
  width: 100%;
  display: flex;
  padding: 5px;
  margin-top: 15px;
  justify-content: center;
  position: relative;
`;

const Link = styled.a`
  position: absolute;
  width: 100%;
  display: flex;
  padding: 5px;
  margin-top: 15px;
  justify-content: center;
  bottom: -50px;
  cursor: pointer;
  color: var(--gray);
`;

export default Adds;
