import { Link } from '@/components';

import { MovieCover } from '@/components/movie';

interface Props {
  id: string;
  movie: {
    id: number;
    originalTitle: string;
    posterUrl: string;
  };
}

export const ReviewCoverItem: React.FC<Props> = props => {
  const { id, movie } = props;

  return (
    <li key={`recent-review-${id}`}>
      <Link
        href={{
          pathname: '/reviews/[id]',
          query: { id },
        }}
      >
        <MovieCover movie={movie} link={false} />
      </Link>
    </li>
  );
};
