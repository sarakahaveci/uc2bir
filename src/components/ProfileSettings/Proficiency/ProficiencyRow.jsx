import React, { useRef } from 'react';
import styled, { css } from 'styled-components/macro';

import {
  Accordion,
  PlusButton,
  Text,
  Material,
  Svg,
  Modal,
  Title,
} from 'components';

const ProficiencyRow = ({ sport, sportIcon, infoArr }) => {
  const proficiencyResponseModal = useRef();

  const openProficiencyResponseModal = () =>
    proficiencyResponseModal.current.openModal();

  const closeProficiencyResponseModal = () =>
    proficiencyResponseModal.current.closeModal();

  const saveProficiencyHandler = () => {
    // TODO: send save request and open modal
    openProficiencyResponseModal();
  };

  const isWaitingPending = infoArr.some((item) => item.status === 'pending');

  return (
    <>
      <AccordionItemWrapper isWaitingPending={isWaitingPending}>
        <Accordion.Item>
          <Accordion.Toggle>
            <ToggleRow>
              <div className="proficiency-row__left-wrapper">
                {sportIcon}
                <Text fontSize="0.9rem" color="600">
                  {sport}
                </Text>
              </div>

              <div className="proficiency-row__right-wrapper">
                <Text mr="10px" color="dark" fontSize="0.9rem">
                  Uzmanlık Ekle
                </Text>

                <PlusButton
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('asd');
                  }}
                >
                  +
                </PlusButton>
              </div>

              <Svg.ArrowUpIcon />
            </ToggleRow>
          </Accordion.Toggle>
          <Accordion.Collapse>
            <div className="proficiency-row__collapse">
              {infoArr.map((item) => (
                <Material.TextField
                  value={item.name}
                  defaultValue={item.name}
                />
              ))}

              <div className="proficiency-row__save-wrapper">
                <span
                  className="proficiency-row__save"
                  onClick={saveProficiencyHandler}
                >
                  Kaydet
                </span>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion.Item>
      </AccordionItemWrapper>
      <Modal
        className="proficiency-row__modal"
        ref={proficiencyResponseModal}
        closeIcon={false}
        backdrop="static"
      >
        <>
          <div className="proficiency-row__modal__body">
            <Svg.SmileyFaceIcon className="icon" />

            <Title component="h5">Merhaba Sevgili Üyemiz</Title>

            <div className="proficiency-row__modal__info">
              Girmiş olduğun uzmanlıklar tarafımızca incelendikten sonra sana
              bilgi vereceğiz. Bildirimlerini açmayı unutma :)
            </div>
          </div>

          <div
            className="proficiency-row__modal__footer"
            onClick={closeProficiencyResponseModal}
          >
            Devam Et
          </div>
        </>
      </Modal>
    </>
  );
};

export default ProficiencyRow;

const AccordionItemWrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  margin-bottom: 10px;

  ${(p) =>
    p.isWaitingPending &&
    css`
      border: 1px solid ${p.theme.colors.red};
      box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
    `}
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;

  ${(p) =>
    p.isActive &&
    css`
      border-bottom: 0.5px solid #dbd5d5;

      svg {
        transition: all 0.3s;
        transform: ${(p) => p.isActive && 'rotate(180deg)'};
      }
    `}
`;
