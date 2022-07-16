import { useEffect, useState } from 'react';

import type { ReviewResponse } from '../../../types/review';

import type { CommentaryResponse } from '../../../types/commentary';

import { useAuth } from '../../../hooks/useAuth';

import Commentary from '../components/Commentary';

import UserMovieReviewBody from './components/Body';

import CommentaryForm from './components/CommentaryForm';

export interface UserMovieReviewProps {
  review: ReviewResponse;
}

const UserMovieReview: React.FC<UserMovieReviewProps> = ({ review }) => {
  const { user } = useAuth();

  const [commentaries, setCommentaries] = useState<CommentaryResponse[]>([]);

  const [likes, setLikes] = useState<string[]>([]);

  const handleComment = (commentary: CommentaryResponse) => {
    setCommentaries(prev => [...prev, commentary]);
  };

  // TODO move commentary form to top

  useEffect(() => {
    setCommentaries(review.commentaries);
  }, [review, setCommentaries]);

  return (
    <>
      <UserMovieReviewBody review={review} preview={false} />

      <div className="mt-4">
        {commentaries.map(commentary => (
          <Commentary
            key={commentary._id}
            commentary={commentary}
            liked={likes.includes(commentary._id)}
            onLike={lod =>
              !lod
                ? setLikes(prev => prev.filter(c => c !== commentary._id))
                : setLikes(prev => [...prev, commentary._id])
            }
          />
        ))}

        {user && (
          <CommentaryForm
            referenceId={review._id}
            onComment={commentary => handleComment(commentary)}
          />
        )}
      </div>
    </>
  );
};

export default UserMovieReview;
