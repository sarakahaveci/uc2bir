import React from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../typography/Titles';
import AwesomeIcon from '../../statics/icon';
import { useHistory } from 'react-router-dom';
const Packet = ({ val }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <div
        onClick={() => {
          history.push(`/packets/${val?.type}/detail/` + val?.id);
        }}
        className="slider-item"
      >
        <div className="slider-item-content">
          <div className="front-card">
            <div className="img-item">
              <div
                className="img"
                style={{
                  backgroundImage: `url(${val.photo})`,
                }}
              >
                {/* {(val?.type == 'pt' && (
                  <div className="team">{val.class}</div>
                )) || <div style={{ width: '50px', height: '50px' }}></div>} */}
              </div>
              <div className="info d-flex">
                <Title lineDisable fontWeight="bold">
                  {val?.authorType}
                </Title>
              </div>
            </div>
            <div className="text-item">
              <Title lineDisable fontWeight="bold">
                {val.name}
              </Title>
              <div className="row info">
                <div className="col">
                  <ul>
                    {val?.type === 'pt' && (
                      <li>
                        {val.branch} {t('branch of')}
                      </li>
                    )}
                    {val?.type === 'dt' && <li>{t('Diet Program')}</li>}
                  </ul>
                </div>
                <div className="col-auto">
                  <span>
                    {val.price} <AwesomeIcon.Tl /> / {val.lesson_amount}{' '}
                    {val?.type === 'dt' ? t('Session') : t('lesson')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="back-card">
            <div className="back-card__title">{val.name}</div>
            <div className="back-card__detail">{val.detail}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packet;
