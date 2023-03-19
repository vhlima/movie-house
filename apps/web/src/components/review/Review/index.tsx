import clsx from 'clsx';

import type { FindReviewsQuery } from '@/graphql';

import {
  Link,
  ProfilePicture,
  StarIcon,
  SvgIcon,
  TextShorter,
  Typography,
} from '@/components';

import { formatDateFromMillis } from '@/utils/date-utils';

import { MovieCover, MovieLink } from '@/components/movie';
import UserProfileLink from '@/components/user/UserProfileLink';

export type ReviewIntent = 'profile' | 'preview' | 'full';

export interface MovieReviewViewProps {
  review: FindReviewsQuery['reviews']['edges'][number]['node'];
  preview?: boolean;
  intent?: ReviewIntent;
}

const Review: React.FC<MovieReviewViewProps> = ({
  review,
  intent = 'preview',
  preview = true,
}) => {
  const { user, movie, post } = review;

  const isAnyPreviewType = intent === 'preview' || intent === 'profile';

  return (
    <div className="flex w-full z-10 gap-4">
      <MovieCover movie={movie} sizeType={isAnyPreviewType ? 'sm' : 'md'} />

      <div className="flex flex-col">
        <Typography
          className="font-bold"
          component="h2"
          color="primary"
          size="xl"
          hover
        >
          {!isAnyPreviewType ? (
            <MovieLink movieId={review.movie.id}>
              {movie.originalTitle}
            </MovieLink>
          ) : (
            <Link
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

        <div>
          {(intent === 'preview' || intent === 'full') && (
            <UserProfileLink
              className="flex items-center gap-2 my-2 group"
              username={user.username}
            >
              <ProfilePicture src={user.profilePictureUrl} imageSize="sm" />

              <Typography className="font-bold" component="span" groupHover>
                {user.username}
              </Typography>
            </UserProfileLink>
          )}

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

            <Typography component="p" color="tertiary" size="sm">
              Watched {formatDateFromMillis(post.createdAt)}
            </Typography>
          </div>
        </div>

        <TextShorter
          className="mb-4"
          maxCharacters={isAnyPreviewType ? 200 : post.content.length}
          text={post.content}
        />

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
