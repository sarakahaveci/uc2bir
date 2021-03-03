import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { setProfile } from 'actions';
import { Box } from 'components';
import TextField from '@material-ui/core/TextField';

export default function About() {
  const dispatch = useDispatch();
  const { about } = useSelector((state) => state?.profile?.userInfo);

  const [data, setData] = useState(about ?? '');

  const disable = about === data;

  const isFailUpdate = () => {
    toast.error('Güncelleme yapılırken hata ile karşılaşıldı.', {
      position: 'bottom-right',
      autoClose: 4500,
    });
  };

  const isSuccess = () => {
    toast.success('Başarı ile güncellendi.', {
      position: 'bottom-right',
      autoClose: 4500,
    });
  };

  const handleChangeAbout = () => {
    if (!disable)
      dispatch(setProfile({ about: data }, isFailUpdate, isSuccess));
  };

  console.log({ about, data });

  return (
    <div>
      <TextField
        id="about"
        name="about"
        label=""
        className="w-100"
        multiline
        rows={4}
        defaultValue={about}
        onChange={(e) => setData(e.target.value)}
      />
      <Box row>
        <hr className="about-hr" />
        {250 - data.length}
        <span
          onClick={handleChangeAbout}
          className={!disable ? 'saveButton' : 'saveButton disable'}
        >
          KAYDET
        </span>
      </Box>
    </div>
  );
}
