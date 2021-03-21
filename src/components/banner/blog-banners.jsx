import React from 'react';
import Button from '../buttons/button';
import { useHistory } from 'react-router-dom';
import cx from 'classnames'

import isNumberEven from 'utils/isNumberEven'

const BlogBanners = ({
  blogOrder,
  data = [],
}) => {
  const history = useHistory();
  const go = () => {
    return history.push('/blog-detail/' + data?.seo_friendly_url);
  };

  const isOrderEven = isNumberEven(blogOrder) 

  return (
    <div className="blog-banner">
      <div  className={cx("blog-banner__top", {"order-xl-1": !isOrderEven})} >
        <img src={data?.photo} alt={data?.title} />
      </div>
      <div className={cx("blog-banner__bottom", {"order-xl-0": !isOrderEven})} >
        <div className="blog-banner__title">
          {data?.title}
        </div>
        <div className="blog-banner__detail">{data?.detail}</div>
         <div className="blog-banner__writer">{data?.writer ? `Yazar : ${data.writer}` : ''}</div> 
        
        <Button
            perspective
            className="bl-btn"
            text="Devamını Oku"
            onClick={go}
          />
      </div>
    </div>
  );
};

export default BlogBanners;
