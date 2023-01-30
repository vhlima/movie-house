import { useFindMoviePopularListsQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';
import ListPreview from '../../../../../components/list/ListPreview';

interface MoviePopularListsProps {
  movieId: number;
}

const MoviePopularLists: React.FC<MoviePopularListsProps> = ({ movieId }) => {
  const { data: popularListsData } = useFindMoviePopularListsQuery({
    variables: { movieId },
  });

  return (
    <Card title="Popular lists" noPadding>
      {popularListsData && (
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
