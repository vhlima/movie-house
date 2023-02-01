import Card from '../../../../../components/Card';

import MovieCoverList from '../../../../../components/movie/MovieCoverList';

import { useFindMovieRecommendationsQuery } from '../../../../../graphql';

interface MovieRecommendationsProps {
  movieId: number;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({
  movieId,
}) => {
  const { data: movieRecommendations } = useFindMovieRecommendationsQuery({
    variables: { movieId },
  });

  const hasAnyMovie =
    movieRecommendations &&
    movieRecommendations.movieRecommendations.length > 0;

  return (
    <Card title="Related movies" noPadding>
      {hasAnyMovie && (
        <MovieCoverList
          // className="grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7"
          name="related-movies"
          movies={movieRecommendations.movieRecommendations.slice(0, 4)}
        />
      )}
    </Card>
  );
};

export default MovieRecommendations;
