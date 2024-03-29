import React from 'react';
import Button from '../buttons/button';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import isNumberEven from 'utils/isNumberEven';

const BlogCart = ({ blogOrder, data = [] }) => {
  const { t } = useTranslation();

  const history = useHistory();
  const go = () => {
    return history.push('/blog-detail/' + data?.seo_friendly_url);
  };

  const isOrderEven = isNumberEven(blogOrder);

  return (
    <div className="blog-cart">
      <div className={cx('blog-cart__left', { 'order-xl-1': !isOrderEven })}>
        <img src={data?.photo} alt={data?.title} />
      </div>
      <div className={cx('blog-cart__right', { 'order-xl-0': !isOrderEven })}>
        <div className="blog-cart__title">{data?.title}</div>
        <div className="blog-cart__detail">{data?.detail}</div>
        <div className="blog-cart__writer">
          {data?.writer ? `Yazar : ${data.writer}` : ''}
        </div>

        <Button
          perspective
          className="bl-btn"
          text={t('ReadMore')}
          onClick={go}
        />
      </div>
    </div>
  );
};

export default BlogCart;
