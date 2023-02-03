import clsx from 'clsx';

import Link from '../../../../components/Link';
import SvgIcon from '../../../../components/SvgIcon';
import Typography from '../../../../components/Typography';

import type { SortDropdownLogicProps } from './logic';

import { useLogic } from './logic';

interface SortDropdownProps extends SortDropdownLogicProps {
  items: Array<{
    id: string;
    name: string;
  }>;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  items,
  ...logicProps
}) => {
  const { selectedOptions, buildGenreUrl } = useLogic(logicProps);

  return (
    <div className="absolute inset-0 top-7 z-10">
      <ul className="shadow-lg bg-grey-800 rounded-b-sm">
        {items.map((item, index) => {
          const isOptionSelected =
            index === 0
              ? selectedOptions.length === 0
              : selectedOptions.includes(item.id);

          return (
            <li
              className={clsx('text-left hover:bg-grey-700', {
                'border-y border-y-grey-500': index === 0,
              })}
              key={`movie-genre-${item.id}`}
            >
              <Link
                className={clsx('relative pl-6 p-1 block')}
                {...buildGenreUrl(item.id)}
              >
                {index > 0 && isOptionSelected && (
                  <SvgIcon
                    className="absolute left-1 top-2 text-success-base"
                    iconType="FiCheck"
                    size={16}
                  />
                )}

                <Typography
                  className={clsx('whitespace-nowrap', {
                    'font-bold': isOptionSelected,
                  })}
                  component="span"
                  size="sm"
                >
                  {item.name}
                </Typography>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SortDropdown;
