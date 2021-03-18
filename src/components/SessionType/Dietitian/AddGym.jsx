import React, { useState } from 'react';
import { Material, Button } from 'components';
import GYMAdd from './GYMAdd';

const AddGym = ({ setSubPage, setBannerActive }) => {
  const [editPage, setEditPage] = useState('page');
  const submit = (event) => {
    event.preventDefault();
    setEditPage('add-gym-list');
    setBannerActive(false);
  };

  switch (editPage) {
    case 'add-gym-list':
      return (
        <GYMAdd setSubPage={setSubPage} setBannerActive={setBannerActive} />
      );

    default:
      return (
        <>
          <div className="row">
            <Button text="< Geri" onClick={() => setSubPage('Adds')} />
            <Button text="Spor Salonu Seçiniz." />
          </div>
          <>
            <form onSubmit={submit} className="d-flex">
              <Material.TextField label="Salon arayın!" />
              <Button className="blue" text="Ara" type="submit" />
            </form>
          </>
        </>
      );
  }
};

export default AddGym;
