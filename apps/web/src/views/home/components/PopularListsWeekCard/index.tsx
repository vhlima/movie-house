import { ListSortType, useFindListsQuery } from '@/gql';

import { Link, Card } from '@/components';

import { ListPreviewList } from '@/components/list';

export const PopularListsWeekCard: React.FC = () => {
  const { data } = useFindListsQuery({
    variables: { page: 1, sort: { type: ListSortType.Popularity } },
  });

  const lists = data ? data.lists.edges.map(edge => edge.node) : [];

  return (
    <Card>
      <Link href="/lists/trending" data-testid="popular-lists-link">
        <Card.Header title="Popular lists this week" marginBottom />
      </Link>

      <Card.Body>
        <ListPreviewList lists={lists} showUser />
      </Card.Body>
    </Card>
  );
};
