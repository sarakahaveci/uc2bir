import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { colorGenerator } from 'utils';

const List = ({
  dropDown = [],
  className = null,
  children = null,
  dropClassName = null,
  linkPath,
}) => {
  const history = useHistory();

  const pushToLink = () => {
    history.push(linkPath);
  };

  return (
    <Lists className={className} onClick={pushToLink}>
      <Item>
        {children}
        {dropDown.length > 0 && (
          <Lists className={`drop-down ${dropClassName}`}>
            {dropDown.map((val, key) => (
              <Item
                className={`col ${val.tabs?.length > 0 && 'drop-li'}`}
                key={key}
              >
                <A onClick={val.onClick} to={val.link}>
                  {val.icon && <Icon className="item-icon">{val.icon}</Icon>}
                  <Span>
                    {val.name}
                    {val.tabs?.length > 0 && (
                      <Notify>{val.tabs?.length}</Notify>
                    )}
                  </Span>
                </A>
                {/* recursive menu */}
                {val.tabs?.length > 0 && (
                  <List dropClassName="ul-drop-down" dropDown={[...val.tabs]} />
                )}
              </Item>
            ))}
          </Lists>
        )}
      </Item>
    </Lists>
  );
};

const Lists = styled.ul`
  list-style-type: none;
  margin: 0px !important;
`;

const Item = styled.li`
  visibility: visible;
`;

const A = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Icon = styled.span`
  display: inline-flex;
`;

const Span = styled.span`
  display: inline-flex;
  position: relative;
`;

const Notify = styled.div`
  position: absolute;
  border-radius: 100%;
  background: ${colorGenerator('blue')};
  right: -25px;
  top: -5px;
  font-size: 9pt;
  font-weight: bold;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export default List;
