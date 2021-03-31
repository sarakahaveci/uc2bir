import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { getUserGalery } from 'actions';
import { Pagination } from 'components';

function Galery({ userId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { data } = useSelector((state) => state.userProfile.galery);

  const pageChangeHandler = (event, value) => setPage(value);

  useEffect(() => {
    dispatch(getUserGalery(userId));
  }, [page]);

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {data?.data?.map((image) => (
            <img
              key={image?.name}
              src={image?.path}
              alt={image?.name}
              style={{ width: '100%', display: 'block' }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {data?.data?.length > 0 ? (
        <Pagination
          mt="50px"
          count={data?.totalPage}
          page={page}
          onChange={pageChangeHandler}
        />
      ) : (
        <div className="d-flex">
          <strong className="mx-auto">
            Kullanıcının eklediği görsel bulunmamaktadır.
          </strong>
        </div>
      )}
    </div>
  );
}

export default Galery;
