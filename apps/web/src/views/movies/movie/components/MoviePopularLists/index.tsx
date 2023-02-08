import { useFindMoviePopularListsQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';
import ListPreview from '../../../../../components/list/ListPreview';
import Typography from '../../../../../components/Typography';

interface MoviePopularListsProps {
  movieId: number;
}

const MoviePopularLists: React.FC<MoviePopularListsProps> = ({ movieId }) => {
  const { data: popularListsData } = useFindMoviePopularListsQuery({
    variables: { movieId },
  });

  const hasAnyPopularList =
    popularListsData && popularListsData.moviePopularLists.length > 0;

  return (
    <Card title="Popular lists" noPadding>
      {!hasAnyPopularList ? (
        <Typography component="p">
          No lists were found containing this movie.
        </Typography>
      ) : (
        <ul>
          {popularListsData.moviePopularLists.map(list => (
            <ListPreview
              key={`movie-popular-lists-${list.post.id}`}
              list={list}
            />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default MoviePopularLists;
