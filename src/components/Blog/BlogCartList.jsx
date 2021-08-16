import React from 'react';

import BlogCart from './BlogCart';

export default function BlogCartList({ blogs }) {
  return (
    <div className="blog-cart-list">
      {blogs?.map((blog, i) => (
        <BlogCart key={blog.id} blogOrder={i} data={blog} />
      ))}
    </div>
  );
}
