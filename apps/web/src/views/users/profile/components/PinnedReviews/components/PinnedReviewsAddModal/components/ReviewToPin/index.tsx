import type { Review } from '@/graphql';
import { Typography, Button, SvgIcon, ListItem } from '@/components';
import { MovieCover } from '@/components/movie';
import { formatDateFromMillis } from '../../../../../../../../../utils/date-utils';

interface ReviewToPinProps {
  review: {
    id: Review['id'];
    post: {
      id: Review['post']['id'];
      createdAt: Review['post']['createdAt'];
    };
    movie: {
      id: Review['movie']['id'];
      originalTitle: Review['movie']['originalTitle'];
      posterUrl: Review['movie']['posterUrl'];
      releaseDate?: Review['movie']['releaseDate'];
    };
  };
  onClick: (postId: Review['post']['id']) => void;
}

const ReviewToPin: React.FC<ReviewToPinProps> = ({ review, onClick }) => (
  <ListItem className="flex gap-2" borderColor="light">
    <MovieCover sizeType="sm" movie={review.movie} link={false} />

    <section className="flex flex-col w-full mr-2">
      <Typography component="h2" color="primary">
        <strong>{review.movie.originalTitle}</strong>

        {review.movie.releaseDate &&
          ` (${new Date(review.movie.releaseDate).getFullYear()})`}
      </Typography>

      <Typography component="span">
        Reviewed in&nbsp;
        {formatDateFromMillis(review.post.createdAt)}
      </Typography>

      <Button
        className="gap-2 mt-2"
        intent="secondary"
        title="Click to pin this review"
        onClick={() => onClick(review.id)}
      >
        <SvgIcon iconType="BsFillPinFill" />

        <Typography component="span">Pin this review</Typography>
      </Button>
    </section>
  </ListItem>
);

export default ReviewToPin;
