import React from 'react';

import { Title } from 'components';
import TwitterIcon from 'assets/twitter.svg';
import { useHistory } from 'react-router-dom';
export default function BlogCard({
  title = '',
  description = '',
  photo,
  createdTime,
  userName,
  detail_url = '',
}) {
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
              padding: '20px',
            }}
          >
            <div
              onClick={() => {
                history.push(`/blog-detail/${detail_url}`);
              }}
              style={{ display: 'flex', cursor: 'pointer' }}
            >
              Tümünü Görüntüle
            </div>
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
          Yazar: {userName}
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
