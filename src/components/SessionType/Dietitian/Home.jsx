import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'components';
import SelectiveButton from '../../buttons/SelectiveButton';
import { useTranslation } from 'react-i18next';

const Home = ({
  icons = [],
  select = () => {},
  selected,
  get,
  create,
  submit = () => {},
}) => {
  const { t } = useTranslation();

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
        <Row
          className="justify-content-end align-items-end"
          style={{ minHeight: 150 }}
        >
          <Button
            className="blue"
            text={t('Forward')}
            disabled={
              selected.length > 0
                ? false
                : true || get?.data?.data?.length > 0
                ? false
                : true
            }
            onClick={submit}
            isLoading={create.isLoading}
          />
        </Row>
      </Col>
    </>
  );
};

export default Home;
