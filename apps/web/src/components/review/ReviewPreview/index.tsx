import type { FindReviewsQuery } from '@/graphql';

import { Link, Typography, ListItem } from '@/components';

import { parseISO } from '../../../utils/date-utils';

import MovieLink from '../../movie/MovieLink';
import MovieCover from '../../movie/MovieCover';

import TextShorter from '../../TextShorter';

import ReviewHeader from '../ReviewHeader';

interface ReviewPreviewProps {
  review: FindReviewsQuery['reviews']['edges'][number]['node'];
  simple?: boolean;
}

const ReviewPreview: React.FC<ReviewPreviewProps> = ({
  review,
  simple = false,
}) => (
  <ListItem className="w-full">
    <div className="flex gap-2">
      {!simple && <MovieCover movie={review.movie} sizeType="sm" />}

      <div className="flex flex-col w-full">
        {!simple && (
          <Typography component="h2">
            <MovieLink
              className="text-grey-100 text-xl font-semibold hover:text-grey-300"
              movieId={review.movie.id}
            >
              {review.movie.originalTitle}
            </MovieLink>

            {review.movie.releaseDate && (
              <Typography className="ml-1" component="span">
                ({parseISO(review.movie.releaseDate).getFullYear()})
              </Typography>
            )}
          </Typography>
        )}

        <Link
          className="group w-full"
          href={{
            pathname: '/reviews/[id]',
            query: {
              id: review.post.id,
            },
          }}
        >
          <ReviewHeader user={review.user} post={review.post} />
        </Link>

        <TextShorter
          className="my-2"
          maxCharacters={200}
          text={review.post.content}
        />
      </div>
    </div>
  </ListItem>
);

export default ReviewPreview;
