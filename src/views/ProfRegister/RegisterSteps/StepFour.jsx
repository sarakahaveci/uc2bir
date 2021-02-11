import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRegisterData } from '../../../actions';
import { Material, Text, Button } from 'components';
import Svg from 'components/statics/svg';

const BranchModal = () => {
  const dispatch = useDispatch();
  // TODO: Get list from service
  const { data: registerData } = useSelector((state) => state.registerData);

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [showAddBranchArea, setShowAddBranchArea] = useState(false);

  useLayoutEffect(() => {
    dispatch(getRegisterData());
  }, []);

  const selectButtonHandler = (key) => {
    if (selectedButtons.includes(key)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== key));
    } else {
      setSelectedButtons((selecteds) => [...selecteds, key]);
    }
  };

  return (
    <div className="branch-modal">
      <div className="modal-content">
        <Svg.CloseIcon className="close" onClick={() => console.log(false)} />

        <p>Lütfen Branş Seçiminizi Yapınız</p>

        <div className="branchWrapper">
          {registerData?.['spor_branslari']?.map((button) => {
            const buttonClass = selectedButtons.includes(button.id)
              ? 'button activeButton'
              : 'button';

            return (
              <Button
                key={button.id}
                className={buttonClass}
                onClick={() => selectButtonHandler(button.id)}
                text={button.name}
              />
            );
          })}
          <Material.CheckBox
            onChange={(e) => setShowAddBranchArea(e.target.checked)}
            checked={showAddBranchArea}
            label="Diğer Branşlar"
          />
          {showAddBranchArea && (
            <>
              <Text fontSize="13px" fontWeight="500" className="no-margin">
                Ekleyin
              </Text>
              <Material.TextField
                id="branch"
                name="branch"
                label="Eklemek istediğiniz branşları yazınız"
                type="text"
              />
            </>
          )}
          <div className="buttonWrapper">
            <Button fontWeight="bold" className="blue" text="Vazgeç" />
            <Button fontWeight="bold" className="blue" text="İleri" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchModal;
