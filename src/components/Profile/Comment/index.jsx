import React, { useEffect } from 'react';

import Comment from '../../Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getUserComment } from 'actions';
import { useTranslation } from 'react-i18next';

const ProfileComment = ({ userId }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.userProfile.comment);

  useEffect(() => {
    dispatch(getUserComment(userId));
  }, []);
  return (
    <div>
      {comments?.data?.length > 0 ? (
        comments?.data?.map((comment, index) => (
          <Comment
            index={index}
            key={index + comment.rating}
            rating={comment.rating + 1}
            name={comment.name}
            date={comment.date}
            comment={comment.comment}
            photo={comment?.commenter?.photo}
          />
        ))
      ) : (
        <div className="d-flex">
          <strong className="mx-auto">
            {t('There are no comments about the trainer')}
          </strong>
        </div>
      )}
    </div>
  );
};

export default ProfileComment;
