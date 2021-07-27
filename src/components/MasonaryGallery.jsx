// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import search from './statics/svg/images/plus.svg';
import BluePlusIcon from 'assets/blue-plus.svg';
import { device } from 'utils';
import closeIcon from './statics/svg/images/big-close.svg';
import tickIcon from './statics/svg/images/tick.svg';
import {
  Text,
  Span,
  PlusButton,
  Title,
  AwesomeIcon,
  Button,
  Box,
} from 'components';
import { default as MaterialButton } from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getMyGalleries } from 'actions';
import axios from 'axios';
import FormData from 'form-data';
import { Material } from './inputs/material';
import { resizeFile } from '../utils';

const MasonaryGallery = ({
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
  children = null,
}) => {
  const [activePage, setActivePage] = useState('index');
  const [active, setActive] = useState('all');
  const [type] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

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

  const upload = async () => {
    const resizedFile = await resizeFile(file);
    setLoading(true);
    createData.append('files[]', resizedFile);
    createData.append('type_id', '8');
    createData.append('type', type);
    createData.append('link', link);
    createData.append('name', link);
    axios({ ...config, data: createData })
      .then(function () {
        dispatch(getMyGalleries());
        setActivePage('index');
        setFile(false);
        setLoading(false);
        toast.success('Dosya yüklendi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      })
      .catch(function () {
        setLoading(false);
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
        />
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
          <Box
            row
            alignItems="center"
            m="15px"
            className="justify-content-start"
          >
            <Span color="dark" fontWeight="500" fontSize="0.8rem" mr="7px">
              Dosya yükle
            </Span>

            <PlusButton onClick={() => setActivePage('create')} />
          </Box>
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
          <GridWrapper>
            {active === 'all' &&
              myGalleries?.data?.data?.map((image, i) => {
                return (
                  <StyledCard key={i}>
                    <Div padding={15} id={image.id}>
                      {image.status && (
                        <Icon
                          img={tickIcon}
                          name={image.id}
                          top="35px"
                          cursor="default"
                        />
                      )}
                      <Icon
                        img={closeIcon}
                        name={image.id}
                        top="0px"
                        onClick={(e) => deleted(e.target.name)}
                        cursor="pointer"
                      />
                      <div className="img" onClick={() => openModal(image)}>
                        <img
                          key={i}
                          src={`${getImage(image)}`}
                          style={{
                            width: '100%',
                            display: 'block',
                            objectFit: 'cover',
                          }}
                          alt={image.name}
                        />
                      </div>
                    </Div>
                  </StyledCard>
                );
              })}
            {active === 'image' &&
              myGalleries?.data?.data?.map((image, i) => {
                if (image.file_type == 'image') {
                  return (
                    <StyledCard>
                      <Div padding={15} id={image.id}>
                        {image.status && (
                          <Icon
                            img={tickIcon}
                            name={image.id}
                            top="35px"
                            cursor="default"
                          />
                        )}
                        <Icon
                          img={closeIcon}
                          name={image.id}
                          top="0px"
                          onClick={(e) => deleted(e.target.name)}
                          cursor="pointer"
                        />
                        <div className="img" onClick={() => openModal(image)}>
                          <img
                            key={i}
                            src={`${getImage(image)}`}
                            style={{
                              width: '100%',
                              display: 'block',
                              objectFit: 'cover',
                            }}
                            alt={image.name}
                          />
                        </div>
                      </Div>
                    </StyledCard>
                  );
                }
              })}
            {active === 'youtube' &&
              myGalleries?.data?.data?.map((image, i) => {
                if (image.file_type == 'youtube')
                  return (
                    <StyledCard>
                      <Div padding={15} id={image.id}>
                        {image.status && (
                          <Icon
                            img={tickIcon}
                            name={image.id}
                            top="35px"
                            cursor="default"
                          />
                        )}
                        <Icon
                          img={closeIcon}
                          name={image.id}
                          top="0px"
                          onClick={(e) => deleted(e.target.name)}
                          cursor="pointer"
                        />
                        <div className="img" onClick={() => openModal(image)}>
                          <img
                            key={i}
                            src={`${getImage(image)}`}
                            style={{
                              width: '100%',
                              display: 'block',
                              objectFit: 'cover',
                            }}
                            alt={image.name}
                          />
                        </div>
                      </Div>
                    </StyledCard>
                  );
              })}
          </GridWrapper>
        </>
      )}
      {activePage === 'create' && (
        <Div padding={15}>
          <AddButton onClick={() => setActivePage('action-video')}>
            <img src={BluePlusIcon} alt="" width="25px" height="25px" />
            <Button text="Video Yükle" fontSize="11pt" color="blue" />
          </AddButton>

          <AddButton
            style={{ marginLeft: '10px' }}
            onClick={() => setActivePage('action')}
          >
            <img src={BluePlusIcon} alt="" width="25px" height="25px" />
            <Button text="Fotoğraf Yükle" fontSize="11pt" color="blue" />
          </AddButton>
        </Div>
      )}
      {activePage === 'action' && (
        <Div padding={15}>
          {!file && (
            <>
              <Button text="< Geri" onClick={() => setActivePage('index')} />
              <MaterialButton
                style={{
                  border: '1px solid var(--blue)',
                  backgroundColor: 'transparent',
                  color: '#00b2a9',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
                variant="contained"
                component="label"
              >
                Bilgisayarımdan Yükle
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
                {!loading && <PlusButton onClick={upload} />}

                <AwesomeIcon.FaClose
                  className="close-icon"
                  onClick={() => setFile(false)}
                />
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

const GridWrapper = styled.div`
  display: grid;
  grid-column-gap: 20px;
  justify-content: center;
  grid-template-columns: 400px 400px 400px;
  grid-row-gap: 10px;
  padding: 10px;
  margin-top: 15px;

  @media (max-width: 1200px) {
    grid-template-columns: 400px 400px;
  }
  @media ${device.sm} {
    grid-template-columns: auto;
  }
`;

const Section = styled.section`
  height: auto;
`;

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: whitesmoke;
  padding: 10px;
  max-width: 300px;
  max-height: 300px;
  aspect-ratio: 1;
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
  display: flex;

  .close-icon {
    margin-left: 15px;
    width: 25px;
    height: 25px;
  }

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
  cursor: ${(props) => props.cursor};
  background-image: url('${(props) => props.img}');
  width: 20px;
  height: 20px;
  background-size: cover;
  right: -15px;
  top: ${(props) => props.top};
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
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
