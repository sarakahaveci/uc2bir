import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { Text, Title, AwesomeIcon } from 'components';

export default function Comment({ name, date, comment, rating, photo, index }) {
  const wrapperClass =
    index % 2 === 0
      ? 'comment-container'
      : 'comment-container ood-comment-container';

  return (
    <div className={wrapperClass}>
      <Row className="comment-user-info">
        <Row className="comment-stars">
          <div className={rating > 1 ? 'active-star' : ''}>
            <AwesomeIcon.StarSolid />
          </div>
          <div className={rating > 2 ? 'active-star' : ''}>
            <AwesomeIcon.StarSolid />
          </div>
          <div className={rating > 3 ? 'active-star' : ''}>
            <AwesomeIcon.StarSolid />
          </div>
          <div className={rating > 4 ? 'active-star' : ''}>
            <AwesomeIcon.StarSolid />
          </div>
          <div className={rating > 5 ? 'active-star' : ''}>
            <AwesomeIcon.StarSolid />
          </div>
        </Row>
        <Row>
          <img src={photo} alt={name} />
          <Col className="comment-author">
            <Row>
              <Title fontSize="12px">{name}</Title>
            </Row>
            <Row>
              <span className="comment-date">{date}</span>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row className="comment-text">
        <Text color="black4" fontSize="15px">
          {comment}
        </Text>
      </Row>
    </div>
  );
}
