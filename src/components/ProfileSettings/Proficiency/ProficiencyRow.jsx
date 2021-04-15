import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import { Accordion, Svg, Modal, Title } from 'components';
import ProficiencyToggler from './ProficiencyToggler';
import ProficiencyCollapser from './ProficiencyCollapser';
import { addProficiency } from 'actions';
import { toast } from 'react-toastify';
const ProficiencyRow = ({ data }) => {
  const [addedProficiencies, setAddedProficiencies] = useState({});
  const [showInputError, setShowInputError] = useState(false);

  const proficiencyResponseModal = useRef();

  const dispatch = useDispatch();

  const openProficiencyResponseModal = () =>
    proficiencyResponseModal.current.openModal();

  const closeProficiencyResponseModal = () =>
    proficiencyResponseModal.current.closeModal();

  const addProficiencySuccessHandler = () => openProficiencyResponseModal();

  function duplicateElements(json) {
    let duplicates = [];
    var keys = Object.keys(json);
    var values = [];
    keys.forEach((el) => values.push(json[el]));
    values.forEach((elm, index) => {
      var counter = 0;
      values.forEach((item) => {
        if (item === elm) counter++;
      });
      if (counter > 1) {
        duplicates.push(index);
      }
    });
    return duplicates;
  }
  const saveProficiencyHandler = () => {
    if (
      Object.keys(addedProficiencies).some(
        (key) => addedProficiencies[key].trim() === ''
      )
    ) {
      setShowInputError(true);
      return;
    }
    var duplicates = duplicateElements(addedProficiencies);
    if (duplicates.length > 0) {
      duplicates.forEach((res) => {
        toast.error(
          addedProficiencies[res] +
            ' iki kez eklenemez. Lütfen kontrol ediniz..',
          {
            position: 'bottom-right',
            autoClose: 4000,
          }
        );
        var temp = delete addedProficiencies[res];
        setAddedProficiencies(temp);
      });
    }
    Object.keys(addedProficiencies).map((d) => {
      const filter = data?.speciality?.filter(
        (item) => item.name === addedProficiencies[d]
      );

      if (filter?.length > 0) {
        const tempValue = addedProficiencies[d];
        var deleted = delete addedProficiencies[d];
        setAddedProficiencies(deleted);
        toast.error(tempValue + ' zaten var oldugundan eklenemedi.', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    });
    dispatch(
      addProficiency(
        data.id,
        Object.keys(addedProficiencies).map((key) => addedProficiencies[key]),
        addProficiencySuccessHandler
      )
    );
  };

  const isWaitingPending = data?.speciality?.some(
    (item) => item.status === 'pending'
  );

  return (
    <>
      <AccordionItemWrapper isWaitingPending={isWaitingPending}>
        <Accordion.Item>
          <Accordion.Toggle>
            <ProficiencyToggler
              data={data}
              addedProficiencies={addedProficiencies}
              setAddedProficiencies={setAddedProficiencies}
            />
          </Accordion.Toggle>

          <Accordion.Collapse>
            <ProficiencyCollapser
              data={data}
              showInputError={showInputError}
              addedProficiencies={addedProficiencies}
              setAddedProficiencies={setAddedProficiencies}
              saveProficiencyHandler={saveProficiencyHandler}
            />
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
  display: flex;
  flex-direction: column;

  ${(p) =>
    p.isWaitingPending &&
    css`
      border: 1px solid ${p.theme.colors.red};
      box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
    `}
`;
