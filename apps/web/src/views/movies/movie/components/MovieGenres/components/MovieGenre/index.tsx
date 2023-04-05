import { Button } from '@/components';

import { useSortLinkBuilder } from '@/hooks/useSortLinkBuilder';

interface Props {
  name: string;
}

export const MovieGenre: React.FC<Props> = props => {
  const { name } = props;

  const { buildFilteredHref } = useSortLinkBuilder({
    pathname: {
      clean: '/movies',
      sort: '/movies/genre/[genre]',
    },
    queryKey: 'genre',
    singleOption: true,
  });

  return (
    <li className="border border-grey-700 rounded-md overflow-hidden">
      <Button
        intent="tertiary"
        size="sm"
        rounded={false}
        href={buildFilteredHref(name).href}
      >
        {name}
      </Button>
    </li>
  );
};
