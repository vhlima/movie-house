import { Link, Typography } from '@/components';

import { MovieLink } from '@/components/movie';

type Props = {
  id: string | number;
  originalTitle: string;
  releaseDate: number;
};

export const ReviewMovieDetails: React.FC<Props> = props => {
  const { id, originalTitle, releaseDate } = props;

  return (
    <Typography
      className="font-bold"
      component="h2"
      color="primary"
      size="xl"
      hover
    >
      {typeof id === 'number' ? (
        <MovieLink movieId={id}>{originalTitle}</MovieLink>
      ) : (
        <Link href={{ pathname: '/reviews/[id]', query: { id } }}>
          {originalTitle}
        </Link>
      )}

      {releaseDate && (
        <Typography
          className="font-normal ml-2"
          size="lg"
          component="span"
          color="secondary"
        >
          ({new Date(releaseDate).getFullYear()})
        </Typography>
      )}
    </Typography>
  );
};
