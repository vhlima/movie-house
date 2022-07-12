import { useState } from 'react';

import type { CommentaryProps } from '../../../types';

import type { ReviewResponse } from '../../../types/user';

import { useAuth } from '../../../hooks/useAuth';

import Commentary from '../components/Commentary';

import UserMovieReviewBody from './components/Body';

import CommentaryForm from './components/CommentaryForm';

export interface UserMovieReviewProps {
  review: ReviewResponse;
}

const UserMovieReview: React.FC<UserMovieReviewProps> = ({ review }) => {
  const { user } = useAuth();

  const [commentaries, setCommentaries] = useState<CommentaryProps[]>([]);

  const handleComment = (message: string) => {
    setCommentaries(prev => [...prev, { _id: 'abc', message }]);
  };

  return (
    <>
      <UserMovieReviewBody review={review} preview={false} />

      <div className="mt-4">
        {user && (
          <CommentaryForm onSubmit={values => handleComment(values.message)} />
        )}

        {commentaries.map(comm => (
          <Commentary key={comm._id} />
        ))}
      </div>
    </>
  );
};

export default UserMovieReview;
