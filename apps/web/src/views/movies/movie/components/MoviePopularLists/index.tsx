import { useFindListsQuery } from '@/graphql';

import Card from '../../../../../components/Card';
import ListPreview from '../../../../../components/list/ListPreview';
import Typography from '../../../../../components/Typography';

interface MoviePopularListsProps {
  movieId: number;
}

const MoviePopularLists: React.FC<MoviePopularListsProps> = ({ movieId }) => {
  const { data: popularListsData } = useFindListsQuery({
    variables: {
      page: 1,
    },
  });

  const hasAnyPopularList =
    popularListsData && popularListsData.lists.edges.length > 0;

  return (
    <Card>
      <Card.Header title="Popular lists" marginBottom={!hasAnyPopularList} />

      <Card.Body>
        {!hasAnyPopularList ? (
          <Typography component="p">
            No lists were found containing this movie.
          </Typography>
        ) : (
          <ul>
            {popularListsData.lists.edges.map(({ node }) => (
              <ListPreview
                key={`movie-popular-lists-${node.post.id}`}
                list={node}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default MoviePopularLists;
