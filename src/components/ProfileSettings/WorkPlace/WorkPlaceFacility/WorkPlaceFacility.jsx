import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Title, Button, FacilityCard } from 'components';
import SelectiveButton from 'components/buttons/SelectiveButton';
import ArrowLeftIcon from 'components/statics/svg/images/arrow-left.svg';
import FacilityImage from 'assets/facility.png';
import BluePlusIcon from 'assets/blue-plus.svg';

const currentWorkPlace = [1, 3, 5, 7];

export default function WorkPlaceFacility() {
  const { data } = useSelector((state) => state.registerData);

  const [showAddFacilty, setShowAddFacilty] = useState(false);
  const [selectedFacilty, setSelectedFacilty] = useState([]);

  const selectBenefitHandler = (key) => {
    if (selectedFacilty.includes(key)) {
      setSelectedFacilty(selectedFacilty.filter((item) => item !== key));
    } else {
      setSelectedFacilty((selecteds) => [...selecteds, key]);
    }
  };

  return (
    <div className="p-3">
      <Title
        fontSize="24px"
        letterSpacing="0.03em"
        fontWeight="600"
        textAlign="left"
      >
        İş Yeri Olanaklar
      </Title>
      <div className="row d-flex w-100">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <img src={FacilityImage} alt="" />
        </div>

        <div className="col-md-8 col-sm-12">
          <Title
            className="mb-2"
            fontSize="16px"
            letterSpacing="0.03em"
            fontWeight="400"
            textAlign="left"
          >
            {showAddFacilty && (
              <img
                className="cp"
                src={ArrowLeftIcon}
                alt=""
                onClick={() => setShowAddFacilty(false)}
              />
            )}{' '}
            İş Yeri Olanaklar
          </Title>

          <Title
            className="mb-3"
            fontSize="13px"
            letterSpacing="0.03em"
            fontWeight="500"
            textAlign="left"
          >
            Hizmet verdiğiniz spor alanı için olanakları belirleyebilir; yeni
            olanaklar ekleyebilirsiniz.{' '}
          </Title>

          {!showAddFacilty && (
            <Title
              className="mb-2"
              fontSize="16px"
              letterSpacing="0.03em"
              fontWeight="400"
              textAlign="left"
            >
              Yeni Olanak Ekle{' '}
              <img
                className="cp"
                src={BluePlusIcon}
                alt=""
                onClick={() => setShowAddFacilty(true)}
              />
            </Title>
          )}
          <div className={`w-100 ${!showAddFacilty ? 'card-wrapper' : ''}`}>
            {!showAddFacilty ? (
              data?.['is_yeri_olanaklari']?.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  name={facility.name}
                  isAccepted={currentWorkPlace.includes(facility.id)}
                />
              ))
            ) : (
              <>
                {data?.['is_yeri_olanaklari']?.map((facility) => (
                  <SelectiveButton
                    key={facility.id}
                    id={facility.id}
                    name={facility.name}
                    selectButtonHandler={selectBenefitHandler}
                    isActive={selectedFacilty.includes(facility.id)}
                  />
                ))}
                <div className="d-flex w-100">
                  <Button
                    className="blue ml-auto"
                    text="Kaydet"
                    disabled={selectedFacilty.length === 0}
                    fontWeight="500"
                    onClick={() => {}}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
