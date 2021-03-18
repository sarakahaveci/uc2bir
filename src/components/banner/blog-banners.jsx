/* eslint-disable react/no-children-prop */
import React from 'react';
import Title from '../typography/Titles';
import Text from '../typography/Text';
import Button from '../buttons/button';
import LabelText from '../typography/LabelText';
import { useHistory } from 'react-router-dom';

const BlogBanners = ({
  left = false,
  right = false,
  top = false,
  bottom = false,
  data = [],
}) => {
  const history = useHistory();
  const go = () => {
    return history.push('/blog-detail/' + data?.seo_friendly_url);
  };
  const leftBlog = () => {
    return (
      <div className="row">
        <div
          className="col-xl-12 blog-items img"
          style={{ backgroundImage: `url(${data?.photo})` }}
        ></div>
        <div className="col-xl-12 blog-items text">
          <Title variant="h5" component="h5" textLeft lineDisable>
            {data?.title}
          </Title>
          <Text fontSize="10pt">{data?.detail}</Text>
          <LabelText label="Yazar:" fontSize="0.8rem">
            {data?.description}
          </LabelText>
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

  const rightBlog = () => {
    return (
      <div className="row">
        <div
          className="col-xl-12 order-xl-2 blog-items img"
          style={{ backgroundImage: `url(${data?.photo})` }}
        ></div>
        <div className="col-xl-12 order-xl-1 blog-items text">
          <Title variant="h5" component="h5" textLeft lineDisable>
            {data?.title}
          </Title>
          <Text fontSize="10pt">{data?.detail}</Text>
          <LabelText label="Yazar:" fontSize="0.8rem">
            {data?.description}
          </LabelText>
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

  const topBlog = () => {
    return (
      <div className="row">
        <div
          className="col-xl-12 blog-items img"
          style={{ backgroundImage: `url(${data?.photo})` }}
        ></div>
        <div className="col-xl-12 blog-items text">
          <Title variant="h5" component="h5" textLeft lineDisable>
            {data?.title}
          </Title>
          <Text fontSize="10pt">{data?.detail}</Text>
          <LabelText label="Yazar:" fontSize="0.8rem">
            {data?.description}
          </LabelText>
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

  const bottomBlog = () => {
    return (
      <div className="row">
        <div className="col-xl-12 blog-items text">
          <Title variant="h5" component="h5" textLeft lineDisable>
            {data?.title}
          </Title>
          <Text fontSize="10pt">{data?.detail}</Text>
          <LabelText label="Yazar:" fontSize="0.8rem">
            {data?.description}
          </LabelText>
          <Button
            perspective
            className="bl-btn"
            text="Devamını Oku"
            onClick={go}
          />
        </div>
        <div
          className="col-xl-12 blog-items img"
          style={{ backgroundImage: `url(${data?.photo})` }}
        ></div>
      </div>
    );
  };
  return (
    <section className="blog-banner">
      {data?.id && left && leftBlog()}
      {data?.id && right && rightBlog()}
      {data?.id && top && topBlog()}
      {data?.id && bottom && bottomBlog()}
    </section>
  );
};

export default BlogBanners;
