import { DecadeDropdown, GenreDropdown, SortButton } from '@/components/Sort';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

interface Props {
  listId: string;
}

export const ListMoviesSortButtons: React.FC<Props> = props => {
  const { listId } = props;

  const rootPath = `/lists/${listId}`;

  return (
    <div className="flex flex-col items-center gap-2 mt-2 flex-wrap sm:gap-0 sm:flex-nowrap sm:flex-row sm:w-fit sm:ml-auto sm:mt-auto sm:h-fit">
      <SingleDropdown>
        <SortButton type="decade" intent="secondary">
          <DecadeDropdown pathname={rootPath} />
        </SortButton>

        <SortButton type="genre" intent="secondary">
          <GenreDropdown pathname={rootPath} />
        </SortButton>
      </SingleDropdown>
    </div>
  );
};
