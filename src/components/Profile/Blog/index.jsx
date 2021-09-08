import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import BlogCard from '../../BlogCard';
import { Pagination } from 'components';
import { getUserBlogs } from 'actions';
import { useHistory } from 'react-router-dom';
export default function Blog({ userId, userName }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);

  const { blogData } = useSelector((state) => state.userProfile.blog);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserBlogs(userId));
  }, []);

  useEffect(() => {
    dispatch(getUserBlogs(userId, page));
  }, [page]);

  const pageChangeHandler = (event, value) => setPage(value);

  return (
    <div className="px-5">
      {blogData?.blogs?.map((blog) => (
        <BlogCard
          key={blog?.id}
          title={blog?.title}
          description={blog?.detail}
          photo={blog?.photo}
          createdTime={blog?.created_at}
          userName={userName}
          detail_url={blog?.seo_friendly_url}
        />
      ))}
      {blogData?.blogs?.length > 0 ? (
        <Pagination
          mt="50px"
          count={blogData?.totalPage}
          page={page}
          onChange={pageChangeHandler}
        />
      ) : (
        (auth?.user.id && auth.user.id === userId && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong>{t('You do not have any approved blog posts')}</strong>
            <text>
              Dilerseniz onaya gönderilen bloglarınızı{' '}
              <text
                onClick={() => {
                  history.push('/myprofile/settings/blog');
                }}
                style={{ color: '#00b2a9', cursor: 'pointer' }}
              >
                buradan
              </text>{' '}
              düzenleyebilirsiniz
            </text>
          </div>
        )) || <strong>{t('There is no user-approved blog post')}</strong>
      )}
    </div>
  );
}
