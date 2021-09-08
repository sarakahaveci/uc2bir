import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { setProfile } from 'actions';
import { Box } from 'components';
import TextField from '@material-ui/core/TextField';

export default function About() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { userInfo, isLoading } = useSelector((state) => state?.profile);

  const [newAbout, setNewAbout] = useState('');

  useEffect(() => {
    if (!newAbout) setNewAbout(userInfo?.about);
  }, [userInfo]);

  const isFailUpdate = (message) => {
    toast.error(message || t('Error encountered while updating'), {
      position: 'bottom-right',
      autoClose: 4500,
    });
  };

  const isSuccess = () => {
    toast.success(t('Updated successfully'), {
      position: 'bottom-right',
      autoClose: 4500,
    });
    setNewAbout(userInfo?.about);
  };

  const handleChangeAbout = () => {
    if (!(userInfo?.about === newAbout)) {
      dispatch(setProfile({ about: newAbout }, isSuccess, isFailUpdate));
    }
  };

  return isLoading ? (
    <div>{t('Loading')}..</div>
  ) : (
    <div className="about-wrapper">
      <TextField
        id="about"
        name="about"
        label=""
        className="w-100"
        multiline
        rows={4}
        defaultValue={newAbout}
        onChange={(e) => setNewAbout(e.target.value)}
        inputProps={{
          maxLength: 250,
        }}
      />
      <Box row>
        <hr className="about-hr" />
        {newAbout ? 250 - newAbout?.length : 250}
        <span
          onClick={handleChangeAbout}
          className={
            userInfo?.about === newAbout ? 'saveButton disable' : 'saveButton'
          }
        >
          {t('save')}
        </span>
      </Box>
    </div>
  );
}
