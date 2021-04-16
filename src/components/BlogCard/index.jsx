import React from 'react';

import { Title } from 'components';
import TwitterIcon from 'assets/twitter.svg';

export default function BlogCard({
  title = 'Sporcu Beslenmesi',
  description = 'Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem Lorem morem ',
  photo,
  createdTime,
  userName
}) {
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
