import React, { useEffect } from 'react';

import Comment from '../../Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getUserComment } from 'actions';

 const ProfileComment = ({ userId }) => {
   const dispatch = useDispatch();
   const { comments } = useSelector(
     (state) => state.userProfile.comment
   );

   useEffect(() => {
     dispatch(getUserComment(userId));
   }, []);
  return (
    <div>
      {comments.length > 0 ?
        (comments?.map((comment, index) => (
          <Comment
            index={index}
            key={index + comment.rating}
            rating={comment.rating}
            name={comment.name}
            date={comment.date}
            comment={comment.comment}
            photo={comment.photo}
          />
      ))) : (
          <div className="d-flex">
            <strong className="mx-auto">
              Eğitmen İle İlgili Herhangi Bir Yorum Bulunmamaktadır.
            </strong>
          </div>
        )}

    </div>
  );
}

export default ProfileComment;
