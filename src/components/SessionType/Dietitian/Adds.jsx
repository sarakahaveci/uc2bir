import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { getGeocode } from 'use-places-autocomplete';
import BluePlusIcon from 'assets/blue-plus.svg';
import { useTranslation } from 'react-i18next';

import { Svg } from 'components';
import AddAdress from '../AddAdress';
import Edit from './Edit';
import { device } from 'utils';
const Adds = ({ icons, selected, get, setPage }) => {
  const { t } = useTranslation();

  const [subPage, setSubPage] = useState('Adds');

  useEffect(() => {
    getGeocode();
  }, []);

  switch (subPage) {
    case 'Adds':
      return (
        <>
          <div style={{ display: 'flex', cursor: 'pointer' }}>
            <Svg.EditIcon></Svg.EditIcon>
            <BoldText
              style={{ marginLeft: '5px' }}
              onClick={() => setPage('Home')}
            >
              {t('Add / Remove Session Type')}
            </BoldText>
          </div>

          <CreateList className="row">
            {icons?.filter(
                (item) =>
                  get.data.data?.filter((e) => e.type === item.id).length > 0 ||
                  selected?.filter((e) => e === item.id).length > 0 //Bu fonksiyon sadece get den gelen iconları renderlamayı saglar (içerdeki filter sadece sorgu amaçlıdır)
              )
              .map((val) => {
                return (
                  <>
                    <List key={val.id} className="col-md-3 col-sm-12">
                      {val.icon}
                      <Span>{val.name}</Span>
                      {val.create && (
                        <>
                          <Link>
                            <Edits
                              onClick={() => setSubPage(val.create.subPage)}
                            >
                              <Svg.WhitePencil />
                              <text
                                style={{ marginLeft: '5px', color: 'white' }}
                              >
                                {t('Edit my addresses')}
                              </text>
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
      return <AddAdress setSubPage={setSubPage} type="clinic" />;

    case 'home-park-edit':
      return <Edit setSubPage={setSubPage} />;

    default:
      return (
        <>
          <CreateList className="row">
            {icons.map((val) => {
              return (
                <>
                  <List key={val.id} className="col-md-3 col-sm-12">
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

  @media (max-width: 720px) {
    margin: 0;
    margin-bottom: 70px;
  }
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
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
export default Adds;
