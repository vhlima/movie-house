import { useRouter } from 'next/router';

import type { MovieCreditsResponse, MovieResponse } from '../../../types/movie';

import MovieHeader from './Header';

import MovieBody from './Body';

import MovieViewSkeleton from './Skeleton';

import Card from '../../../components/Card';

import UserMovieList from '../../users/lists';

import UserMovieReviewBody from '../../users/reviews/components/Body';

interface MovieViewProps {
  movie: MovieResponse;
  credits: MovieCreditsResponse;
}

const MovieView: React.FC<MovieViewProps> = ({ movie, credits }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <MovieViewSkeleton />;
  }

  return (
    <MovieHeader movie={movie}>
      <MovieBody movie={movie} credits={credits}>
        <Card title="Popular reviews" link={{ href: '/' }} noPadding>
          <div>
            <UserMovieReviewBody preview />
            <UserMovieReviewBody preview />
            <UserMovieReviewBody preview />
          </div>
        </Card>

        <Card title="Recent reviews" link={{ href: '/' }} noPadding>
          <div>
            <UserMovieReviewBody preview />
            <UserMovieReviewBody preview />
            <UserMovieReviewBody preview />
          </div>
        </Card>

        <Card title="Similar movies" noPadding>
          {/* <div className="flex gap-2">
            {movieList.map(m => (
              <Link key={m.id} className="hover:opacity-60" href="/">
                <MovieCover coverUrl={m.coverUrl} />
              </Link>
            ))}
          </div> */}
        </Card>

        <Card title="Popular lists" noPadding>
          <UserMovieList />
        </Card>
      </MovieBody>
    </MovieHeader>
  );
};

export default MovieView;
