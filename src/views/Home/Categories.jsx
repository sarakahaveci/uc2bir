import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';

import { Title, DefBackground, Svg } from 'components';
import { useHistory } from 'react-router';

const Categories = ({ className, background, children }) => {
  const history = useHistory();

  const handleClick = (name) => {
    if ('FİTNESS' == name) {
      history.push('/packets?type=packets&branch=1#/');
    }
    if ('PİLATES' == name) {
      history.push('/packets?type=packets&branch=3#/');
    }
    if ('TENİS' == name) {
      history.push('/packets?type=packets&branch=6#/');
    }
    if ('YOGA' == name) {
      history.push('/packets?type=packets&branch=32#/');
    }
    if ('KİCK BOKS' == name) {
      history.push('/packets?type=packets&branch=9#/');
    }
    if ('JİMNASTİK' == name) {
      history.push('/packets?type=packets&branch=8#/');
    }
    if ('YÜZME' == name) {
      history.push('/packets?type=packets&branch=35#/');
    }
  };

  return (
    <section className={cx('categories', { [`${className}`]: className })}>
      {background && (
        <div
          className="background-element"
          style={{ backgroundImage: `url(${DefBackground.elementBackground})` }}
        ></div>
      )}
      <Container>
        <Title
          variant="h5"
          component="h5"
          lineDisable={false}
          letterSpacing="100"
        >
          Tarzını Seç, Hemen Branşlara Göz At
        </Title>
        <div className="over-flow-y-auto">
          <ul>
            {Svg.Categories.map((val, key) => (
              <li className="col-4 col-xl col-lg col-md-2 col-sm-3" key={key}>
                <a
                  title={val.name}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {val.svg({ className: 'category-svg' })}{' '}
                  <span style={{ fontWeight: 'normal', fontSize: '18px' }}>
                    {val.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </Container>
    </section>
  );
};

export default Categories;
