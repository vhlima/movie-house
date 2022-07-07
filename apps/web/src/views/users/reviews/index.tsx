import React, { useState } from 'react';

import { CommentaryProps } from '../../../types';

import { useAuth } from '../../../hooks/useAuth';

import Commentary from '../components/Commentary';

import UserMovieReviewBody from './components/Body';

import CommentaryForm from './components/CommentaryForm';

const UserMovieReview: React.FC = () => {
  const { user } = useAuth();

  const [commentaries, setCommentaries] = useState<CommentaryProps[]>([]);

  const handleComment = (message: string) => {
    setCommentaries(prev => [...prev, { _id: 'abc', message }]);
  };

  return (
    <>
      <UserMovieReviewBody preview={false} />

      <div className="mt-4">
        {commentaries.map(comm => (
          <Commentary key={comm._id} />
        ))}

        {user && (
          <CommentaryForm onSubmit={values => handleComment(values.message)} />
        )}
      </div>
    </>
  );
};

export default UserMovieReview;
