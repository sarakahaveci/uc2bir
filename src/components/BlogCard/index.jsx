import React from 'react';
import styled from 'styled-components';
import { Title } from 'components';
import TwitterIcon from 'assets/twitter.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { Button } from 'react-scroll';
// import { right } from 'styled-system';

export default function BlogCard({
  title = '',
  description = '',
  photo,
  createdTime,
  userName,
  detail_url = '',
}) {
  const { t } = useTranslation();

  const history = useHistory();

  return (
    <div className="row">
      <div>
        <Title fontSize="24px" textAlign="left">
          {title}
        </Title>
      </div>
      <div className="row">
        <div
          className="col-md-8 col-sm-12"
          style={{ borderBottom: '0.5px solid #70707063' }}
        >
          <Title
            fontSize="14px"
            textAlign="left"
            color="gray8"
            fontWeight="normal"
          >
            {description}
          </Title>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingRight: '25px',
              paddingBottom: '20px',
            }}
          >
            <ButtonWrapper
              onClick={() => {
                history.push(`/blog-detail/${detail_url}`);
              }}
              style={{ display: 'flex', cursor: 'pointer' }}
            >
              {t('Read More')}
            </ButtonWrapper>
          </div>
        </div>

        <div className="col-md-4 col-sm-12">
          <img
            src={photo || TwitterIcon}
            alt={title}
            style={{
              width: '300px',
              height: '250px',
              borderLeft: '0.5px solid #70707063 ',
              paddingLeft: '25px',
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Title
          fontSize="11px"
          textAlign="left"
          color="gray8"
          fontWeight="normal"
        >
          {t('writer')} : {userName}
        </Title>
        <Title
          fontSize="11px"
          textAlign="left"
          color="gray8"
          fontWeight="normal"
        >
          {createdTime}
        </Title>
      </div>
    </div>
  );
}

const ButtonWrapper = styled.div`
  color: white;
  background: #00b2a9;
  padding: 1%;
  border-radius: 5px;
  font-size: 0.8rem;
  border: 2px solid;

  &:hover {
    color: #00b2a9;
    background: white;
    border-color: #00b2a9;
  }
`;
