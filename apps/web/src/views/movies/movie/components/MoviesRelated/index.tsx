import Card from '../../../../../components/Card';

import MovieCoverList from '../../../../../components/movie/MovieCoverList';
import Typography from '../../../../../components/Typography';

import { useFindMovieRecommendationsQuery } from '../../../../../graphql';

interface MoviesRelatedProps {
  movieId: number;
}

const MoviesRelated: React.FC<MoviesRelatedProps> = ({ movieId }) => {
  const { data: movieRecommendations } = useFindMovieRecommendationsQuery({
    variables: { movieId },
  });

  const hasAnyMovie =
    movieRecommendations &&
    movieRecommendations.movieRecommendations.length > 0;

  return (
    <Card>
      <Card.Header title="Related movies" marginBottom />

      <Card.Body>
        {!hasAnyMovie ? (
          <Typography component="h2">No related movie was found.</Typography>
        ) : (
          <MovieCoverList
            name="related-movies"
            movies={movieRecommendations.movieRecommendations.slice(0, 4)}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default MoviesRelated;
