import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { getUserGalery } from 'actions';
import { Pagination } from 'components';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

function Galery({ userId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'md';


  const { data } = useSelector((state) => state.userProfile.galery);

  const pageChangeHandler = (event, value) => setPage(value);

  useEffect(() => {
    dispatch(getUserGalery(userId));
  }, [page]);

  const getImage = (image) => {
    if (image.file_type === 'youtube') {
      const Youtube = (function () {
        let video, results;

        const getThumb = function (url, size) {
          if (url === null) {
            return '';
          }
          size = size === null ? 'big' : size;
          results = url.match('[\\?&]v=([^&#]*)');
          video = results === null ? url : results[1];

          if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg';
          }
          return 'http://img.youtube.com/vi/' + video + '/0.jpg';
        };

        return {
          thumb: getThumb,
        };
      })();

      var thumb = Youtube.thumb(image.path, 'small');

      return thumb;
    } else {
      return image.path;
    }
  };

  const New = () => {
    if (content.file_type === 'image') {
      return (
        <img style={{ width: '100%', height: 'auto' }} src={content.path} />
      );
    } else {
      let results = content.path.match('[\\?&]v=([^&#]*)');
      let video = results === null ? content.path : results[1];
      return (
        <iframe
          width='1280'
          height='720'
          src={`https://www.youtube.com/embed/${video}`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          />
      );
    }
  };

  const openModal = (image) => {
    setContent(image);
    setOpen(true);
  };

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {data?.data?.map((image, i) => (
            <div className="img" onClick={() => openModal(image)} key={i} style={{cursor:'pointer'}} >
              <img
                key={image?.name}
                src={`${getImage(image)}`}
                alt={image?.name}
                style={{ width: '90%', display: 'block', borderRadius:'10px'}}
              />
            </div>
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

      <React.Fragment>
        <Dialog
          className="material-dialog"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
        >
          <DialogTitle className="text-center">
            <span
              style={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: '5px 15px',
              }}
              onClick={() => setOpen(false)}
            >
              x
            </span>
          </DialogTitle>
          <DialogContent>
            <div className="d-flex flex-wrap dialog-center">
              <New />
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Galery;
