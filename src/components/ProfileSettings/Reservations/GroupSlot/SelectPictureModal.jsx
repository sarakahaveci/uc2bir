import React, { useState, forwardRef, useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
//import { default as MaterialButton } from '@material-ui/core/Button';
import Masonry from 'react-responsive-masonry';
import { getGroupImages } from 'actions';
import { useDispatch } from 'react-redux';
import { Svg, Box, Modal, Button, SearchInput, Title } from 'components';
import { useTranslation } from 'react-i18next';

const TemplateNamingModal = forwardRef(
  (
    { selectedImageId, setSelectedImageId, /*setFile = () => { },*/ images },
    ref
  ) => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
      dispatch(getGroupImages(searchValue));
    }, [searchValue]);
    /*const handleFileUpload = (event) => {
      setFile(event.target.files[0])
      setSelectedImageId(undefined)
    };*/
    const { t } = useTranslation();

    return (
      <SelectPictureModal ref={ref}>
        <Title variant="h5"> {t('SELECT PHOTO')}</Title>

        {/*{!!selectedImageId && (*/}
        {/*  <Box fontWeight="500" my="10px" fontSize="1.1rem">*/}
        {/*    {`${selectedImageId} Fotoğraf seçildi`}*/}
        {/*  </Box>*/}
        {/*)}*/}

        <SearchInput
          m="20px 0 30px 0"
          placeholder={t('Search photos')}
          showClearInput
          searchValue={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {images?.length > 0 ? (
          <Masonry gutter="35px" columnsCount={2}>
            {images?.map((image, index) => {
              const active = selectedImageId?.id === image.id;
              return (
                <Box position="relative" key={index}>
                  <Image
                    onClick={() => setSelectedImageId(image)}
                    active={active}
                    src={image.image_url}
                    style={{ width: '55%' }}
                  />
                  {active && <TickIcon />}
                </Box>
              );
            })}
            {/*<Box position="relative" > //Bilgisayaryarden yukleme özlligi deaktif edildi

            <MaterialButton
              style={{
                border: '1px solid',
                backgroundColor: 'transparent',
                color: '#00b2a9',
                fontSize: '14px',
                height: '160px',
                width: '160px',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column'
              }}
              variant="contained"
              component="label"
            >
              <Svg.MockImageIcon style={{ marginBottom: '10px' }} />
              FOTOĞRAF YÜKLE
              <input
                type="file"
                onChange={handleFileUpload}
                hidden
              />
            </MaterialButton>
            </Box>*/}
          </Masonry>
        ) : (
          <div style={{ alignSelf: 'center' }}>
            "{t('To add a photo, you need to go to my profile > gallery tab')}"
          </div>
        )}

        <Box center mt="40px">
          <Button
            text={images?.length > 0 ? t('Forward') : t('Close')}
            className="blue"
            width="280px"
            onClick={() => ref.current.closeModal()}
          />
        </Box>
      </SelectPictureModal>
    );
  }
);

export default React.memo(TemplateNamingModal);

const SelectPictureModal = styled(Modal)`
  .modal-content {
    width: 700px;
    height: 600px;
  }
`;

const TickIcon = styled(Svg.TickWithBgIcon)`
  position: absolute;
  right: 10px;
  bottom: 10px;

  svg {
    width: 25px;
    height: 25px;
  }
`;

const Image = styled.img`
  cursor: pointer;

  ${(p) =>
    p.active &&
    css`
      opacity: 0.5;
    `}
`;
