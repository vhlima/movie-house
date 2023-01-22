import { useRouter } from 'next/router';
import Button from '../../../../Button';

interface MovieReviewButtonProps {
  movieId: number;
}

const MovieReviewButton: React.FC<MovieReviewButtonProps> = ({ movieId }) => {
  const { push } = useRouter();

  const redirectToCreateReviewPage = async () => {
    await push({
      pathname: '/reviews/create',
      query: { movie: movieId },
    });
  };

  return (
    <Button buttonStyle="secondary" onClick={redirectToCreateReviewPage}>
      Review
    </Button>
  );
};

export default MovieReviewButton;
