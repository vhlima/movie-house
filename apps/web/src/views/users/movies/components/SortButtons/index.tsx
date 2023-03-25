import { useRouter } from 'next/router';

import { DecadeDropdown, GenreDropdown, SortButton } from '@/components/Sort';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

const SortButtons: React.FC = () => {
  const { asPath } = useRouter();

  const rootPath = asPath.split('/').slice(0, 4).join('/');

  return (
    <div className="flex flex-col sm:flex-row items-center ml-auto">
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

export default SortButtons;
