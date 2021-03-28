import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogCard from '../../BlogCard';
import { Pagination } from 'components';
import { getUserBlogs } from 'actions';

export default function Blog({ userId }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { blogData } = useSelector((state) => state.userProfile.blog);

  useEffect(() => {
    dispatch(getUserBlogs(userId));
  }, []);

  useEffect(() => {
    dispatch(getUserBlogs(userId, page));
  }, [page]);

  const pageChangeHandler = (event, value) => setPage(value);

  return (
    <div>
      {blogData?.blogs?.map((blog) => (
        <BlogCard
          key={blog?.id}
          title={blog?.title}
          description={blog?.detail}
          photo={blog?.photo}
          createdTime={blog?.created_at}
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
        <strong>Kullanıcıya ait blog yazısı bulunmamaktadır</strong>
      )}
    </div>
  );
}
