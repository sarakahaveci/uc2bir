import React from 'react';

import { Title, Button } from 'components';
import SelectiveButton from 'components/buttons/SelectiveButton';
import FacilityImage from 'assets/facility.png';

const mockData = [
  { name: 'Duş', id: 0 },
  { name: 'Cafe', id: 1 },
  { name: 'Havuz', id: 2 },
  { name: 'Wifi', id: 3 },
  { name: 'Jakuzi', id: 4 },
  { name: 'Soyunma Odası', id: 5 },
  { name: 'Kapalı Havuz', id: 6 },
  { name: 'Lorem', id: 7 },
];

const currentWorkPlace = [1, 3, 5, 7];

export default function Facility() {
  return (
    <>
      <Title
        fontSize="24px"
        letterSpacing="0.03em"
        fontWeight="600"
        textAlign="left"
      >
        İş Yeri Olanaklar
      </Title>
      <div className="row d-flex w-100">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <img src={FacilityImage} alt="" />
        </div>

        <div className="col-md-7 col-sm-12">
          <Title
            className="mb-2"
            fontSize="16px"
            letterSpacing="0.03em"
            fontWeight="400"
            textAlign="left"
          >
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

          <div className="w-100">
            {mockData.map((facility) => (
              <SelectiveButton
                id={facility.id}
                name={facility.name}
                selectButtonHandler={() => {}}
                isActive={currentWorkPlace.includes(facility.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex w-100">
        <Button
          className="blue ml-auto"
          text="Kaydet"
          // disabled={!acceptFirst}
          fontWeight="500"
          onClick={() => {}}
        />
      </div>
    </>
  );
}
