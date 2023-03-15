import { useFindMovieRecommendationsQuery } from '@/graphql';
import { Typography, Card } from '@/components';

import { MovieCoverList } from '@/components/movie';

interface MoviesRelatedProps {
  movieId: number;
}

const MoviesRelated: React.FC<MoviesRelatedProps> = ({ movieId }) => {
  const { data: movieRecommendations } = useFindMovieRecommendationsQuery({
    variables: { movieId, page: 1 },
  });

  const hasAnyMovie =
    movieRecommendations &&
    movieRecommendations.movieRecommendations.edges.length > 0;

  return (
    <Card>
      <Card.Header title="Related movies" marginBottom />

      <Card.Body>
        {!hasAnyMovie ? (
          <Typography component="h2">No related movie was found.</Typography>
        ) : (
          <MovieCoverList
            className="grid-cols-4 sm:grid-cols-8 gap-1 sm:gap-2"
            name="related-movies"
            movies={movieRecommendations.movieRecommendations.edges
              .slice(0, 8)
              .map(edge => edge.node)}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default MoviesRelated;
