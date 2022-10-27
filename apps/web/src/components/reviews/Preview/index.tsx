import type { Review } from '../../../graphql';

import Link from '../../Link';

import ListItem from '../../ListItem';

import Typography from '../../Typography';

import ReviewText from '../components/Text';

import MovieCover from '../../../views/movies/components/Cover';

import MovieRatingStar from '../../../views/movies/components/RatingStar';

interface ReviewPreviewProps {
  review: Review;
}

const ReviewPreview: React.FC<ReviewPreviewProps> = ({ review }) => (
  <ListItem className="w-full">
    <div className="flex gap-2">
      <MovieCover coverUrl={review.movie.posterUrl} />

      <div className="flex flex-col">
        <Typography component="h2">
          <Link
            className="text-grey-100 text-xl font-semibold hover:text-grey-300"
            href={{
              pathname: '/movies/[id]',
              query: { id: review.movie.id },
            }}
          >
            {review.movie.originalTitle}
          </Link>

          <Typography className="ml-1" component="span">
            ({new Date(review.movie.releaseDate).getFullYear()})
          </Typography>
        </Typography>

        <div className="flex flex-col">
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <MovieRatingStar
                key={n}
                color={n <= 3 ? 'blue' : 'grey'}
                checked={n <= 3}
              />
            ))}
          </div>

          <ReviewText review={review} preview />
        </div>
      </div>
    </div>
  </ListItem>
);

export default ReviewPreview;
