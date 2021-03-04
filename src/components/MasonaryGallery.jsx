// @ts-nocheck
import React, { useState, useEffect } from 'react';

import styled from 'styled-components/macro';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import editIcon from './statics/svg/images/pencil.svg';
import closeIcon from './statics/svg/images/big-close.svg';
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

import { getMyProfileFiles, updateFile } from 'actions';
import axios from 'axios';
import FormData from 'form-data';

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
      item: 'photo',
      name: 'Fotoğraflar',
    },
    {
      id: 3,
      item: 'video',
      name: 'Videolar',
    },
  ],
  className = null,
  style = {},
  columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 },
  children,
}) => {
  const [activePage, setActivePage] = useState('index');
  const [active, setActive] = useState('all');
  const [file, setFile] = React.useState('');
  const { accessToken } = useSelector((state) => state.auth);

  const { data: fileGroupsArr } = useSelector(
    (state) => state.profileSettings.files
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProfileFiles());
  }, []);

  const createData = new FormData();
  createData.append('files[]', file);
  createData.append('type_id', '8');

  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/user/profile/file`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const upload = () => {
    axios({ ...config, data: createData })
      .then(function (response) {
        toast.success('Dosya yüklendi.', {
          position: 'bottom-right',
          autoClose: 2000,
          onClose: () => {
            dispatch(getMyProfileFiles());
            return setFile(false);
          },
        });
      })
      .catch(function (err) {
        toast.error('Dosya gönderilemedi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
  };

  const deleted = (id) => {
    console.log(id);
    axios.delete(`${process.env.REACT_APP_API_URL}/user/profile/file/${id}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        toast.success('Dosya silindi.', {
          position: 'bottom-right',
          autoClose: 2000,
          onClose: () => {
            dispatch(getMyProfileFiles());
            return setFile(false);
          },
        });
      })
      .catch(function (err) {
        toast.error('Dosya silinemedi.', {
          position: 'bottom-right',
          autoClose: 2000,
        });
      });
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
              <AwesomeIcon.Left />
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
              {fileGroupsArr
                ?.filter((f) => f.name === 'Galeri')?.[0]
                ?.files.map((image, i) => (
                  <Div padding={15}>
                    <Icon
                      img={editIcon}
                      top="15px"
                      onClick={() =>
                        dispatch(
                          updateFile(image.id, image, () =>
                            dispatch(getMyProfileFiles())
                          )
                        )
                      }
                    />
                    <Icon img={closeIcon} name={image.id} top="45px" onClick={(e) => deleted(e.target.name)} />
                    <img
                      key={i}
                      src={image.path}
                      style={{ width: '100%', display: 'block' }}
                      alt={image.name}
                    />
                  </Div>
                ))}
            </Masonry>
          </ResponsiveMasonry>
          <Row className="justify-content-end">
            <Span color="dark" fontWeight="500" fontSize="0.8rem" mr="7px">
              Dosya yükle
            </Span>
            <PlusButton onClick={() => setActivePage('create')}>+</PlusButton>
          </Row>
        </>
      )}
      {activePage === 'create' && (
        <Div padding={15}>
          <Button
            text="Fotoğraf Çek"
            style={{ border: '1px solid var(--blue)' }}
            fontSize="11pt"
            color="blue"
          />
          <Button
            text="Bilgisayarımdan Yükle"
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
              <MaterialButton
                variant="contained"
                color="default"
                component="label"
                startIcon={<Svg.Pencil />}
              >
                Fotoğraf veya Video Yükle
                <input
                  type="file"
                  hidden
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </MaterialButton>
              <Button text="Geri" onClick={() => setActivePage('index')} />
            </>
          )}
          {file && (
            <>
              <ImageShow image={URL.createObjectURL(file)} />
              <section className="d-flex">
                <PlusButton onClick={upload}>+</PlusButton>
                <PlusButton
                  style={{ marginLeft: 7 }}
                  onClick={() => setFile(false)}
                >
                  <AwesomeIcon.FaClose />
                </PlusButton>
              </section>
            </>
          )}
        </Div>
      )}
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
  width: 350px;
  height: 350px;
  background-image: url('${(props) => props.image}');
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
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
