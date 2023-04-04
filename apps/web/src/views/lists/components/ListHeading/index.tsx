import { SubHeading } from '@/components';

import { ListInfo, ListMoviesSortButtons } from './components';

interface Props {
  id: string;
  name: string;
  createdAt: number;
}

export const ListHeading: React.FC<Props> = props => {
  const { id, name, createdAt } = props;

  return (
    <SubHeading className="flex flex-col sm:flex-row gap-0 pb-2">
      <ListInfo name={name} createdAt={createdAt} />

      <ListMoviesSortButtons listId={id} />
    </SubHeading>
  );
};
