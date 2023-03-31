import { ListSortType, useFindListsQuery } from '@/graphql';

import { Link, Typography, Card } from '@/components';

import ListPreview from '@/components/list/ListPreview';

export const PopularListsWeek: React.FC = () => {
  const { data } = useFindListsQuery({
    variables: { page: 1, sort: { type: ListSortType.Popularity } },
  });

  const hasAnyList = data ? data.lists.edges.length > 0 : false;

  return (
    <Card>
      <Link href="/lists/trending">
        <Card.Header title="Popular lists this week" marginBottom />
      </Link>

      <Card.Body>
        {!hasAnyList ? (
          <Typography component="h2">No lists were found.</Typography>
        ) : (
          <ul data-testid="popularListsWeek">
            {data.lists.edges.map(edge => (
              <ListPreview
                key={`trending-lists-week-${edge.node.id}`}
                list={edge.node}
                showUser
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};
