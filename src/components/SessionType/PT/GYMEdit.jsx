import React, { useEffect, useState } from 'react';
import { Button, WorkAreaCard, BackLink } from 'components';
import { getGymList } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { removeGymFromPt } from 'actions';
import { useTranslation } from 'react-i18next';

const GYMEdit = ({ setSubPage, setBannerActive }) => {
  const { t } = useTranslation();

  const stars = 5;
  const dispatch = useDispatch();

  const { gym } = useSelector(
    (state) => state.profileSettings2.sessionType?.gymList?.data
  );

  const [checked, setChecked] = useState([]);

  const handleChange = (id) => {
    if (!checked.includes(id)) setChecked((prevArr) => [...prevArr, id]);
    else setChecked(checked.filter((item) => item !== id));
  };

  useEffect(() => {
    setBannerActive(true);
    dispatch(getGymList());
  }, []);

  return (
    <>
      <BackLink text={t('Back')} onClick={() => setSubPage('Adds')} />

      <div className="d-flex flex-wrap">
        {gym?.map((data) => (
          <>
            <CardGroup key={data.id}>
              <WorkAreaCard
                image={data.photo}
                stars={stars}
                capacity={data?.capacity}
                title={data?.title}
                area_measure={data?.area_measure}
                city={data?.city}
                district={data?.district}
                price={data?.price}
              />
              <GreenCheckbox
                checked={checked.includes(data?.id)}
                onChange={() => handleChange(data?.id)}
              />
            </CardGroup>
          </>
        ))}

        <div
          style={{ padding: 30 }}
          className="d-flex btn-group justify-content-end p-30 w-100"
        >
          <div className="ln">
            <Button
              disabled={!checked.length}
              style={{ margin: 5, borderStyle: 'solid', borderWidth: '1px' }}
              text={
                t('remove') +
                `${checked.length ? '(' + checked.length + ')' : ''}`
              }
              onClick={() => dispatch(removeGymFromPt(checked))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CardGroup = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding-right: 95px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const GreenCheckbox = withStyles({
  root: {
    color: '#00b3a8',
    width: 50,
    '&$checked': {
      color: '#00b3a8',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default GYMEdit;
