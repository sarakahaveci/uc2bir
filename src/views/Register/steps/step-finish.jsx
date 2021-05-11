/* eslint-disable react/no-children-prop */
import React from 'react';

import { Button, Text, AwesomeIcon } from '../../../components';
import { useHistory } from 'react-router-dom';

const StepFinish = () => {
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
        children="Tebrikler"
        blue
        textAlign="center"
      />
      <Text
        fontSize="11pt"
        children="Başlangıç yapmak için harika bir gün..."
        textAlign="center"
      />
      <Text
        style={{ marginBottom: 25 }}
        fontSize="11pt"
        children="Şimdinin gücüne inan!"
        textAlign="center"
      />
      <Button
        onClick={() => history.push('/')}
        text={`Anasayfa`}
        className="blue"
      />
    </>
  );
};

export default StepFinish;
