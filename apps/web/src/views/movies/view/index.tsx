import { useRouter } from 'next/router';

import type { Movie } from '../../../graphql';

import MovieHeader from './Header';

import MovieBody from './Body';

import MovieViewSkeleton from './Skeleton';

import Card from '../../../components/Card';

import UserMovieList from '../../users/lists';
import PageContent from '../../../components/PageContent';
import BackgroundImage from '../../../components/BackgroundImage';

interface MovieViewProps {
  movie: Movie;
}

const MovieView: React.FC<MovieViewProps> = ({ movie }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <MovieViewSkeleton />;
  }

  if (!movie) {
    return <h1 className="text-danger-base">Movie not found</h1>;
  }

  // TODO create hook to pass movie without prop drilling

  return (
    <>
      <BackgroundImage src={movie.backdropUrl} />

      <PageContent className="mt-40">
        <MovieHeader movie={movie} />

        <MovieBody movie={movie}>
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
      </PageContent>
    </>
  );
};

export default MovieView;
