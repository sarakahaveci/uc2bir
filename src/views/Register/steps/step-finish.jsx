/* eslint-disable react/no-children-prop */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text, AwesomeIcon } from '../../../components';
import { useHistory } from 'react-router-dom';

const StepFinish = () => {
  const { t } = useTranslation();

  const history = useHistory();
  return (
    <>
      <span
        style={{
          marginBottom: 30,
          width: '100%',
          height: 'auto',
          textAlign: 'center',
        }}
      >
        <AwesomeIcon.Success style={{ fontSize: '4em', color: '#00b2a9' }} />
      </span>
      <Text
        style={{ marginBottom: 5, fontSize: '18px', letterSpacing: '1px' }}
        children={t('Congratulations')}
        blue
        textAlign="center"
      />
      <Text
        fontSize="11pt"
        children={t('A great day to start...')}
        textAlign="center"
      />
      <Text
        style={{ marginBottom: 25 }}
        fontSize="11pt"
        children={t('Believe in the power of now!')}
        textAlign="center"
      />
      <Button
        onClick={() => history.push('/')}
        text={t('Go to Homepage')}
        className="blue"
      />
    </>
  );
};

export default StepFinish;
