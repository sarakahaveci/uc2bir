import React, { useState } from 'react';
import styled from 'styled-components/macro';

import AddAdress from './AddAdress';
import AddGym from './AddGym';

const Adds = ({ icons }) => {
  const [subPage, setSubPage] = useState('Adds');

  return (
    console.log(subPage),
    <>
      {subPage === 'Adds' && (
        <CreateList>
          {icons.map((val) => {
            return (
              <>
                <List key={val.id} className="col-md-3">
                  {val.icon}
                  <Span>{val.name}</Span>
                  {val.create && (
                    <Link onClick={() => setSubPage(val.create.action)}>
                      {val.create.name}
                    </Link>
                  )}
                </List>
              </>
            );
          })}
        </CreateList>
      )}
      {subPage === 'home_park' && <AddAdress />}
      {subPage === 'gym' && <AddGym />}
    </>
  );
};

const CreateList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 15px -15px;
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
