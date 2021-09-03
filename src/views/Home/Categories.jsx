import React from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { Title, DefBackground, Svg } from 'components';
import { useHistory } from 'react-router';
import { getSearchResults } from 'actions';
import { useTranslation } from 'react-i18next';
const Categories = ({ className, background, children }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSuccessSearch = () => {
  };

  const handleSearch = async (val) => {
    await dispatch(getSearchResults(val.toLocaleLowerCase(), handleSuccessSearch));
    history.push('/search/' + val.toLocaleLowerCase('tr'));
  };

  return (
    <section className={cx('categories', { [`${className}`]: className })}>
      {background && (
        <div
          className="background-element"
          style={{ backgroundImage: `url(${DefBackground.elementBackground})` }}
        ></div>
      )}
      <Container >
        <Title
          variant="h5"
          component="h5"
          lineDisable={false}
          letterSpacing="100"
        >
          {t('slogan_1')}
        </Title>
        <div className="over-flow-y-auto">
          <ul>
            {Svg.Categories.map((val, key) => (
              <li className="col-4 col-xl col-lg col-md-2 col-sm-3" key={key}>
                <a
                  title={val.name}
                  onClick={() => {
                    handleSearch(val.name);
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
