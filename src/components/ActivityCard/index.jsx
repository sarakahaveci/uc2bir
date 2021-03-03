import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Material, Button, Title } from 'components';
import { sportTypeIconGenerator } from 'utils';
import { updateWorkPlaceActivity } from 'actions';

export default function ActivityCard({
  isAccepted,
  name,
  isWorkPlace,
  capacity,
  price,
  id,
}) {
  const dispatch = useDispatch();

  const cardClass = isAccepted
    ? 'facility-card-wrapper'
    : 'facility-card-wrapper not-accepted-card';

  const sportIcon = sportTypeIconGenerator(id);

  const statusTextClass = isAccepted ? 'accepted-text' : 'waiting-accept-text';

  const statusText = isAccepted ? 'Onaylandı' : 'Onay Bekliyor';

  const [formData, setFormData] = useState({
    id: id,
    capacity: capacity,
    price: price,
  });

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitChange = () => {
    if (isWorkPlace) {
      dispatch(
        updateWorkPlaceActivity(
          { ...formData },
          () => {
            toast.success(
              'Talebiniz gönderildi incelendikten sonra tarafınıza bildirim gönderilecektir.',
              {
                position: 'bottom-right',
                autoClose: 7000,
              }
            );
          },
          (error) => {
            toast.error(error, {
              position: 'bottom-right',
              autoClose: 7000,
            });
          }
        )
      );
    }
  };

  return (
    <div
      className={`d-flex mb-2 p-4 flex-column justify-content-between ${cardClass}`}
    >
      <div className="mb-2">
        <div className="d-flex justify-content-between">
          {sportIcon}
          <span className={`ml-auto ${statusTextClass}`}>{statusText} </span>
        </div>
        <Title
          fontWeight="600"
          textAlign="left"
          letterSpacing="0.2em"
          fontSize="13px"
          color="#404041"
        >
          {name}
        </Title>
      </div>
      <div>
        {isWorkPlace ? (
          <>
            <Material.TextField
              label="Aktivite Branşları"
              type="text"
              name="branch"
              changeValue={name}
              inputProps={{
                readOnly: true,
              }}
            />
            <Material.TextField
              label="Kontenjan"
              type="number"
              name="capacity"
              onChange={handleFormOnChange}
              changeValue={capacity}
              inputProps={{
                readOnly: !isAccepted,
              }}
            />
            <Material.TextField
              label="Alan Kiralama Bedeli (TL)"
              type="number"
              name="price"
              onChange={handleFormOnChange}
              changeValue={price}
              inputProps={{
                readOnly: !isAccepted,
              }}
            />
          </>
        ) : (
          <>
            <Material.TextField
              label="Klasifikasyon"
              type="text"
              name="class"
            />
            <Material.TextField label="Ücret (TL)" type="price" name="title" />
          </>
        )}
      </div>
      <Button
        className="blue mt-3"
        text="Kaydet"
        fontWeight="500"
        onClick={submitChange}
      />
    </div>
  );
}
