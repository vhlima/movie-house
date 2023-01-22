import { formatDate } from '../../../../../../../../../utils';

import type { Review } from '../../../../../../../../../graphql';

import Button from '../../../../../../../../../components/Button';

import SvgIcon from '../../../../../../../../../components/SvgIcon';

import Typography from '../../../../../../../../../components/Typography';

import MovieCover from '../../../../../../../../../components/movie/MovieCover';

interface ReviewToPinProps {
  review: {
    id: Review['id'];
    post: {
      id: Review['post']['id'];
      createdAt: Review['post']['createdAt'];
    };
    movie: {
      originalTitle: Review['movie']['originalTitle'];
      posterUrl: Review['movie']['posterUrl'];
      releaseDate?: Review['movie']['releaseDate'];
    };
  };
  onClick: (postId: Review['post']['id']) => void;
}

const ReviewToPin: React.FC<ReviewToPinProps> = ({ review, onClick }) => (
  <li className="flex gap-2">
    <MovieCover
      sizeType="sm"
      movie={{
        originalTitle: review.movie.originalTitle,
        posterUrl: review.movie.posterUrl,
      }}
    />

    <section className="flex flex-col w-full mr-2">
      <Typography component="h2" color="primary">
        <strong>{review.movie.originalTitle}</strong>

        {review.movie.releaseDate &&
          ` (${new Date(review.movie.releaseDate).getFullYear()})`}
      </Typography>

      <Typography component="span">
        Reviewed in&nbsp;
        {formatDate(review.post.createdAt)}
      </Typography>

      <Button
        className="flex items-center gap-1 mt-2"
        buttonStyle="secondary"
        onClick={() => onClick(review.post.id)}
      >
        <SvgIcon className="text-grey-300" iconType="BsFillPinFill" />

        <Typography component="span">Pin this review</Typography>
      </Button>
    </section>
  </li>
);

export default ReviewToPin;