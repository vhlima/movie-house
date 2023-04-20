import clsx from 'clsx';

import type { FindReviewsQuery } from '@/graphql';

import { PostMeta } from '@/components';

import { NewMovieCover as MovieCover } from '@/components/movie';

import { ReviewDetails, ReviewMovieDetails } from './components';

interface Props {
  review: FindReviewsQuery['reviews']['edges'][number]['node'];
  preview?: boolean;
  showUser?: boolean;
}

const Review: React.FC<Props> = props => {
  const { review, preview = true, showUser = true } = props;

  const { user, movie, post } = review;

  return (
    <div
      className={clsx('w-full flex gap-4 z-10', {
        'flex-row-reverse': !preview,
      })}
    >
      <MovieCover movie={movie} size={preview ? 'sm' : 'md'} />

      <div className="flex flex-col w-full">
        <ReviewMovieDetails
          id={preview ? review.id : movie.id}
          originalTitle={movie.originalTitle}
          releaseDate={movie.releaseDate}
        />

        <ReviewDetails rating={2.5} createdAt={post.createdAt} />

        <PostMeta
          id={post.id}
          user={showUser ? user : undefined}
          content={post.content}
          commentaryCount={0}
        />
      </div>
    </div>
  );
};

export default Review;
