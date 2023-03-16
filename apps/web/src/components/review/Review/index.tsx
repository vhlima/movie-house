import clsx from 'clsx';

import type { FindReviewsQuery } from '@/graphql';

import { Link, StarIcon, SvgIcon, TextShorter, Typography } from '@/components';

import { formatDateFromMillis } from '@/utils/date-utils';

import { MovieCover, MovieLink } from '@/components/movie';

export interface MovieReviewViewProps {
  review: FindReviewsQuery['reviews']['edges'][number]['node'];
  preview?: boolean;
}

const Review: React.FC<MovieReviewViewProps> = ({ review, preview = true }) => {
  const { movie, post } = review;

  return (
    <div className="flex gap-2">
      {preview && <MovieCover movie={movie} sizeType="sm" />}

      <div className="flex flex-col">
        <Typography
          className="font-bold"
          component="h2"
          color="primary"
          size="xl"
        >
          {!preview ? (
            <MovieLink
              className="hover:text-grey-200"
              movieId={review.movie.id}
            >
              {movie.originalTitle}
            </MovieLink>
          ) : (
            <Link
              className="hover:text-grey-200"
              href={{ pathname: '/reviews/[id]', query: { id: review.id } }}
            >
              {movie.originalTitle}
            </Link>
          )}

          <Typography
            className="font-normal ml-2"
            size="lg"
            component="span"
            color="secondary"
          >
            ({new Date(movie.releaseDate).getFullYear()})
          </Typography>
        </Typography>

        <div
          className={clsx('mt-1', {
            'flex flex-col sm:flex-row sm:items-center gap-2 mb-4': preview,
          })}
        >
          <div className="flex">
            <StarIcon intent="full" />
            <StarIcon intent="half" />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>

          <Typography
            className={clsx({
              'my-4': !preview,
            })}
            component="p"
            color="tertiary"
            size="sm"
          >
            Watched {formatDateFromMillis(post.createdAt)}
          </Typography>
        </div>

        <TextShorter className="mb-4" maxCharacters={400} text={post.content} />

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 w-fit" type="button">
            <SvgIcon size={24} iconType="AiFillHeart" />
            <Typography className="font-bold" component="span" size="sm">
              Like review
            </Typography>
          </button>

          <Typography component="span" size="sm">
            1,412 likes
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Review;
