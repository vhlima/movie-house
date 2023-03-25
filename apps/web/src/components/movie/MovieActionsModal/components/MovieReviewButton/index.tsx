import { useRouter } from 'next/router';
import { Button } from '@/components';

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
    <Button intent="secondary" onClick={redirectToCreateReviewPage}>
      Review
    </Button>
  );
};

export default MovieReviewButton;
