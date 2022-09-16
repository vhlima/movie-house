import type { Review } from '../../../graphql';

import Link from '../../Link';

import ListItem from '../../ListItem';

import ReviewText from '../components/Text';

import MovieCover from '../../../views/movies/components/Cover';

import MovieRatingStar from '../../../views/movies/components/RatingStar';

interface ReviewPreviewProps {
  review: Review;
}

const ReviewPreview: React.FC<ReviewPreviewProps> = ({ review }) => (
  <ListItem>
    <div className="flex gap-2">
      <MovieCover coverUrl={review.movie.posterUrl} />

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Link
            className="text-grey-100 text-xl font-semibold hover:text-grey-300"
            href="/"
          >
            {review.movie.originalTitle}
          </Link>

          <span className="text-grey-200">
            ({new Date(review.movie.releaseDate).getFullYear()})
          </span>
        </div>

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
