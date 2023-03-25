import { useFindListsQuery } from '@/graphql';

import { Typography, Card } from '@/components';
import ListPreview from '../../../../../components/list/ListPreview';

interface MoviePopularListsProps {
  movieId: number;
}

export const MoviePopularLists: React.FC<MoviePopularListsProps> = ({
  movieId,
}) => {
  const { data: popularListsData } = useFindListsQuery({
    variables: {
      page: 1,
    },
  });

  const hasAnyPopularList =
    popularListsData && popularListsData.lists.edges.length > 0;

  return (
    <Card>
      <Card.Header title="Popular lists" marginBottom />

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
