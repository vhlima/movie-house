import clsx from 'clsx';

import { FindReviewsQuery, LikeType } from '@/graphql';

import {
  LikeButton,
  Link,
  ProfilePicture,
  StarIcon,
  TextShorter,
  Typography,
} from '@/components';

import { formatDateFromMillis } from '@/utils/date-utils';

import { NewMovieCover as MovieCover, MovieLink } from '@/components/movie';

import UserProfileLink from '@/components/user/UserProfileLink';

export interface MovieReviewViewProps {
  review: FindReviewsQuery['reviews']['edges'][number]['node'];
  preview?: boolean;
  showUser?: boolean;
}

const Review: React.FC<MovieReviewViewProps> = ({
  review,
  preview = true,
  showUser = true,
}) => {
  const { user, movie, post } = review;

  return (
    <div className="w-full z-10">
      <div
        className={clsx('flex gap-4', {
          'flex-row-reverse': !preview,
        })}
      >
        <MovieCover movie={movie} size={preview ? 'sm' : 'md'} />

        <div className="flex flex-col w-full">
          <Typography
            className="font-bold"
            component="h2"
            color="primary"
            size="xl"
            hover
          >
            {!preview ? (
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
            {showUser && (
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
                'flex flex-col sm:flex-row sm:items-center gap-2': preview,
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
                className="mt-1"
                component="p"
                color="tertiary"
                size="sm"
              >
                Watched {formatDateFromMillis(post.createdAt)}
              </Typography>
            </div>
          </div>

          {post.content && (
            <TextShorter
              className="my-4"
              maxCharacters={preview ? 200 : post.content.length}
              text={post.content}
            />
          )}

          <div className="flex items-center gap-2">
            <LikeButton contentId={post.id} likeType={LikeType.Post} />

            <Typography component="span" size="sm">
              1,412 likes
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
