import type { Review } from '../../../graphql';

import ListItem from '../../ListItem';
import Typography from '../../Typography';
import MovieLink from '../../movie/MovieLink';
import MovieCover from '../../movie/MovieCover';

import Link from '../../Link';
import TextShorter from '../../TextShorter';

import ReviewHeader from '../ReviewHeader';

export type ReviewPreviewFields = {
  user: Pick<Review['user'], 'username' | 'profilePictureUrl'>;
  post: Pick<Review['post'], 'id' | 'body' | 'createdAt'>;
  movie: Pick<
    Review['movie'],
    'id' | 'originalTitle' | 'posterUrl' | 'releaseDate'
  >;
};

interface ReviewPreviewProps {
  review: ReviewPreviewFields;
  simple?: boolean;
}

const ReviewPreview: React.FC<ReviewPreviewProps> = ({
  review,
  simple = false,
}) => (
  <ListItem className="w-full">
    <div className="flex gap-2">
      {!simple && <MovieCover movie={review.movie} sizeType="sm" />}

      <div className="flex flex-col">
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
                ({new Date(review.movie.releaseDate).getFullYear()})
              </Typography>
            )}
          </Typography>
        )}

        <Link
          className="group"
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
          text={review.post.body}
        />
      </div>
    </div>
  </ListItem>
);

export default ReviewPreview;
