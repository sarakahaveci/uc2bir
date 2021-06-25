import React, { useState, forwardRef } from 'react';
import styled, { css } from 'styled-components/macro';

import Masonry from 'react-responsive-masonry';
import { Svg, Box, Modal, Button, SearchInput, Title } from 'components';

const TemplateNamingModal = forwardRef(
  ({ selectedImageId, setSelectedImageId, images }, ref) => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <SelectPictureModal ref={ref}>
        <Title variant="h5"> FOTOĞRAF SEÇİNİZ</Title>

        {/*{!!selectedImageId && (*/}
        {/*  <Box fontWeight="500" my="10px" fontSize="1.1rem">*/}
        {/*    {`${selectedImageId} Fotoğraf seçildi`}*/}
        {/*  </Box>*/}
        {/*)}*/}

        <SearchInput
          m="20px 0 30px 0"
          placeholder="Fotoğraf ara"
          showClearInput
          searchValue={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Masonry gutter="35px" columnsCount={2}>
          {images?.map(
            (image, index) => {
              const active = selectedImageId === image.id;
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
            }
          )}
        </Masonry>

        <Box center mt="40px">
          <Button text="İleri" className="blue" width="280px" onClick={() => ref.current.closeModal()} />
        </Box>
      </SelectPictureModal>
    );
  }
);

export default React.memo(TemplateNamingModal);

const SelectPictureModal = styled(Modal)`
  .modal-content {
    width: 700px;
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
