import React from 'react'

import BlogCart from './BlogCart'

export default function BlogCartList({blogs}) {

    return (
        <div className="blog-cart-list">
        {blogs?.slice(0, 3).map((blog, i) => (
          <BlogCart key={blog.id} blogOrder={i} data={blog} />
        ))}
      </div>
    )
}
