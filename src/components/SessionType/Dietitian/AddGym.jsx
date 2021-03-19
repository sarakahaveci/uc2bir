import React, { useState } from 'react';
import { Button } from 'components';
import GYMAdds from './GYMAdds';
import GYMAdd from './GYMAdd';

const AddGym = ({ setSubPage, setBannerActive }) => {
  const [editPage] = useState('page');

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
            <GYMAdds
              setSubPage={setSubPage}
              setBannerActive={setBannerActive}
            />
            {/*<form onSubmit={submit} className="d-flex">
              <Material.TextField label="Salon arayın!" />
              <Button className="blue" text="Ara" type="submit" />
            </form>*/}
          </>
        </>
      );
  }
};

export default AddGym;
