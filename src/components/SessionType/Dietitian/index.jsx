import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SelectiveButton from '../../buttons/SelectiveButton';
import { Button } from 'components';

const Gym = ({ icons }) => {
  const [selected, setSelected] = useState([]);
  const select = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter((item) => item !== key));
    } else {
      setSelected((selecteds) => [...selecteds, key]);
    }
  };
  return (
    <>
      {icons.map((val) => (
        <SelectiveButton
          key={val.id}
          id={val.id}
          name={val.name}
          selectButtonHandler={select}
          isActive={selected.includes(val.id)}
        />
      ))}
      <Col>
        <Row className="justify-content-end align-items-end" style={{minHeight: 150}}>
          <Button className="blue" text="İleri" disabled={true} />
        </Row>
      </Col>
    </>
  );
};

export default Gym;
