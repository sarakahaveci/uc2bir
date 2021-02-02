import React from 'react';
import Title from '../typography/title';
import Text from '../typography/text';
import Button from '../buttons/button';
import LabelText from '../typography/LabelText';

/* bunu şimdilik ekliyoruz */
// @ts-ignore
import img from '../../images/blog/image-1.png';

const initialData = {
  img: '',
  author: '',
  title: '',
  text: '',
  link: '',
};

const BlogBanners = ({
  left = false,
  right = false,
  top = false,
  bottom = false,
  data = initialData,
}) => {
  const leftBlog = () => {
    return (
      <div className="row">
        <div
          className="col-xl-6 blog-items img"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div className="col-xl-6 blog-items text">
          <Title
            variant="h5"
            component="h5"
            textLeft
            children="Quis autem vel eum iure qui inea voluptate velit esse quam nihil"
            lineDisable
          />
          <Text fontSize="10pt">
            There are many variations of passages of Lorem Ipsum available the
            majority have suffered alteration in some form, by injected humour,
            or randomised don't look even slightly believable alteration in lore
            ipsu..
          </Text>
          <LabelText label="Yazar:" children="DYT, Ezgi FINDIK" />
          <Button perspective className="bl-btn" text="Devamını Oku" />
        </div>
      </div>
    );
  };

  const rightBlog = () => {
    return (
      <div className="row">
        <div
          className="col-xl-6 order-xl-2 blog-items img"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div className="col-xl-6 order-xl-1 blog-items text">
          <Title
            variant="h5"
            component="h5"
            textLeft
            children="Quis autem vel eum iure qui inea voluptate velit esse quam nihil"
            lineDisable
          />
          <Text fontSize="10pt">
            There are many variations of passages of Lorem Ipsum available the
            majority have suffered alteration in some form, by injected humour,
            or randomised don't look even slightly believable alteration in lore
            ipsu..
          </Text>
          <LabelText label="Yazar:" children="DYT, Ezgi FINDIK" />
          <Button perspective className="bl-btn blue" text="Devamını Oku" />
        </div>
      </div>
    );
  };

  const topBlog = () => {
    return (
      <div className="row">
        <div
          className="col-xl-12 blog-items img"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div className="col-xl-12 blog-items text">
          <Title
            variant="h5"
            component="h5"
            textLeft
            children="Quis autem vel eum iure qui inea voluptate velit esse quam nihil"
            lineDisable
          />
          <Text fontSize="10pt">
            There are many variations of passages of Lorem Ipsum available the
            majority have suffered alteration in some form, by injected humour,
            or randomised don't look even slightly believable alteration in lore
            ipsu..
          </Text>
          <LabelText label="Yazar:" children="DYT, Ezgi FINDIK" />
          <Button perspective className="bl-btn" text="Devamını Oku" />
        </div>
      </div>
    );
  };

  const bottomBlog = () => {
    return (
      <div className="row">
        <div className="col-xl-12 blog-items text">
          <Title
            variant="h5"
            component="h5"
            textLeft
            children="Quis autem vel eum iure qui inea voluptate velit esse quam nihil"
            lineDisable
          />
          <Text fontSize="10pt">
            There are many variations of passages of Lorem Ipsum available the
            majority have suffered alteration in some form, by injected humour,
            or randomised don't look even slightly believable alteration in lore
            ipsu..
          </Text>
          <LabelText label="Yazar:" children="DYT, Ezgi FINDIK" />
          <Button perspective className="bl-btn" text="Devamını Oku" />
        </div>
        <div
          className="col-xl-12 blog-items img"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    );
  };
  return (
    <section className="blog-banner">
      {left && leftBlog()}
      {right && rightBlog()}
      {top && topBlog()}
      {bottom && bottomBlog()}
    </section>
  );
};

export default BlogBanners;
