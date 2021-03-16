import React from 'react';
import { Spinner } from 'react-bootstrap';

const BlueSpinner = (props) => {
  return <Spinner animation="border" variant="info" {...props} />;
};

export default BlueSpinner;
