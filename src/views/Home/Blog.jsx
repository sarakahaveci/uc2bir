import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames'

import { BlogBanners, Button, Title } from 'components';
import { getBlogList } from 'actions';

const Blog = ({className}) => {
  const history = useHistory();
  const {
    data: { blogs },
  } = useSelector((state) => state?.myBlogs?.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogList());
  }, []);

  return (
     (
      <section className={cx('blog' , { [`${className}`]: className })}>
        <Title  variant="h3" component="h3" lineDisable={false} fontWeight={500}>
          Blog
        </Title>
        <Container fluid>
            <div className="blog__content">
            {blogs?.slice(0, 3).map((blog, i) => (
                <BlogBanners key={blog.id}  blogOrder={i} data={blog} />
            ))}
            </div>
            <div
              className="col d-flex justify-content-center"
            >
              <Button
                lineButton
                text="Tümünü Gör"
                onClick={() => history.push('/blog-list')}
              />
            </div>
        </Container>
      </section>
    )
  );
};

export default Blog;
