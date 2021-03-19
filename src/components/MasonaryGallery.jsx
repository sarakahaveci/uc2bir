// @ts-nocheck
import React, { useState, useEffect } from 'react';

import styled from 'styled-components/macro';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import search from './statics/svg/images/plus.svg';

import closeIcon from './statics/svg/images/big-close.svg';
import tickIcon from './statics/svg/images/tick.svg';
import {
  Text,
  Span,
  PlusButton,
  Title,
  AwesomeIcon,
  Button,
  Svg,
} from 'components';
import { Row } from 'react-bootstrap';
import { default as MaterialButton } from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getMyGalleries } from 'actions';
import axios from 'axios';
import FormData from 'form-data';
import { Material } from './inputs/material';

const MasonaryGallery = ({
  gutter = '10px',
  columnsCount = 3,
  categories = [
    {
      id: 1,
      item: 'all',
      name: 'Tümü',
    },
    {
      id: 2,
      item: 'image',
      name: 'Fotoğraflar',
    },
    {
      id: 3,
      item: 'youtube',
      name: 'Videolar',
    },
  ],
  className = null,
  style = {},
  columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 },
  children = null,
}) => {
  const [activePage, setActivePage] = useState('index');
  const [active, setActive] = useState('all');
  const [type] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');

  const { accessToken } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'md';

  const myGalleries = useSelector((state) => state.myGalleries.me);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyGalleries());
  }, []);

  const createData = new FormData();

  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/gallery/create`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const delete_config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/gallery/destroy`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const uploadLink = () => {
    createData.append('type_id', '8');
    createData.append('type', 'youtube');
    createData.append('link', link);
    createData.append('name', link);
    axios({ ...config, data: createData })
      .then(function () {
        dispatch(getMyGalleries());
        setActivePage('index');
        setFile(false);
        toast.success('Dosya yüklendi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      })
      .catch(function () {
        toast.error('Dosya gönderilemedi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
  };

  const upload = () => {
    createData.append('files[]', file);
    createData.append('type_id', '8');
    createData.append('type', type);
    createData.append('link', link);
    createData.append('name', link);
    axios({ ...config, data: createData })
      .then(function () {
        dispatch(getMyGalleries());
        setActivePage('index');
        setFile(false);
        toast.success('Dosya yüklendi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      })
      .catch(function () {
        toast.error('Dosya gönderilemedi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
  };

  const deleted = (gallery_id) => {
    axios({ ...delete_config, data: { gallery_id } })
      .then(function () {
        dispatch(getMyGalleries());
        toast.success('Dosya silindi.', {
          position: 'bottom-right',
          autoClose: 2000,
          onClose: () => {
            return setFile(false);
          },
        });
      })
      .catch(function () {
        toast.error('Dosya silinemedi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
  };

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
          width="1280"
          height="720"
          src={`https://www.youtube.com/embed/${video}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
  };

  const openModal = (image) => {
    setContent(image);
    setOpen(true);
  };

  return (
    <Section className={className} style={style}>
      {activePage === 'create' && (
        <Div padding={15}>
          <Title
            style={{ display: 'flex', flexWrap: 'nowrap' }}
            textAlign="left"
          >
            <Span
              cursor="pointer"
              fontSize="1.5rem"
              onClick={() => setActivePage('index')}
              marginRight="10px"
              marginBottom="-15px"
            >
              {`<`}
            </Span>
            <Span>Fotoğraf / Video Yükle</Span>
          </Title>
        </Div>
      )}
      {children ? (
        <Text style={{ padding: 15 }}>children</Text>
      ) : (
        <Text style={{ padding: 15 }}>
          Galerinize eklediğiniz fotoğraf ve videolar sizin hakkınızda bilgi
          verici olacaktır.
        </Text>
      )}
      {activePage === 'index' && (
        <>
          <Row style={{ margin: 15 }} className="justify-content-start">
            <Span color="dark" fontWeight="500" fontSize="0.8rem" mr="7px">
              Dosya yükle
            </Span>
            <PlusButton onClick={() => setActivePage('create')}>+</PlusButton>
          </Row>
          <StyledCategories>
            {categories.map((category, i) => (
              <Item
                active={active === category.item}
                key={i}
                onClick={() => setActive(category.item)}
              >
                {category.name}
              </Item>
            ))}
          </StyledCategories>

          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry columnsCount={columnsCount} gutter={gutter}>
              {myGalleries?.data?.data?.map((image, i) =>
                active === 'all' ? (
                  <>
                    <Div padding={15} id={image.id}>
                      <Icon
                        img={image.status ? tickIcon : closeIcon}
                        name={image.id}
                        top="0px"
                        onClick={(e) =>
                          image.status ? '' : deleted(e.target.name)
                        }
                      />
                      <div className="img" onClick={() => openModal(image)}>
                        <img
                          key={i}
                          src={`${getImage(image)}`}
                          style={{ width: '100%', display: 'block' }}
                          alt={image.name}
                        />
                      </div>
                    </Div>
                  </>
                ) : (
                  <>
                    {active === image.file_type && (
                      <Div padding={15} id={image.id}>
                        <Icon
                          img={image.status ? tickIcon : closeIcon}
                          name={image.id}
                          top="0px"
                          onClick={(e) =>
                            image.status ? '' : deleted(e.target.name)
                          }
                        />
                        <div className="img" onClick={() => openModal(image)}>
                          <img
                            key={i}
                            src={`${getImage(image)}`}
                            style={{ width: '100%', display: 'block' }}
                            alt={image.name}
                          />
                        </div>
                      </Div>
                    )}
                  </>
                )
              )}
            </Masonry>
          </ResponsiveMasonry>
        </>
      )}
      {activePage === 'create' && (
        <Div padding={15}>
          <Button
            text="Video Yükle"
            style={{ border: '1px solid var(--blue)' }}
            fontSize="11pt"
            onClick={() => setActivePage('action-video')}
            color="blue"
          />
          <Button
            text="Fotoğraf Yükle"
            style={{ border: '1px solid var(--blue)', marginLeft: '15px' }}
            onClick={() => setActivePage('action')}
            fontSize="11pt"
            color="blue"
          />
        </Div>
      )}
      {activePage === 'action' && (
        <Div padding={15}>
          {!file && (
            <>
              <Button text="< Geri" onClick={() => setActivePage('index')} />
              <MaterialButton
                variant="contained"
                color="default"
                component="label"
                startIcon={<Svg.Pencil />}
              >
                Fotoğraf Yükle
                <input
                  type="file"
                  hidden
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </MaterialButton>
            </>
          )}
          {file && (
            <>
              <ImageShow image={URL.createObjectURL(file)} />
              <section className="d-flex">
                <PlusButton onClick={upload} />
                <div style={{ marginLeft: 15 }}>
                  {' '}
                  <PlusButton onClick={() => setFile(false)}>
                    <AwesomeIcon.FaClose />
                  </PlusButton>{' '}
                </div>
              </section>
            </>
          )}
        </Div>
      )}
      {activePage === 'action-video' && (
        <Div padding={15}>
          {!file && (
            <>
              <Button text="< Geri" onClick={() => setActivePage('index')} />
            </>
          )}
          <>
            <div className="w-100" style={{ marginTop: 15 }}>
              <Material.TextField
                label="Youtube link' i gir veya boş bırak."
                name="link"
                onChange={(e) => setLink(e.target.value)}
              />
              <div style={{ marginTop: 15 }}>
                <PlusButton onClick={uploadLink} />
              </div>
            </div>
          </>
        </Div>
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
    </Section>
  );
};

const Section = styled.section`
  height: auto;
`;

const ImageShow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 450px;
  background-image: url('${(props) => props.image}');
  background-repeat: no-repeat;
  position: relative;
  background-size: contain;
  margin: 15px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Div = styled.div`
  padding: ${(props) => `${props.padding}px`};
  position: relative;
  cursor: pointer;

  .img {
    position: relative;

    &:hover {
      &:before {
        content: '';
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 3em;
        background: rgba(255, 255, 255, 0.7);
        background-image: url(${search});
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
`;

const Icon = styled.a`
  position: absolute;
  cursor: pointer;
  background-image: url('${(props) => props.img}');
  width: 20px;
  height: 20px;
  background-size: cover;
  right: -15px;
  top: ${(props) => props.top};
`;

const StyledCategories = styled.ul`
  position: relative;
  display: flex;
`;

const Item = styled.li`
  position: relative;
  padding-top: 15px;
  cursor: pointer;
  margin: 15px;
  font-size: 11pt;

  ${(props) =>
    props.active &&
    `
    color: var(--blue);
    padding-bottom: 2px;
    border-bottom: 2px solid var(--blue);
  `}
`;

export default MasonaryGallery;
