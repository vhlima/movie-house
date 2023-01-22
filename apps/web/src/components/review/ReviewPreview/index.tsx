import type { Review } from '../../../graphql';

import ListItem from '../../ListItem';

import Typography from '../../Typography';

import MovieCover from '../../movie/MovieCover';

import MovieLink from '../../movie/MovieLink';

import ReviewBody from '../ReviewBody';

import StarIcon from '../../StarIcon';

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
}

const ReviewPreview: React.FC<ReviewPreviewProps> = ({ review }) => (
  <ListItem className="w-full">
    <div className="flex gap-2">
      <MovieCover movie={review.movie} sizeType="sm" />

      <div className="flex flex-col">
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

        <div className="flex flex-col">
          {/* <div className="flex mb-2">
            {Array.from({ length: 10 })
              .map((_, index) => index + 1)
              .map(n => (
                <StarIcon key={`review-preview-star-${n}`} fill={n <= 3} />
              ))}
          </div> */}

          <ReviewBody review={review} />
        </div>
      </div>
    </div>
  </ListItem>
);

export default ReviewPreview;
