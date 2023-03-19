import { useRouter } from 'next/router';

import { SortByDecadeButton, SortByGenreButton } from '@/components/Sort';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

const SortButtons: React.FC = () => {
  const { asPath } = useRouter();

  const rootPath = asPath.split('/').slice(0, 4).join('/');

  return (
    <div className="flex flex-col sm:flex-row items-center ml-auto">
      <SingleDropdown>
        <SortByGenreButton pathname={rootPath} intent="secondary" />

        <SortByDecadeButton pathname={rootPath} intent="secondary" />
      </SingleDropdown>
    </div>
  );
};

export default SortButtons;
