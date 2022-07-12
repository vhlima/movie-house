import { useRouter } from 'next/router';

import type { MovieCreditsResponse, MovieResponse } from '../../../types/movie';

import { useAuth } from '../../../hooks/useAuth';

import MovieHeader from './Header';

import MovieBody from './Body';

import UserMovieInfo from './UserInfo';

import MovieViewSkeleton from './Skeleton';

import Card from '../../../components/Card';

import UserMovieList from '../../users/lists';

interface MovieViewProps {
  movie: MovieResponse;
  credits: MovieCreditsResponse;
}

const MovieView: React.FC<MovieViewProps> = ({ movie, credits }) => {
  const { user } = useAuth();

  const { isFallback } = useRouter();

  if (isFallback) {
    return <MovieViewSkeleton />;
  }

  // TODO create hook to pass movie without prop drilling

  return (
    <MovieHeader movie={movie}>
      <MovieBody movie={movie} credits={credits}>
        {user && (
          <Card title="Rate this movie" noPadding>
            <UserMovieInfo movie={movie} />
          </Card>
        )}

        <Card title="Popular reviews" link={{ href: '/' }} noPadding>
          <div>
            {/* <UserMovieReviewBody preview /> */}
            {/* <UserMovieReviewBody preview /> */}
            {/* <UserMovieReviewBody preview /> */}
          </div>
        </Card>

        <Card title="Recent reviews" link={{ href: '/' }} noPadding>
          <div>
            {/* <UserMovieReviewBody preview /> */}
            {/* <UserMovieReviewBody preview /> */}
            {/* <UserMovieReviewBody preview /> */}
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
