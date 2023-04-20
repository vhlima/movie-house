import type { FindListsQuery } from '@/graphql';

import { Typography } from '@/components';

import ListPreview from '@/components/list/ListPreview';

interface Props {
  lists: FindListsQuery['lists']['edges'][number]['node'][];
  showUser?: boolean;
}

export const ListPreviewList: React.FC<Props> = props => {
  const { lists, showUser = true } = props;

  if (lists.length === 0) {
    return (
      <Typography component="h2" data-testid="empty-list-message">
        No lists were found.
      </Typography>
    );
  }

  return (
    <ul data-testid="list-preview-list">
      {lists.map(list => (
        <ListPreview
          key={`list-preview-${list.id}`}
          list={list}
          showUser={showUser}
        />
      ))}
    </ul>
  );
};
