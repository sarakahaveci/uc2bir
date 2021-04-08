import React, { useState, forwardRef } from 'react';
import styled, { css } from 'styled-components/macro';

import Masonry from 'react-responsive-masonry';
import MockImage from 'assets/facility.png';
import MockImage2 from 'assets/blog.jpg';
import MockImage3 from 'assets/join-us.png';
import MockImage4 from 'assets/my-wallet.jpg';
import { Svg, Box, Modal, Button, SearchInput, Title } from 'components';

const TemplateNamingModal = forwardRef(
  ({ selectedImageIds, setSelectedImageIds }, ref) => {
    const [searchValue, setSearchValue] = useState('');

    const selectImageHandler = (id) => {
      if (selectedImageIds.includes(id)) {
        setSelectedImageIds(
          selectedImageIds.filter((imageId) => imageId !== id)
        );
        return;
      }

      setSelectedImageIds([...selectedImageIds, id]);
    };

    return (
      <SelectPictureModal ref={ref}>
        <Title variant="h5"> FOTOĞRAF SEÇİNİZ</Title>

        {!!selectedImageIds.length && (
          <Box fontWeight="500" my="10px" fontSize="1.1rem">
            {`${selectedImageIds.length} Fotoğraf seçildi`}
          </Box>
        )}

        <SearchInput
          m="20px 0 30px 0"
          placeholder="Fotoğraf ara"
          showClearInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <Masonry gutter="35px" columnsCount={2}>
          {[MockImage, MockImage2, MockImage3, MockImage4].map(
            (image, index) => {
              const active = selectedImageIds.includes(index);

              return (
                <Box position="relative" key={index}>
                  <Image
                    onClick={() => selectImageHandler(index)}
                    active={active}
                    src={image}
                    style={{ width: '100%', display: 'block' }}
                  />

                  {active && <TickIcon />}
                </Box>
              );
            }
          )}
        </Masonry>

        <Box center mt="40px">
          <Button text="İleri" className="blue" width="280px" />
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
